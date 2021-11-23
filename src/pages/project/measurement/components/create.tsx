import type { FC } from 'react';
import { useCallback, useRef } from 'react';
import { useState } from 'react';
import { createMeasurementBase } from '@/services/measurementbase/api';
import { Button, Drawer, message, Space, Tooltip } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import type { ProFormInstance } from '@ant-design/pro-form';
import ProForm, { ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import styles from '../style.less';
import type { ActionType } from '@ant-design/pro-table';

type Props = {
  projectId: number;
  actionRef: React.MutableRefObject<ActionType | undefined>;
};
const MeasurementCreate: FC<Props> = ({ projectId, actionRef }) => {
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
            createMeasurementBase({ ...values, projectId }).then(async (result) => {
              if (result === 'ok') {
                message.success('Create successfully!');
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
          <ProFormText width="md" name="unit" label="Unit" />
          <ProFormTextArea width="md" name="comment" label="Comment" />
        </ProForm>
      </Drawer>
    </>
  );
};

export default MeasurementCreate;
