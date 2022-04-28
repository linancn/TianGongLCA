import type { FC } from 'react';
import { useCallback, useRef } from 'react';
import { useState } from 'react';
import { Button, Drawer, Form, Input, message, Space, Spin, Tooltip } from 'antd';
import { CloseOutlined, FormOutlined } from '@ant-design/icons';
import type { ProFormInstance } from '@ant-design/pro-form';
import ProForm, { ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import styles from '@/style/custom.less';
import type { ActionType } from '@ant-design/pro-table';
import { getFlowByPkid, updateFlow } from '@/services/flow/api';
import LocationViewByParent from '../../location/components/viewbyparent';
import CategoryViewByParent from '../../category/components/viewbyparent';
import FlowPropertyJsonList from './propertyjson/list';
import { FormattedMessage } from 'umi';

type Props = {
  pkid: number;
  buttonType: string;
  actionRef: React.MutableRefObject<ActionType | undefined>;
  setViewDrawerVisible: React.Dispatch<React.SetStateAction<boolean>>;
};
const FlowEdit: FC<Props> = ({ pkid, buttonType, actionRef, setViewDrawerVisible }) => {
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
    getFlowByPkid(pkid).then(async (pi) => {
      setEditForm(
        <ProForm
          formRef={formRefEdit}
          submitter={{
            render: () => {
              return [];
            },
          }}
          onFinish={async (values) => {
            updateFlow({ ...values, pkid: pi.pkid }).then(async (result) => {
              if (result === 'ok') {
                message.success(
                  <FormattedMessage id="options.editsuccess" defaultMessage="Edit successfully!" />,
                );
                setDrawerVisible(false);
                setViewDrawerVisible(false);
                if (actionRef.current) {
                  actionRef.current.reload();
                }
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
          <ProFormText
            width="md"
            name="flowType"
            label={<FormattedMessage id="flow.flowType" defaultMessage="Flow Type" />}
          />
          <Form.Item
            name="categoryName"
            label={<FormattedMessage id="flow.categoryName" defaultMessage="Category" />}
          >
            <Input
              disabled={true}
              style={{ width: '328px' }}
              addonAfter={
                <CategoryViewByParent
                  projectId={pi.projectId}
                  id={pi.categoryId}
                  parentType={'flow'}
                  parentPkid={pkid}
                  actionRef={actionRef}
                />
              }
            />
          </Form.Item>
          <Form.Item
            name="locationName"
            label={<FormattedMessage id="flow.locationName" defaultMessage="Location Name" />}
          >
            <Input
              disabled={true}
              style={{ width: '328px' }}
              addonAfter={
                <LocationViewByParent
                  projectId={pi.projectId}
                  id={pi.locationId}
                  parentType={'flow'}
                  parentPkid={pkid}
                  actionRef={actionRef}
                />
              }
            />
          </Form.Item>
          <Form.Item
            name="flowPropertyCount"
            label={
              <FormattedMessage id="flow.flowPropertyCount" defaultMessage="Measurement Count" />
            }
          >
            <Input
              disabled={true}
              style={{ width: '328px' }}
              addonAfter={
                <FlowPropertyJsonList
                  projectId={pi.projectId}
                  flowId={pi.id}
                  parentActionRef={actionRef}
                />
              }
            />
          </Form.Item>
          <ProFormTextArea
            width="md"
            name="description"
            label={<FormattedMessage id="flow.description" defaultMessage="Description" />}
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
          <ProFormText
            width="md"
            name="version"
            label={<FormattedMessage id="flow.version" defaultMessage="Version" />}
          />
        </ProForm>,
      );
      formRefEdit.current?.setFieldsValue(pi);
    });
  }, [actionRef, pkid, setViewDrawerVisible]);

  const onReset = () => {
    getFlowByPkid(pkid).then(async (result) => {
      formRefEdit.current?.setFieldsValue(result);
    });
  };

  return (
    <>
      <Tooltip title={<FormattedMessage id="options.edit" defaultMessage="Edit" />}>
        {buttonType === 'icon' ? (
          <Button shape="circle" icon={<FormOutlined />} size="small" onClick={onEdit} />
        ) : (
          <Button onClick={onEdit}>
            <FormattedMessage id="options.edit" defaultMessage="Edit" />
          </Button>
        )}
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
        maskClosable={true}
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

export default FlowEdit;
