import type { FC } from 'react';
import { useCallback, useRef } from 'react';
import { useState } from 'react';
import { Button, Divider, Drawer, message, Space, Tooltip } from 'antd';
import { CloseOutlined, FormOutlined } from '@ant-design/icons';
import type { ProFormInstance } from '@ant-design/pro-form';
import { ProFormSelect } from '@ant-design/pro-form';
import ProForm, { ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import styles from '@/style/custom.less';
import type { ActionType } from '@ant-design/pro-table';
import { getFlowPropertyJsonView, updateFlowPropertyJson } from '@/services/flow/api';
import FlowPropertyJsonSelect from './select';
import { FormattedMessage } from 'umi';

type Props = {
  projectId: number;
  flowPkid: number;
  propertyId: string;
  actionRef: React.MutableRefObject<ActionType | undefined>;
};
const FlowPropertyJsonEdit: FC<Props> = ({ projectId, flowPkid, propertyId, actionRef }) => {
  const [editForm, setEditForm] = useState<JSX.Element>();
  const [drawerVisible, setDrawerVisible] = useState(false);
  const formRefEdit = useRef<ProFormInstance>();

  const onEdit = useCallback(() => {
    setDrawerVisible(true);
    getFlowPropertyJsonView(flowPkid, propertyId).then(async (pi) => {
      setEditForm(
        <ProForm
          formRef={formRefEdit}
          submitter={{
            render: () => {
              return [];
            },
          }}
          onFinish={async (values) => {
            updateFlowPropertyJson(propertyId, {
              ...values,
              flowPkid,
              propertyId,
            }).then(async (result) => {
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
            name="conversionFactor"
            label={
              <FormattedMessage
                id="flowproperty.conversionFactor"
                defaultMessage="Conversion Factor"
              />
            }
          />
          <ProFormSelect
            options={[
              {
                value: 'true',
                label: 'true',
              },
            ]}
            width="md"
            name="referenceFlowProperty"
            label={
              <FormattedMessage
                id="flowproperty.referenceFlowProperty"
                defaultMessage="Reference Flow Property"
              />
            }
            disabled={pi.referenceFlowProperty}
          />
          <Divider>
            <FormattedMessage id="flowproperty.baseinfo" defaultMessage="Flow Property Base Info" />{' '}
            <FlowPropertyJsonSelect projectId={projectId} formRef={formRefEdit} />
          </Divider>
          <ProFormText width="md" name="flowPropertyId" label="Flow Property Id" hidden={true} />
          <ProFormText
            width="md"
            name="dataName"
            label={<FormattedMessage id="flowproperty.dataName" defaultMessage="Data Name" />}
            disabled={true}
          />
          <ProFormTextArea
            width="md"
            name="description"
            label={<FormattedMessage id="flowproperty.description" defaultMessage="Description" />}
            disabled={true}
          />
        </ProForm>,
      );
      formRefEdit.current?.setFieldsValue(pi);
      formRefEdit.current?.setFieldsValue({
        referenceFlowProperty: pi.referenceFlowProperty === true ? 'true' : 'false',
      });
    });
  }, [actionRef, flowPkid, projectId, propertyId]);

  const onReset = () => {
    getFlowPropertyJsonView(flowPkid, propertyId).then(async (result) => {
      formRefEdit.current?.setFieldsValue(result);
      formRefEdit.current?.setFieldsValue({
        referenceFlowProperty: result.referenceFlowProperty === true ? 'true' : 'false',
      });
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
              <FormattedMessage id="options.cancel" defaultMessage="Cancel" />
            </Button>
            <Button onClick={onReset}>
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

export default FlowPropertyJsonEdit;
