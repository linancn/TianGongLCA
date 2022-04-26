import type { FC } from 'react';
import { useCallback, useRef } from 'react';
import { useState } from 'react';
import { Button, Drawer, message, Space, Spin, Tooltip } from 'antd';
import { CloseOutlined, FormOutlined } from '@ant-design/icons';
import type { ProFormInstance } from '@ant-design/pro-form';
import { ProFormSelect } from '@ant-design/pro-form';
import ProForm, { ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import styles from '@/style/custom.less';
import type { ActionType } from '@ant-design/pro-table';
import { getUnitJson, updateUnitJson } from '@/services/unitgroup/api';
import { FormattedMessage } from 'umi';

type Props = {
  unitGroupPkid: number;
  id: string;
  actionRef: React.MutableRefObject<ActionType | undefined>;
};
const UnitJsonEdit: FC<Props> = ({ unitGroupPkid, id, actionRef }) => {
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
    getUnitJson(unitGroupPkid, id).then(async (pi) => {
      setEditForm(
        <ProForm
          formRef={formRefEdit}
          submitter={{
            render: () => {
              return [];
            },
          }}
          onFinish={async (values) => {
            updateUnitJson({
              ...values,
              unitGroupPkid,
              id,
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
            name="name"
            label={<FormattedMessage id="unitgroup.dataName" defaultMessage="Data Name" />}
          />
          <ProFormText
            width="md"
            name="conversionFactor"
            label={
              <FormattedMessage
                id="unitgroup.conversionFactor"
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
            name="referenceUnit"
            label={
              <FormattedMessage id="unitgroup.referenceUnit" defaultMessage="Reference Unit" />
            }
            disabled={pi.referenceUnit}
          />
          <ProFormTextArea
            width="md"
            name="description"
            label={<FormattedMessage id="unitgroup.description" defaultMessage="Description" />}
          />
        </ProForm>,
      );
      formRefEdit.current?.setFieldsValue(pi);
      formRefEdit.current?.setFieldsValue({
        referenceUnit: pi.referenceUnit === true ? 'true' : 'false',
      });
    });
  }, [actionRef, id, unitGroupPkid]);

  const onReset = () => {
    getUnitJson(unitGroupPkid, id).then(async (result) => {
      formRefEdit.current?.setFieldsValue(result);
      formRefEdit.current?.setFieldsValue({
        referenceUnit: result.referenceUnit === true ? 'true' : 'false',
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

export default UnitJsonEdit;
