import type { FC, MutableRefObject } from 'react';
import { useCallback, useRef } from 'react';
import { useState } from 'react';
import { Button, Drawer, message, Space, Tooltip } from 'antd';
import { CloseOutlined, PlusOutlined } from '@ant-design/icons';
import type { ProFormInstance } from '@ant-design/pro-form';
import { ProFormTextArea } from '@ant-design/pro-form';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import styles from '@/style/custom.less';
import type { ActionType } from '@ant-design/pro-table';
import { createParameterJson } from '@/services/process/api';
import { FormattedMessage } from 'umi';

type Props = {
  projectId: number;
  processId: string;
  actionRef: MutableRefObject<ActionType | undefined>;
};
const ParameterJsonCreate: FC<Props> = ({ projectId, processId, actionRef }) => {
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
        title={<FormattedMessage id="options.create" defaultMessage="Create" />}
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
            createParameterJson({ ...values, projectId, processId }).then(async (result) => {
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
            name="name"
            label={<FormattedMessage id="parameter.dataName" defaultMessage="Data Name" />}
          />
          <ProFormText
            width="md"
            name="formula"
            label={<FormattedMessage id="parameter.formula" defaultMessage="Formula" />}
          />
          <ProFormText
            width="md"
            name="value"
            label={<FormattedMessage id="parameter.value" defaultMessage="Value" />}
          />
          <ProFormText
            width="md"
            name="uncertaintyGeomSd"
            label={<FormattedMessage id="parameter.uncertaintyGeomSd" defaultMessage="SD" />}
          />
          <ProFormText
            width="md"
            name="uncertaintyGeomMean"
            label={<FormattedMessage id="parameter.uncertaintyGeomMean" defaultMessage="Mean" />}
          />
          <ProFormTextArea
            width="md"
            name="description"
            label={<FormattedMessage id="parameter.description" defaultMessage="Description" />}
          />
        </ProForm>
      </Drawer>
    </>
  );
};

export default ParameterJsonCreate;
