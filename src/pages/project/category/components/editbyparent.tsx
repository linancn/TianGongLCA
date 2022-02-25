import type { FC } from 'react';
import { useCallback, useRef } from 'react';
import { useState } from 'react';
import { Button, Drawer, message, Space, Tooltip } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import type { ProFormInstance } from '@ant-design/pro-form';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import styles from '@/style/custom.less';
import type { ActionType } from '@ant-design/pro-table';
import { getCategoryByPkid, updateCategory } from '@/services/category/api';

type Props = {
  pkid: number;
  parentActionRef: React.MutableRefObject<ActionType | undefined>;
  setViewDrawerVisible: React.Dispatch<React.SetStateAction<boolean>>;
};
const CategoryEditByParent: FC<Props> = ({ pkid, parentActionRef, setViewDrawerVisible }) => {
  const [editForm, setEditForm] = useState<JSX.Element>();
  const [drawerVisible, handleDrawerVisible] = useState(false);
  const formRefEdit = useRef<ProFormInstance>();

  const onEdit = useCallback(() => {
    handleDrawerVisible(true);
    getCategoryByPkid(pkid).then(async (pi) => {
      setEditForm(
        <ProForm
          formRef={formRefEdit}
          submitter={{
            render: () => {
              return [];
            },
          }}
          onFinish={async (values) => {
            updateCategory({ ...values, pkid: pi.pkid }).then(async (result) => {
              if (result === 'ok') {
                message.success('Edit successfully!');
                handleDrawerVisible(false);
                setViewDrawerVisible(false);
                parentActionRef.current?.reload();
              } else {
                message.error(result);
              }
            });
            return true;
          }}
        >
          <ProFormText width="md" name="dataName" label="Data Name" />
          {/* <ProFormTextArea width="md" name="description" label="Description" /> */}
        </ProForm>,
      );
      formRefEdit.current?.setFieldsValue(pi);
    });
  }, [parentActionRef, pkid, setViewDrawerVisible]);

  const onReset = () => {
    getCategoryByPkid(pkid).then(async (result) => {
      formRefEdit.current?.setFieldsValue(result);
    });
  };

  return (
    <>
      <Tooltip title="Edit">
        <Button onClick={onEdit}>Edit</Button>
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

export default CategoryEditByParent;
