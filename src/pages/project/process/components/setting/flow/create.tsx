import type { FC, MutableRefObject } from 'react';
import { useCallback, useRef } from 'react';
import { useState } from 'react';
import { Button, Divider, Drawer, message, Space, Tooltip } from 'antd';
import { CloseOutlined, PlusOutlined } from '@ant-design/icons';
import type { ProFormInstance } from '@ant-design/pro-form';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import styles from '@/style/custom.less';
import type { ActionType } from '@ant-design/pro-table';
import ProcessFlowSelect from './select';
import { createExchangeJson } from '@/services/process/api';
import { FormattedMessage } from 'umi';

type Props = {
  projectId: number;
  processPkid: number;
  input: boolean;
  actionRef: MutableRefObject<ActionType | undefined>;
};
const ProcessFlowCreate: FC<Props> = ({ projectId, processPkid, input, actionRef }) => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const formRefCreate = useRef<ProFormInstance>();

  const reload = useCallback(() => {
    actionRef.current?.reload();
  }, [actionRef]);

  return (
    <>
      <Tooltip title={<FormattedMessage id="options.create" defaultMessage="Create" />}>
        <Button
          size={'middle'}
          type="text"
          icon={<PlusOutlined />}
          onClick={() => {
            setDrawerVisible(true);
          }}
        />
      </Tooltip>
      <Drawer
        title={
          input ? (
            <FormattedMessage id="process.createInputFlow" defaultMessage="Create Input Flow" />
          ) : (
            <FormattedMessage id="process.createOutputFlow" defaultMessage="Create Output Flow" />
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
            <Button onClick={() => formRefCreate.current?.submit()} type="primary">
              <FormattedMessage id="options.submit" defaultMessage="Submit" />
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
            createExchangeJson({
              ...values,
              processPkid,
              input,
            }).then(async (result) => {
              if (result === 'ok') {
                message.success(
                  <FormattedMessage
                    id="options.createsuccess"
                    defaultMessage="Successfully Created!"
                  />,
                );
                setDrawerVisible(false);
                reload();
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
            <ProcessFlowSelect projectId={projectId} formRef={formRefCreate} />
          </Divider>
          <ProFormText
            width="md"
            name="flowName"
            label={<FormattedMessage id="flow.dataName" defaultMessage="Name" />}
            disabled={true}
          />
          <ProFormText width="md" name="flowId" label="Flow Id" hidden={true} />
        </ProForm>
      </Drawer>
    </>
  );
};

export default ProcessFlowCreate;
