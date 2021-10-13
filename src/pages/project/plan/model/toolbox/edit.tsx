import { getPlanInfo, updatePlanInfo } from '@/services/plan/api';
import { Button, Drawer, message, Space } from 'antd';
import type { FC } from 'react';
import { useState, useRef } from 'react';
import type { Elements } from 'react-flow-renderer';
import { isNode } from 'react-flow-renderer';
import type { ProFormInstance } from '@ant-design/pro-form';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import styles from '../index.less';
import { getProcess, updateProcess } from '@/services/process/api';

type editProps = {
  project: number;
  selectedElements: Elements<any> | null;
};

let preid = '';

const Edit: FC<editProps> = ({ project, selectedElements }) => {
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [drawerBody, setDrawerBody] = useState<JSX.Element>();
  const formRef = useRef<ProFormInstance>();

  const handleDrawerAddCancel = () => {
    setIsDrawerVisible(false);
  };
  const onSubmit = () => {
    formRef.current?.submit();
  };

  function setEditProForm(typeName: string) {
    if (typeName === 'plan') {
      getPlanInfo(project, preid).then(async (pi) => {
        setDrawerBody(
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
        formRef?.current?.setFieldsValue(pi);
      });
    } else if (typeName === 'process') {
      getProcess(project, preid).then(async (pc) => {
        setDrawerBody(
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
        formRef?.current?.setFieldsValue(pc);
      });
    }
  }

  const onReset = () => {
    if (selectedElements) {
      if (preid === selectedElements[0].id) {
        if (isNode(selectedElements[0])) {
          setEditProForm(selectedElements[0].data?.type);
        }
      }
    }
  };

  const onEdit = () => {
    setIsDrawerVisible(true);
  };

  if (!selectedElements) {
    return (
      <Button key="Edit" block disabled={true}>
        Edit
      </Button>
    );
  }

  if (isDrawerVisible) {
    if (preid !== selectedElements[0].id) {
      preid = selectedElements[0].id;
      if (isNode(selectedElements[0])) {
        setEditProForm(selectedElements[0].data?.type);
      }
    } else {
      preid = '';
    }
  }

  return (
    <>
      <Button key="Edit" onClick={onEdit} block>
        Edit
      </Button>
      <Drawer
        visible={isDrawerVisible}
        maskClosable={false}
        title="Edit"
        width="400px"
        onClose={handleDrawerAddCancel}
        footer={
          <Space size={'middle'} className={styles.footer_space}>
            <Button onClick={onReset}>Reset</Button>
            <Button onClick={onSubmit} type="primary">
              Submit
            </Button>
          </Space>
        }
      >
        {drawerBody}
      </Drawer>
    </>
  );
};
export default Edit;
