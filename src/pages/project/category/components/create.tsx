import type { FC } from 'react';
import { useCallback, useRef } from 'react';
import { useState } from 'react';
import { Button, Drawer, message, Space, Tooltip } from 'antd';
import { CloseOutlined, PlusOutlined } from '@ant-design/icons';
import type { ProFormInstance } from '@ant-design/pro-form';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import styles from '@/style/custom.less';
import type { ActionType } from '@ant-design/pro-table';
import { createCategory } from '@/services/category/api';

type Props = {
  projectId: number;
  actionRef: React.MutableRefObject<ActionType | undefined>;
};
const CategoryCreate: FC<Props> = ({ projectId, actionRef }) => {
  const [drawerVisible, setDrawerVisible] = useState(false);
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
            setDrawerVisible(true);
          }}
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
            createCategory({ ...values, projectId }).then(async (result) => {
              if (result === 'ok') {
                message.success('Successfully Created!');
                setDrawerVisible(false);
                reload();
              } else {
                message.error(result);
              }
            });
            return true;
          }}
        >
          <ProFormText width="md" name="dataName" label="Data Name" />
          {/* <ProFormTextArea width="md" name="description" label="Description" /> */}
        </ProForm>
      </Drawer>
    </>
  );
};

export default CategoryCreate;
