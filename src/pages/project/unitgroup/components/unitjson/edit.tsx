import type { FC } from 'react';
import { useCallback, useRef } from 'react';
import { useState } from 'react';
import { Button, Drawer, message, Space, Tooltip } from 'antd';
import { CloseOutlined, FormOutlined } from '@ant-design/icons';
import type { ProFormInstance } from '@ant-design/pro-form';
import { ProFormSelect } from '@ant-design/pro-form';
import ProForm, { ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import styles from '@/style/custom.less';
import type { ActionType } from '@ant-design/pro-table';
import { getUnitJson, updateUnitJson } from '@/services/unitgroup/api';

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
                message.success('Edit successfully!');
                setDrawerVisible(false);
                actionRef.current?.reload();
              } else {
                message.error(result);
              }
            });
            return true;
          }}
        >
          <ProFormText width="md" name="name" label="Name" />
          <ProFormText width="md" name="conversionFactor" label="Conversion Factor" />
          <ProFormSelect
            options={[
              {
                value: 'true',
                label: 'true',
              },
            ]}
            width="md"
            name="referenceUnit"
            label="Reference Unit"
            disabled={pi.referenceUnit}
          />
          <ProFormTextArea width="md" name="description" label="Description" />
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
      <Tooltip title="Edit">
        <Button shape="circle" icon={<FormOutlined />} size="small" onClick={onEdit} />
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
        maskClosable={false}
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

export default UnitJsonEdit;
