import { getPlanById, updatePlan } from '@/services/plan/api';
import { Button, Drawer, message, Space } from 'antd';
import type { Dispatch, FC } from 'react';
import { useState, useRef, useCallback, useEffect } from 'react';
import type { ProFormInstance } from '@ant-design/pro-form';
import { ProFormTextArea } from '@ant-design/pro-form';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import styles from '@/style/custom.less';
import { getProcessById, updateProcess } from '@/services/process/api';
import { CloseOutlined } from '@ant-design/icons';
import type { PlanModelState } from '@/services/plan/data';

type Props = {
  projectId: number;
  planModelState: PlanModelState;
  drawerVisible: boolean;
  setDrawerVisible: Dispatch<React.SetStateAction<boolean>>;
};

const EditNode: FC<Props> = ({ projectId, planModelState, drawerVisible, setDrawerVisible }) => {
  const [drawerEdit, setDrawerEdit] = useState<JSX.Element>();
  const [sumitButton, setSumitButton] = useState<JSX.Element>();
  const formRefPlan = useRef<ProFormInstance>();
  const formRefProcess = useRef<ProFormInstance>();
  const cellType = planModelState.cellConfig.info.type;

  const callbackDrawerVisible = useCallback(() => {
    setDrawerVisible(false);
  }, [setDrawerVisible]);

  function getData() {
    if (cellType === 'plan') {
      getPlanById(projectId, planModelState.cellId).then(async (pi) => {
        setDrawerEdit(
          <ProForm
            formRef={formRefPlan}
            submitter={{
              render: () => {
                return [];
              },
            }}
            onFinish={async (values) => {
              updatePlan({ ...values, pkid: pi.pkid }).then(async (result) => {
                if (result === 'ok') {
                  message.success('Successfully Edited!');
                  callbackDrawerVisible();
                } else {
                  message.error(result);
                }
              });
              return true;
            }}
          >
            <ProFormText width="md" name="dataName" label="Data Name" />
            <ProFormText width="md" name="planType" label="Plan Type" />
            <ProFormTextArea width="md" name="description" label="Description" />
          </ProForm>,
        );
        formRefPlan.current?.setFieldsValue(pi);
        setSumitButton(
          <Button onClick={() => formRefPlan.current?.submit()} type="primary">
            Submit
          </Button>,
        );
      });
    } else if (cellType === 'process') {
      getProcessById(projectId, planModelState.cellId).then(async (pi) => {
        setDrawerEdit(
          <ProForm
            formRef={formRefProcess}
            submitter={{
              render: () => {
                return [];
              },
            }}
            onFinish={async (values) => {
              updateProcess({ ...values, pkid: pi.pkid }).then(async (result) => {
                if (result === 'ok') {
                  message.success('Edit successfully!');
                  callbackDrawerVisible();
                } else {
                  message.error(result);
                }
              });
              return true;
            }}
          >
            <ProFormText width="md" name="dataName" label="Data Name" />
            <ProFormText width="md" name="processType" label="Process Type" />
            <ProFormTextArea width="md" name="description" label="Description" />
          </ProForm>,
        );
        formRefProcess.current?.setFieldsValue(pi);
        setSumitButton(
          <Button onClick={() => formRefProcess.current?.submit()} type="primary">
            Submit
          </Button>,
        );
      });
    }
  }
  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Drawer
      closable={false}
      extra={
        <Button icon={<CloseOutlined />} style={{ border: 0 }} onClick={callbackDrawerVisible} />
      }
      visible={drawerVisible}
      maskClosable={false}
      title={`Edit (${planModelState.cellConfig.attrs.label.text})`}
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
          {sumitButton}
        </Space>
      }
    >
      {drawerEdit}
    </Drawer>
  );
};
export default EditNode;
