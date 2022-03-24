import type { FC } from 'react';
import { useCallback, useRef } from 'react';
import { useState } from 'react';
import { Button, Drawer, Form, Input, message, Space, Tooltip } from 'antd';
import { CloseOutlined, FormOutlined } from '@ant-design/icons';
import type { ProFormInstance } from '@ant-design/pro-form';
import ProForm, { ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import styles from '@/style/custom.less';
import type { ActionType } from '@ant-design/pro-table';
import { getFlowPropertyByPkid, updateFlowProperty } from '@/services/flowproperty/api';
import CategoryViewByParent from '../../category/components/viewbyparent';
import UnitGroupViewByParent from '../../unitgroup/components/viewbyparent';

type Props = {
  pkid: number;
  buttonType: string;
  actionRef: React.MutableRefObject<ActionType | undefined>;
  setViewDrawerVisible: React.Dispatch<React.SetStateAction<boolean>>;
};
const FlowPropertyEdit: FC<Props> = ({ pkid, buttonType, actionRef, setViewDrawerVisible }) => {
  const [editForm, setEditForm] = useState<JSX.Element>();
  const [drawerVisible, setDrawerVisible] = useState(false);
  const formRefEdit = useRef<ProFormInstance>();

  const onEdit = useCallback(() => {
    setDrawerVisible(true);
    getFlowPropertyByPkid(pkid).then(async (pi) => {
      setEditForm(
        <ProForm
          formRef={formRefEdit}
          submitter={{
            render: () => {
              return [];
            },
          }}
          onFinish={async (values) => {
            updateFlowProperty({ ...values, pkid: pi.pkid }).then(async (result) => {
              if (result === 'ok') {
                message.success('Edit successfully!');
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
          <ProFormText width="md" name="dataName" label="Data Name" />
          <ProFormText width="md" name="version" label="Version" />
          <ProFormTextArea width="md" name="description" label="Description" />
          <ProFormText width="md" name="flowPropertyType" label="Flow Property Type" />
          <Form.Item name="categoryName" label="Category">
            <Input
              disabled={true}
              style={{ width: '328px' }}
              addonAfter={
                <CategoryViewByParent
                  projectId={pi.projectId}
                  id={pi.categoryId}
                  parentType={'flowproperty'}
                  parentPkid={pkid}
                  actionRef={actionRef}
                />
              }
            />
          </Form.Item>
          <Form.Item name="unitGroupName" label="Unit Group">
            <Input
              disabled={true}
              style={{ width: '328px' }}
              addonAfter={
                <UnitGroupViewByParent
                  projectId={pi.projectId}
                  id={pi.unitGroupId}
                  parentPkid={pi.pkid}
                  parentType={'flowproperty'}
                  actionRef={actionRef}
                />
              }
            />
          </Form.Item>
          <ProFormText width="md" name="release" label="Release" />
        </ProForm>,
      );
      formRefEdit.current?.setFieldsValue(pi);
    });
  }, [actionRef, pkid, setViewDrawerVisible]);

  const onReset = () => {
    getFlowPropertyByPkid(pkid).then(async (result) => {
      formRefEdit.current?.setFieldsValue(result);
    });
  };

  return (
    <>
      <Tooltip title="Edit">
        {buttonType === 'icon' ? (
          <Button shape="circle" icon={<FormOutlined />} size="small" onClick={onEdit} />
        ) : (
          <Button onClick={onEdit}>Edit</Button>
        )}{' '}
      </Tooltip>
      <Drawer
        title="Edit"
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

export default FlowPropertyEdit;
