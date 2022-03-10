import type { FC } from 'react';
import { useCallback } from 'react';
import { Button, message, Modal, Tooltip } from 'antd';
import { DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import type { ActionType } from '@ant-design/pro-table';
import { deleteUnitJson } from '@/services/unitgroup/api';

type Props = {
  unitGroupPkid: number;
  id: string;
  actionRef: React.MutableRefObject<ActionType | undefined>;
};
const UnitJsonDelete: FC<Props> = ({ unitGroupPkid, id, actionRef }) => {
  const onDelete = useCallback(() => {
    Modal.confirm({
      title: 'Are you sure to delete this unit?',
      icon: <ExclamationCircleOutlined />,
      content: '',
      onOk() {
        deleteUnitJson(unitGroupPkid, id).then(async (result) => {
          if (result === 'ok') {
            message.success('Delete successfully!');
            actionRef.current?.reload();
          } else {
            message.error(result);
          }
        });
      },
      onCancel() {},
    });
  }, [actionRef, id, unitGroupPkid]);
  return (
    <>
      <Tooltip title="Delete">
        <Button shape="circle" icon={<DeleteOutlined />} size="small" onClick={onDelete} />
      </Tooltip>
    </>
  );
};

export default UnitJsonDelete;
