import type { FC } from 'react';
import { useCallback } from 'react';
import { Button, message, Modal, Tooltip } from 'antd';
import { DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import type { ActionType } from '@ant-design/pro-table';
import { deleteParameterJson } from '@/services/process/api';

type Props = {
  projectId: number;
  processId: string;
  id: string;
  actionRef: React.MutableRefObject<ActionType | undefined>;
};

const ParameterJsonDelete: FC<Props> = ({ projectId, processId, id, actionRef }) => {
  const onDelete = useCallback(() => {
    Modal.confirm({
      title: 'Are you sure to delete this parameter?',
      icon: <ExclamationCircleOutlined />,
      content: '',
      onOk() {
        deleteParameterJson({ projectId, processId, id }).then(async (result) => {
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
  }, [actionRef, id, processId, projectId]);
  return (
    <>
      <Tooltip title="Delete">
        <Button shape="circle" icon={<DeleteOutlined />} size="small" onClick={onDelete} />
      </Tooltip>
    </>
  );
};

export default ParameterJsonDelete;
