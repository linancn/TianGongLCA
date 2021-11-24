import type { FC, MutableRefObject } from 'react';
import { useCallback, useRef } from 'react';
import { useState } from 'react';
import { Button, Divider, Drawer, message, Space, Tooltip } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import type { ProFormInstance } from '@ant-design/pro-form';
import { ProFormSelect } from '@ant-design/pro-form';
import ProForm, { ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import styles from '@/style/custom.less';
import type { ActionType } from '@ant-design/pro-table';
import { createMeasurementFlow } from '@/services/measurementflow/api';
import FlowMeasurementSelect from './select';

type Props = {
  projectId: number;
  flowBaseId: string;
  actionRef: MutableRefObject<ActionType | undefined>;
};
const FlowMeasurementCreate: FC<Props> = ({ projectId, flowBaseId, actionRef }) => {
  const [drawerVisible, handleDrawerVisible] = useState(false);
  const formRefCreate = useRef<ProFormInstance>();

  const reload = useCallback(() => {
    actionRef.current?.reload();
  }, [actionRef]);

  return (
    <>
      <Tooltip title="Create">
        <Button
          size={'middle'}
          type="text"
          icon={<PlusOutlined />}
          onClick={() => {
            handleDrawerVisible(true);
          }}
        />
      </Tooltip>
      <Drawer
        title="Create Measurement"
        width="400px"
        maskClosable={false}
        visible={drawerVisible}
        onClose={() => handleDrawerVisible(false)}
        footer={
          <Space size={'middle'} className={styles.footer_right}>
            <Button onClick={() => handleDrawerVisible(false)}>Cancel</Button>
            <Button onClick={() => formRefCreate.current?.submit()} type="primary">
              Submit
            </Button>
          </Space>
        }
      >
        <ProForm
          formRef={formRefCreate}
          submitter={{
            render: () => {
              return [];
            },
          }}
          onFinish={async (values) => {
            createMeasurementFlow({
              ...values,
              projectId,
              flowBaseId,
            }).then(async (result) => {
              if (result === 'ok') {
                message.success('successfully Created!');
                handleDrawerVisible(false);
                reload();
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
            <FlowMeasurementSelect projectId={projectId} formRef={formRefCreate} />
          </Divider>
          <ProFormText width="md" name="name" label="Name" disabled={true} />
          <ProFormText width="md" name="unit" label="Unit" disabled={true} />
          <ProFormTextArea width="md" name="comment" label="Comment" disabled={true} />
        </ProForm>
      </Drawer>
    </>
  );
};

export default FlowMeasurementCreate;
