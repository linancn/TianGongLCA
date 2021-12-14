import { getPlanInfo, updatePlanInfo } from '@/services/plan/api';
import { Button, Drawer, message, Space } from 'antd';
import type { Dispatch, FC } from 'react';
import { useState, useRef, useCallback, useEffect } from 'react';
import type { ProFormInstance } from '@ant-design/pro-form';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import styles from '@/style/custom.less';
import { getProcessById, updateProcess } from '@/services/process/api';

type Props = {
  projectId: number;
  id: string;
  typeName: string;
  label: string;
  drawerVisible: boolean;
  setDrawerVisible: Dispatch<React.SetStateAction<boolean>>;
};

const EditNode: FC<Props> = ({
  projectId,
  id,
  typeName,
  label,
  drawerVisible,
  setDrawerVisible,
}) => {
  const [drawerEdit, setDrawerEdit] = useState<JSX.Element>();
  const formRef = useRef<ProFormInstance>();

  const callbackDrawerVisible = useCallback(() => {
    setDrawerVisible(false);
  }, [setDrawerVisible]);

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
  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId, id]);
  return (
    <Drawer
      visible={drawerVisible}
      maskClosable={false}
      title={`Edit ${typeName.toLocaleUpperCase()} (${label})`}
      width="400px"
      onClose={callbackDrawerVisible}
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
  );
};
export default EditNode;
