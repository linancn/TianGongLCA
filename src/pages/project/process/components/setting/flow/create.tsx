import type { FC, MutableRefObject } from 'react';
import { useCallback, useRef } from 'react';
import { useState } from 'react';
import { Button, Divider, Drawer, message, Space, Tooltip } from 'antd';
import { CloseOutlined, PlusOutlined } from '@ant-design/icons';
import type { ProFormInstance } from '@ant-design/pro-form';
import ProForm, { ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import styles from '@/style/custom.less';
import type { ActionType } from '@ant-design/pro-table';
import { createFlowProcess } from '@/services/flowprocess/api';
import ProcessFlowBaseSelect from './select';

type Props = {
  projectId: number;
  processId: string;
  ioType: string;
  actionRef: MutableRefObject<ActionType | undefined>;
};
const ProcessFlowCreate: FC<Props> = ({ projectId, processId, ioType, actionRef }) => {
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
        title={ioType === 'input' ? 'Create Input Flow' : 'Create Output Flow'}
        width="400px"
        closable={false}
        extra={
          <Button
            icon={<CloseOutlined />}
            style={{ border: 0 }}
            onClick={() => handleDrawerVisible(false)}
          />
        }
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
            createFlowProcess({
              ...values,
              projectId,
              processId,
              ioType,
            }).then(async (result) => {
              if (result === 'ok') {
                message.success('Successfully Created!');
                handleDrawerVisible(false);
                reload();
              } else {
                message.error(result);
              }
            });
            return true;
          }}
        >
          <Divider>
            Flow Base Info <ProcessFlowBaseSelect projectId={projectId} formRef={formRefCreate} />
          </Divider>
          <ProFormText width="md" name="name" label="Name" disabled={true} />
          <ProFormText width="md" name="nation" label="Nation" disabled={true} />
          <ProFormText width="md" name="source" label="Source" disabled={true} />
          <ProFormText width="md" name="type" label="Type" disabled={true} />
          <ProFormTextArea width="md" name="comment" label="Comment" disabled={true} />
          <ProFormText width="md" name="amount" label="Amount" />
          <ProFormText width="md" name="sd" label="SD" />
          <ProFormText width="md" name="factor" label="Factor" />
          <ProFormText width="md" name="flowBaseId" label="FlowBaseId" hidden={true} />
        </ProForm>
      </Drawer>
    </>
  );
};

export default ProcessFlowCreate;
