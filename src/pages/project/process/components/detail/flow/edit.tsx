import type { FC } from 'react';
import { useCallback, useRef } from 'react';
import { useState } from 'react';
import { Button, Divider, Drawer, message, Space, Tooltip } from 'antd';
import { FormOutlined } from '@ant-design/icons';
import type { ProFormInstance } from '@ant-design/pro-form';
import ProForm, { ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import styles from '@/style/custom.less';
import type { ActionType } from '@ant-design/pro-table';
import { updateFlowProcess } from '@/services/flowprocess/api';
import { getFlowProcessBaseByPkid } from '@/services/flowprocessbase/api';
import ProcessFlowBaseSelect from './select';

type Props = {
  pkid: number;
  projectId: number;
  ioType: string;
  actionRef: React.MutableRefObject<ActionType | undefined>;
};
const ProcessFlowEdit: FC<Props> = ({ pkid, projectId, ioType, actionRef }) => {
  const [editForm, setEditForm] = useState<JSX.Element>();
  const [drawerVisible, handleDrawerVisible] = useState(false);
  const formRefEdit = useRef<ProFormInstance>();

  const onEdit = useCallback(() => {
    handleDrawerVisible(true);
    getFlowProcessBaseByPkid(pkid).then(async (pi) => {
      setEditForm(
        <ProForm
          formRef={formRefEdit}
          submitter={{
            render: () => {
              return [];
            },
          }}
          onFinish={async (values) => {
            updateFlowProcess({ ...values, pkid: pi.pkid }).then(async (result) => {
              if (result === 'ok') {
                message.success('Successfully Edited!');
                handleDrawerVisible(false);
                actionRef.current?.reload();
              } else {
                message.error(result);
              }
            });
            return true;
          }}
        >
          <ProFormText width="md" name="amount" label="Amount" />
          <ProFormText width="md" name="sd" label="SD" />
          <ProFormText width="md" name="factor" label="Factor" />
          <ProFormText width="md" name="flowBaseId" label="FlowBaseId" hidden={true} />
          <Divider>
            Flow Base Info <ProcessFlowBaseSelect projectId={projectId} formRef={formRefEdit} />
          </Divider>
          <ProFormText width="md" name="name" label="Name" disabled={true} />
          <ProFormText width="md" name="nation" label="Nation" disabled={true} />
          <ProFormText width="md" name="source" label="Source" disabled={true} />
          <ProFormText width="md" name="type" label="Type" disabled={true} />
          <ProFormTextArea width="md" name="comment" label="Comment" disabled={true} />
        </ProForm>,
      );
      formRefEdit.current?.setFieldsValue(pi);
    });
  }, [pkid, projectId, actionRef]);

  const onReset = () => {
    getFlowProcessBaseByPkid(pkid).then(async (result) => {
      formRefEdit.current?.setFieldsValue(result);
    });
  };

  return (
    <>
      <Tooltip title="Edit">
        <Button shape="circle" icon={<FormOutlined />} size="small" onClick={onEdit} />
      </Tooltip>
      <Drawer
        title={ioType === 'input' ? 'Edit Input Flow' : 'Edit Output Flow'}
        width="400px"
        maskClosable={false}
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

export default ProcessFlowEdit;
