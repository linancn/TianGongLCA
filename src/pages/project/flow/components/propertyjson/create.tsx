import type { FC } from 'react';
import { useCallback, useRef } from 'react';
import { useState } from 'react';
import { Button, Divider, Drawer, message, Space, Tooltip } from 'antd';
import { CloseOutlined, PlusOutlined } from '@ant-design/icons';
import type { ProFormInstance } from '@ant-design/pro-form';
import { ProFormSelect } from '@ant-design/pro-form';
import ProForm, { ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import styles from '@/style/custom.less';
import type { ActionType } from '@ant-design/pro-table';
import { createFlowPropertyJson } from '@/services/flow/api';
import FlowPropertyJsonSelect from './select';

type Props = {
  projectId: number;
  flowPkid: number;
  actionRef: React.MutableRefObject<ActionType | undefined>;
};
const FlowPropertyJsonCreate: FC<Props> = ({ projectId, flowPkid, actionRef }) => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const formRefEdit = useRef<ProFormInstance>();

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
          onClick={() => setDrawerVisible(true)}
        />
      </Tooltip>
      <Drawer
        title="Create"
        width="400px"
        closable={false}
        extra={
          <Button
            icon={<CloseOutlined />}
            style={{ border: 0 }}
            onClick={() => setDrawerVisible(false)}
          />
        }
        maskClosable={false}
        visible={drawerVisible}
        onClose={() => setDrawerVisible(false)}
        footer={
          <Space size={'middle'} className={styles.footer_right}>
            <Button onClick={() => setDrawerVisible(false)}>Cancel</Button>
            <Button onClick={() => formRefEdit.current?.submit()} type="primary">
              Submit
            </Button>
          </Space>
        }
      >
        <ProForm
          formRef={formRefEdit}
          submitter={{
            render: () => {
              return [];
            },
          }}
          onFinish={async (values) => {
            createFlowPropertyJson({
              ...values,
              flowPkid,
            }).then(async (result) => {
              if (result === 'ok') {
                message.success('Edit successfully!');
                setDrawerVisible(false);
                reload();
              } else {
                message.error(result);
              }
            });
            return true;
          }}
        >
          <ProFormText width="md" name="conversionFactor" label="Conversion Factor" />
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
            name="referenceFlowProperty"
            label="Reference Flow Property"
          />
          <Divider>
            Flow Property Base Info{' '}
            <FlowPropertyJsonSelect projectId={projectId} formRef={formRefEdit} />
          </Divider>
          <ProFormText width="md" name="flowPropertyId" label="Flow Property Id" hidden={true} />
          <ProFormText width="md" name="dataName" label="Data Name" disabled={true} />
          <ProFormTextArea width="md" name="description" label="Description" disabled={true} />
        </ProForm>
      </Drawer>
    </>
  );
};

export default FlowPropertyJsonCreate;
