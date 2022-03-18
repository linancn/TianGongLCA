import type { FC, MutableRefObject } from 'react';
import { useCallback, useRef } from 'react';
import { useState } from 'react';
import { Button, Divider, Drawer, message, Space, Tooltip } from 'antd';
import { CloseOutlined, FormOutlined } from '@ant-design/icons';
import type { ProFormInstance } from '@ant-design/pro-form';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import styles from '@/style/custom.less';
import type { ActionType } from '@ant-design/pro-table';
import { getExchangeJson, updateExchangeJson } from '@/services/process/api';
import ProcessFlowSelect from './select';

type Props = {
  projectId: number;
  processPkid: number;
  flowId: string;
  input: boolean;
  actionRef: MutableRefObject<ActionType | undefined>;
};
const ProcessFlowEdit: FC<Props> = ({ projectId, processPkid, flowId, input, actionRef }) => {
  const [editForm, setEditForm] = useState<JSX.Element>();
  const [drawerVisible, setDrawerVisible] = useState(false);
  const formRefEdit = useRef<ProFormInstance>();

  const onEdit = useCallback(() => {
    setDrawerVisible(true);
    getExchangeJson(processPkid, flowId, input).then(async (pi) => {
      setEditForm(
        <ProForm
          formRef={formRefEdit}
          submitter={{
            render: () => {
              return [];
            },
          }}
          onFinish={async (values) => {
            updateExchangeJson({ ...values, processPkid, input }).then(async (result) => {
              if (result === 'ok') {
                message.success('Successfully Edited!');
                setDrawerVisible(false);
                actionRef.current?.reload();
              } else {
                message.error(result);
              }
            });
            return true;
          }}
        >
          <ProFormText width="md" name="amount" label="Amount" />
          <ProFormText width="md" name="amountFormula" label="Amount Formula" />
          <Divider>
            Flow Info <ProcessFlowSelect projectId={projectId} formRef={formRefEdit} />
          </Divider>
          <ProFormText width="md" name="flowName" label="Name" disabled={true} />
          <ProFormText width="md" name="flowId" label="Flow Id" hidden={true} />
        </ProForm>,
      );
      formRefEdit.current?.setFieldsValue(pi);
    });
  }, [processPkid, flowId, input, projectId, actionRef]);

  const onReset = () => {
    getExchangeJson(processPkid, flowId, input).then(async (result) => {
      formRefEdit.current?.setFieldsValue(result);
    });
  };

  return (
    <>
      <Tooltip title="Edit">
        <Button shape="circle" icon={<FormOutlined />} size="small" onClick={onEdit} />
      </Tooltip>
      <Drawer
        title={input ? 'Edit Input Flow' : 'Edit Output Flow'}
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
