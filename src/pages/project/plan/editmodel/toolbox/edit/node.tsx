import { getPlanInfo, updatePlanInfo } from '@/services/plan/api';
import { Button, Drawer, message, Space } from 'antd';
import type { FC } from 'react';
import { useState, useRef } from 'react';
import type { ProFormInstance } from '@ant-design/pro-form';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import styles from '@/style/custom.less';
import { getProcessById, updateProcess } from '@/services/process/api';

type Props = {
  projectId: number;
  id: string;
  typeName: string;
  label: string;
};

const EditNode: FC<Props> = ({ projectId, id, typeName, label }) => {
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [drawerEdit, setDrawerEdit] = useState<JSX.Element>();
  const formRef = useRef<ProFormInstance>();

  function getData() {
    if (typeName === 'plan') {
      getPlanInfo(projectId, id).then(async (pi) => {
        setDrawerEdit(
          <ProForm
            formRef={formRef}
            submitter={{
              render: () => {
                return [];
              },
            }}
            onFinish={async (values) => {
              updatePlanInfo({ ...values, pkid: pi.pkid }).then(async (result) => {
                if (result === 'ok') {
                  message.success('Successfully Edited!');
                } else {
                  message.error(result);
                }
              });
              return true;
            }}
          >
            <ProFormText width="md" name="name" label="Name" />
            <ProFormText width="md" name="type" label="Type" />
            <ProFormText width="md" name="nation" label="Nation" />
            <ProFormText width="md" name="comment" label="Comment" />
          </ProForm>,
        );
        formRef.current?.setFieldsValue(pi);
      });
    } else if (typeName === 'process') {
      getProcessById(projectId, id).then(async (pc) => {
        setDrawerEdit(
          <ProForm
            formRef={formRef}
            submitter={{
              render: () => {
                return [];
              },
            }}
            onFinish={async (values) => {
              updateProcess({ ...values, pkid: pc.pkid }).then(async (result) => {
                if (result === 'ok') {
                  message.success('Edit successfully!');
                } else {
                  message.error(result);
                }
              });
              return true;
            }}
          >
            <ProFormText width="md" name="name" label="Name" />
            <ProFormText width="md" name="type" label="Type" />
            <ProFormText width="md" name="nation" label="Nation" />
            <ProFormText width="md" name="comment" label="Comment" />
          </ProForm>,
        );
        formRef.current?.setFieldsValue(pc);
      });
    }
  }
  getData();
  return (
    <>
      <Button onClick={() => setIsDrawerVisible(true)} block>
        Edit
      </Button>
      <Drawer
        visible={isDrawerVisible}
        maskClosable={false}
        title={`Edit ${typeName.toLocaleUpperCase()} (${label})`}
        width="400px"
        onClose={() => setIsDrawerVisible(false)}
        footer={
          <Space size={'middle'} className={styles.footer_right}>
            <Button
              onClick={() => {
                getData();
              }}
            >
              Reset
            </Button>
            <Button onClick={() => formRef.current?.submit()} type="primary">
              Submit
            </Button>
          </Space>
        }
      >
        {drawerEdit}
      </Drawer>
    </>
  );
};
export default EditNode;
