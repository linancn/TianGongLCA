import type { FC } from 'react';
import { useCallback, useRef } from 'react';
import { useState } from 'react';
import { Button, Drawer, message, Space, Spin, Tooltip } from 'antd';
import { CloseOutlined, FormOutlined } from '@ant-design/icons';
import type { ProFormInstance } from '@ant-design/pro-form';
import ProForm, { ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import styles from '@/style/custom.less';
import type { ActionType } from '@ant-design/pro-table';
import { getParameterJson, updateParameterJson } from '@/services/process/api';
import { FormattedMessage } from 'umi';

type Props = {
  projectId: number;
  processId: string;
  id: string;
  actionRef: React.MutableRefObject<ActionType | undefined>;
};
const ParameterJsonEdit: FC<Props> = ({ projectId, processId, id, actionRef }) => {
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
    getParameterJson(projectId, processId, id).then(async (pi) => {
      setEditForm(
        <ProForm
          formRef={formRefEdit}
          submitter={{
            render: () => {
              return [];
            },
          }}
          onFinish={async (values) => {
            updateParameterJson({ ...values, projectId, processId, id: pi.id }).then(
              async (result) => {
                if (result === 'ok') {
                  message.success(
                    <FormattedMessage
                      id="options.editsuccess"
                      defaultMessage="Edit successfully!"
                    />,
                  );
                  setDrawerVisible(false);
                  if (actionRef.current) {
                    actionRef.current.reload();
                  }
                } else {
                  message.error(result);
                }
              },
            );
            return true;
          }}
        >
          <ProFormText width="md" name="name" label="Name" />
          <ProFormText width="md" name="formula" label="Formula" />
          <ProFormText width="md" name="value" label="Value" />
          <ProFormText width="md" name="uncertaintyGeomSd" label="SD" />
          <ProFormText width="md" name="uncertaintyGeomMean" label="Mean" />
          <ProFormTextArea width="md" name="description" label="Description" />
        </ProForm>,
      );
      formRefEdit.current?.setFieldsValue(pi);
    });
  }, [projectId, processId, id, actionRef]);

  const onReset = () => {
    getParameterJson(projectId, processId, id).then(async (result) => {
      formRefEdit.current?.setFieldsValue(result);
    });
  };

  return (
    <>
      <Tooltip title={<FormattedMessage id="options.edit" defaultMessage="Edit" />}>
        <Button shape="circle" icon={<FormOutlined />} size="small" onClick={onEdit} />
      </Tooltip>
      <Drawer
        title={<FormattedMessage id="options.edit" defaultMessage="Edit" />}
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

export default ParameterJsonEdit;
