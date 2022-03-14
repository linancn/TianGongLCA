import type { FC } from 'react';
import { useCallback } from 'react';
import { Button, message, Modal, Tooltip } from 'antd';
import { DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import type { ActionType } from '@ant-design/pro-table';
import { deleteParameter } from '@/services/parameter/api';

type Props = {
  pkid: number;
  actionRef: React.MutableRefObject<ActionType | undefined>;
};

const ProcessParameterDelete: FC<Props> = ({ pkid, actionRef }) => {
  const onDelete = useCallback(() => {
    Modal.confirm({
      title: 'Are you sure to delete this flow?',
      icon: <ExclamationCircleOutlined />,
      content: '',
      onOk() {
        deleteParameter(pkid).then(async (result) => {
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

export default ProcessParameterDelete;
