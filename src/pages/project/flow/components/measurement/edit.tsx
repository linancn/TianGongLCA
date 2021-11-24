import type { FC } from 'react';
import { useCallback, useRef } from 'react';
import { useState } from 'react';
import { Button, Divider, Drawer, message, Space, Tooltip } from 'antd';
import { FormOutlined } from '@ant-design/icons';
import type { ProFormInstance } from '@ant-design/pro-form';
import { ProFormSelect } from '@ant-design/pro-form';
import ProForm, { ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import styles from '@/style/custom.less';
import type { ActionType } from '@ant-design/pro-table';
import { getMeasurementFlowBaseByPkid } from '@/services/measurementflowbase/api';
import { updateMeasurementFlow } from '@/services/measurementflow/api';
import FlowMeasurementSelect from './select';

type Props = {
  pkid: number;
  projectId: number;
  actionRef: React.MutableRefObject<ActionType | undefined>;
};
const FlowMeasurementEdit: FC<Props> = ({ pkid, projectId, actionRef }) => {
  const [editForm, setEditForm] = useState<JSX.Element>();
  const [drawerVisible, handleDrawerVisible] = useState(false);
  const formRefEdit = useRef<ProFormInstance>();

  const onEdit = useCallback(() => {
    handleDrawerVisible(true);
    getMeasurementFlowBaseByPkid(pkid).then(async (pi) => {
      setEditForm(
        <ProForm
          formRef={formRefEdit}
          submitter={{
            render: () => {
              return [];
            },
          }}
          onFinish={async (values) => {
            updateMeasurementFlow({
              ...values,
              pkid,
            }).then(async (result) => {
              if (result === 'ok') {
                message.success('Edit successfully!');
                handleDrawerVisible(false);
                actionRef.current?.reload();
              } else {
                message.error(result);
              }
            });
            return true;
          }}
        >
          <ProFormSelect
            options={[
              {
                value: 'true',
                label: 'true',
              },
              {
                value: 'false',
                label: 'false',
              },
            ]}
            width="md"
            name="asRef"
            label="As Ref"
          />
          <ProFormText width="md" name="conversionRef" label="Conversion Ref" />
          <ProFormText
            width="md"
            name="measurementBaseId"
            label="measurementBaseId"
            hidden={true}
          />
          <Divider>
            Measurement Base Info{' '}
            <FlowMeasurementSelect projectId={projectId} formRef={formRefEdit} />
          </Divider>
          <ProFormText width="md" name="name" label="Name" disabled={true} />
          <ProFormText width="md" name="unit" label="Unit" disabled={true} />
          <ProFormTextArea width="md" name="comment" label="Comment" disabled={true} />
        </ProForm>,
      );
      formRefEdit.current?.setFieldsValue(pi);
      formRefEdit.current?.setFieldsValue({
        asRef: pi.asRef === true ? 'true' : 'false',
      });
    });
  }, [pkid, projectId, actionRef]);

  const onReset = () => {
    getMeasurementFlowBaseByPkid(pkid).then(async (result) => {
      formRefEdit.current?.setFieldsValue(result);
      formRefEdit.current?.setFieldsValue({
        asRef: result.asRef === true ? 'true' : 'false',
      });
    });
  };

  return (
    <>
      <Tooltip title="Edit">
        <Button shape="circle" icon={<FormOutlined />} size="small" onClick={onEdit} />
      </Tooltip>
      <Drawer
        title="Edit Measurement"
        width="400px"
        maskClosable={false}
        visible={drawerVisible}
        onClose={() => handleDrawerVisible(false)}
        footer={
          <Space size={'middle'} className={styles.footer_right}>
            <Button onClick={() => handleDrawerVisible(false)}>Cancel</Button>
            <Button onClick={onReset}>Reset</Button>
            <Button onClick={() => formRefEdit.current?.submit()} type="primary">
              Submit
            </Button>
          </Space>
        }
      >
        {editForm}
      </Drawer>
    </>
  );
};

export default FlowMeasurementEdit;
