import type { FC, MutableRefObject } from 'react';
import { useCallback, useRef } from 'react';
import { useState } from 'react';
import { Button, Drawer, message, Space, Tooltip } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import type { ProFormInstance } from '@ant-design/pro-form';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import styles from '@/style/custom.less';
import type { ActionType } from '@ant-design/pro-table';
import { createParameter } from '@/services/parameter/api';

type Props = {
  projectId: number;
  processId: string;
  actionRef: MutableRefObject<ActionType | undefined>;
};
const ProcessParameterCreate: FC<Props> = ({ projectId, processId, actionRef }) => {
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
        title="Create"
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
            createParameter({ ...values, projectId, processId }).then(async (result) => {
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
          <ProFormText width="md" name="name" label="Name" />
          <ProFormText width="md" name="formula" label="Formula" />
          <ProFormText width="md" name="value" label="Value" />
          <ProFormText width="md" name="min" label="Min" />
          <ProFormText width="md" name="max" label="Max" />
          <ProFormText width="md" name="sd" label="SD" />
        </ProForm>
      </Drawer>
    </>
  );
};

export default ProcessParameterCreate;
