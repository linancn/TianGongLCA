import type { FC } from 'react';
import { useCallback, useRef } from 'react';
import { useState } from 'react';
import { Button, Drawer, message, Space, Tooltip } from 'antd';
import { CloseOutlined, FormOutlined } from '@ant-design/icons';
import type { ProFormInstance } from '@ant-design/pro-form';
import ProForm, { ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import styles from '@/style/custom.less';
import type { ActionType } from '@ant-design/pro-table';
import { getProcessByPkid, updateProcess } from '@/services/process/api';

type Props = {
  pkid: number;
  actionRef: React.MutableRefObject<ActionType | undefined>;
};
const ProcessEdit: FC<Props> = ({ pkid, actionRef }) => {
  const [editForm, setEditForm] = useState<JSX.Element>();
  const [drawerVisible, handleDrawerVisible] = useState(false);
  const formRefEdit = useRef<ProFormInstance>();

  const onEdit = useCallback(() => {
    handleDrawerVisible(true);
    getProcessByPkid(pkid).then(async (pi) => {
      setEditForm(
        <ProForm
          formRef={formRefEdit}
          submitter={{
            render: () => {
              return [];
            },
          }}
          onFinish={async (values) => {
            updateProcess({ ...values, pkid: pi.pkid }).then(async (result) => {
              if (result === 'ok') {
                message.success('Successfully Edited!');
                handleDrawerVisible(false);
                if (actionRef.current) {
                  actionRef.current.reload();
                }
              } else {
                message.error(result);
              }
            });
            return true;
          }}
        >
          <ProFormText width="md" name="name" label="Name" />
          <ProFormText width="md" name="nation" label="Nation" />
          <ProFormText width="md" name="source" label="Source" />
          <ProFormText width="md" name="type" label="Type" />
          <ProFormTextArea width="md" name="comment" label="Comment" />
        </ProForm>,
      );
      formRefEdit.current?.setFieldsValue(pi);
    });
  }, [actionRef, pkid]);

  const onReset = () => {
    getProcessByPkid(pkid).then(async (result) => {
      formRefEdit.current?.setFieldsValue(result);
    });
  };

  return (
    <>
      <Tooltip title="Edit">
        <Button shape="circle" icon={<FormOutlined />} size="small" onClick={onEdit} />
      </Tooltip>
      <Drawer
        title="Edit"
        width="400px"
        closable={false}
        extra={
          <Button
            icon={<CloseOutlined />}
            style={{ border: 0 }}
            onClick={() => handleDrawerVisible(false)}
          />
        }
        maskClosable={true}
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

export default ProcessEdit;
