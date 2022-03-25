import type { FC } from 'react';
import { useCallback, useRef } from 'react';
import { useState } from 'react';
import { Button, Drawer, message, Space, Tooltip } from 'antd';
import { CloseOutlined, PlusOutlined } from '@ant-design/icons';
import type { ProFormInstance } from '@ant-design/pro-form';
import ProForm, { ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import styles from '@/style/custom.less';
import type { ActionType } from '@ant-design/pro-table';
import { createFlow } from '@/services/flow/api';
import { FormattedMessage } from 'umi';

type Props = {
  projectId: number;
  actionRef: React.MutableRefObject<ActionType | undefined>;
};
const FlowCreate: FC<Props> = ({ projectId, actionRef }) => {
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
            <Button onClick={() => setDrawerVisible(false)}>Cancel</Button>
            <Button onClick={() => formRefCreate.current?.submit()} type="primary">
              Submit
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
            createFlow({ ...values, projectId }).then(async (result) => {
              if (result === 'ok') {
                message.success('Successfully Created!');
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
            name="dataName"
            label={<FormattedMessage id="flow.dataName" defaultMessage="Data Name" />}
          />
          <ProFormTextArea
            width="md"
            name="description"
            label={<FormattedMessage id="flow.description" defaultMessage="Description" />}
          />
          <ProFormText
            width="md"
            name="version"
            label={<FormattedMessage id="flow.version" defaultMessage="Version" />}
          />
          <ProFormText
            width="md"
            name="synonyms"
            label={<FormattedMessage id="flow.synonyms" defaultMessage="Synonyms" />}
          />
          <ProFormText
            width="md"
            name="formula"
            label={<FormattedMessage id="flow.formula" defaultMessage="Formula" />}
          />
          <ProFormText
            width="md"
            name="flowType"
            label={<FormattedMessage id="flow.flowType" defaultMessage="Flow Type" />}
          />
          <ProFormText
            width="md"
            name="cas"
            label={<FormattedMessage id="flow.cas" defaultMessage="Cas" />}
          />
          <ProFormText
            width="md"
            name="database"
            label={<FormattedMessage id="flow.database" defaultMessage="Database" />}
          />
          <ProFormText
            width="md"
            name="release"
            label={<FormattedMessage id="flow.release" defaultMessage="Release" />}
          />
        </ProForm>
      </Drawer>
    </>
  );
};

export default FlowCreate;
