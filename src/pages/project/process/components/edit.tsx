import type { FC } from 'react';
import { useCallback, useRef } from 'react';
import { useState } from 'react';
import { Button, Drawer, Form, Input, message, Space, Spin, Tooltip } from 'antd';
import { CloseOutlined, FormOutlined } from '@ant-design/icons';
import type { ProFormInstance } from '@ant-design/pro-form';
import ProForm, { ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import styles from '@/style/custom.less';
import type { ActionType } from '@ant-design/pro-table';
import { getProcessByPkid, updateProcess } from '@/services/process/api';
import { FormattedMessage } from 'umi';
import CategoryViewByParent from '../../category/components/viewbyparent';
import LocationViewByParent from '../../location/components/viewbyparent';

type Props = {
  pkid: number;
  buttonType: string;
  actionRef: React.MutableRefObject<ActionType | undefined>;
  setViewDrawerVisible: React.Dispatch<React.SetStateAction<boolean>>;
};
const ProcessEdit: FC<Props> = ({ pkid, buttonType, actionRef, setViewDrawerVisible }) => {
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
    getProcessByPkid(pkid).then(async (pi) => {
      setEditForm(
        <ProForm
          formRef={formRefEdit}
          submitter={{
            render: () => {
              return [];
            },
          }}
          onFinish={async (values) => {
            updateProcess({ ...values, pkid: pi.pkid }).then(async (result) => {
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
            label={<FormattedMessage id="process.dataName" defaultMessage="Data Name" />}
          />
          <ProFormText
            width="md"
            name="processType"
            label={<FormattedMessage id="process.processType" defaultMessage="Process Type" />}
          />
          <Form.Item
            name="categoryName"
            label={<FormattedMessage id="process.categoryName" defaultMessage="Category" />}
          >
            <Input
              disabled={true}
              style={{ width: '328px' }}
              addonAfter={
                <CategoryViewByParent
                  projectId={pi.projectId}
                  id={pi.categoryId}
                  parentType={'process'}
                  parentId={pi.id}
                  actionRef={actionRef}
                />
              }
            />
          </Form.Item>
          <Form.Item
            name="locationName"
            label={<FormattedMessage id="process.locationName" defaultMessage="Location Name" />}
          >
            <Input
              disabled={true}
              style={{ width: '328px' }}
              addonAfter={
                <LocationViewByParent
                  projectId={pi.projectId}
                  id={pi.locationId}
                  parentType={'process'}
                  parentPkid={pkid}
                  actionRef={actionRef}
                />
              }
            />
          </Form.Item>
          <ProFormTextArea
            width="md"
            name="description"
            label={<FormattedMessage id="process.description" defaultMessage="Description" />}
          />
          <ProFormText
            width="md"
            name="version"
            label={<FormattedMessage id="process.version" defaultMessage="Version" />}
          />
          <ProFormText
            width="md"
            name="database"
            label={<FormattedMessage id="process.database" defaultMessage="Database" />}
          />
          <ProFormText
            width="md"
            name="version"
            label={<FormattedMessage id="process.version" defaultMessage="Version" />}
          />
          <ProFormText
            width="md"
            name="release"
            label={<FormattedMessage id="process.release" defaultMessage="Release" />}
          />
        </ProForm>,
      );
      formRefEdit.current?.setFieldsValue(pi);
    });
  }, [actionRef, pkid, setViewDrawerVisible]);

  const onReset = () => {
    getProcessByPkid(pkid).then(async (result) => {
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
            {<FormattedMessage id="options.edit" defaultMessage="Edit" />}
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

export default ProcessEdit;
