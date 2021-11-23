import type { FC } from 'react';
import { useCallback } from 'react';
import { deleteMeasurementBase } from '@/services/measurementbase/api';
import { Button, message, Modal, Tooltip } from 'antd';
import { DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import type { ActionType } from '@ant-design/pro-table';

type Props = {
  pkid: number;
  actionRef: React.MutableRefObject<ActionType | undefined>;
};
const MeasurementDelete: FC<Props> = ({ pkid, actionRef }) => {
  const onDelete = useCallback(() => {
    Modal.confirm({
      title: 'Do you Want to delete this measurement?',
      icon: <ExclamationCircleOutlined />,
      content: '',
      onOk() {
        deleteMeasurementBase(pkid).then(async (result) => {
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
  }, [actionRef, pkid]);
  return (
    <>
      <Tooltip title="Delete">
        <Button shape="circle" icon={<DeleteOutlined />} size="small" onClick={onDelete} />
      </Tooltip>
    </>
  );
};

export default MeasurementDelete;
