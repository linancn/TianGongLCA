import type { FC, MutableRefObject } from 'react';
import { useCallback, useRef } from 'react';
import { useState } from 'react';
import { Button, Divider, Drawer, message, Space, Spin, Tooltip } from 'antd';
import { CloseOutlined, FormOutlined } from '@ant-design/icons';
import type { ProFormInstance } from '@ant-design/pro-form';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import styles from '@/style/custom.less';
import type { ActionType } from '@ant-design/pro-table';
import { getExchangeJson, updateExchangeJson } from '@/services/process/api';
import ProcessFlowSelect from './select';
import { FormattedMessage } from 'umi';

type Props = {
  projectId: number;
  processId: string;
  processPkid: number;
  internalId: number;
  input: boolean;
  actionRef: MutableRefObject<ActionType | undefined>;
};
const ProcessFlowEdit: FC<Props> = ({
  projectId,
  processId,
  processPkid,
  internalId,
  input,
  actionRef,
}) => {
  const [editForm, setEditForm] = useState<JSX.Element>();
  const [drawerVisible, setDrawerVisible] = useState(false);
  const formRefEdit = useRef<ProFormInstance>();

  const onEdit = useCallback(() => {
    setDrawerVisible(true);
    setEditForm(
      <div className={styles.loading_spin_div}>
        <Spin />
      </div>,
    );
    getExchangeJson(projectId, processId, internalId, input).then(async (pi) => {
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
                message.success(
                  <FormattedMessage id="options.editsuccess" defaultMessage="Edit successfully!" />,
                );
                setDrawerVisible(false);
                actionRef.current?.reload();
              } else {
                message.error(result);
              }
            });
            return true;
          }}
        >
          <ProFormText
            width="md"
            name="amount"
            label={<FormattedMessage id="process.amount" defaultMessage="Amount" />}
          />
          <ProFormText
            width="md"
            name="amountFormula"
            label={<FormattedMessage id="process.amountFormula" defaultMessage="Amount Formula" />}
          />
          <Divider>
            <FormattedMessage id="flow.flowinfo" defaultMessage="Flow Info" />{' '}
            <ProcessFlowSelect projectId={projectId} formRef={formRefEdit} />
          </Divider>
          <ProFormText
            width="md"
            name="flowName"
            label={<FormattedMessage id="flow.dataName" defaultMessage="Name" />}
            disabled={true}
          />
          <ProFormText width="md" name="flowId" label="Flow Id" hidden={true} />
        </ProForm>,
      );
      formRefEdit.current?.setFieldsValue(pi);
    });
  }, [projectId, processId, internalId, input, processPkid, actionRef]);

  const onReset = () => {
    getExchangeJson(projectId, processId, internalId, input).then(async (result) => {
      formRefEdit.current?.setFieldsValue(result);
    });
  };

  return (
    <>
      <Tooltip title={<FormattedMessage id="options.edit" defaultMessage="Edit" />}>
        <Button shape="circle" icon={<FormOutlined />} size="small" onClick={onEdit} />
      </Tooltip>
      <Drawer
        title={
          input ? (
            <FormattedMessage id="process.editInputFlow" defaultMessage="Edit Input Flow" />
          ) : (
            <FormattedMessage id="process.editOutputFlow" defaultMessage="Edit Output Flow" />
          )
        }
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
            <Button onClick={() => setDrawerVisible(false)}>
              {' '}
              <FormattedMessage id="options.cancel" defaultMessage="Cancel" />
            </Button>
            <Button onClick={onReset}>
              {' '}
              <FormattedMessage id="options.reset" defaultMessage="Reset" />
            </Button>
            <Button onClick={() => formRefEdit.current?.submit()} type="primary">
              <FormattedMessage id="options.submit" defaultMessage="Submit" />
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
