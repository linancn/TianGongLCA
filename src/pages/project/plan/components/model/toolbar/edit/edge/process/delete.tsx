import type { FC } from 'react';
import { useCallback } from 'react';
import { Button, message, Modal, Tooltip } from 'antd';
import { DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import type { ActionType } from '@ant-design/pro-table';
import { deletePlanModelFlowByProcess } from '@/services/plan/api';

type Props = {
  projectId: number;
  planId: string;
  edgeSourceId: string;
  edgeTargetId: string;
  planSourceId: string;
  planTargetId: string;
  processSourceId: string;
  processTargetId: string;
  actionRef: React.MutableRefObject<ActionType | undefined>;
};
const DeleteEdgeProcess: FC<Props> = ({
  projectId,
  planId,
  edgeSourceId,
  edgeTargetId,
  planSourceId,
  planTargetId,
  processSourceId,
  processTargetId,
  actionRef,
}) => {
  const onDelete = useCallback(() => {
    Modal.confirm({
      title: 'Are you sure to delete this process?',
      icon: <ExclamationCircleOutlined />,
      content: '',
      onOk() {
        deletePlanModelFlowByProcess({
          projectId,
          planId,
          edgeSourceId,
          edgeTargetId,
          planSourceId,
          planTargetId,
          processSourceId,
          processTargetId,
        }).then(async (result) => {
          if (result === 'ok') {
            message.success('Successfully deleted!');
            actionRef.current?.reload();
          } else {
            message.error(result);
          }
        });
      },
      onCancel() {},
    });
  }, [
    actionRef,
    edgeSourceId,
    edgeTargetId,
    planId,
    planSourceId,
    planTargetId,
    processSourceId,
    processTargetId,
    projectId,
  ]);
  return (
    <>
      <Tooltip title="Delete">
        <Button shape="circle" icon={<DeleteOutlined />} size="small" onClick={onDelete} />
      </Tooltip>
    </>
  );
};

export default DeleteEdgeProcess;
