import type { FC } from 'react';
import { useCallback } from 'react';
import { Button, message, Modal, Tooltip } from 'antd';
import { DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import type { ActionType } from '@ant-design/pro-table';
import { deletePlanModelFlow } from '@/services/plan/api';

type Props = {
  projectId: number;
  modelId: string;
  edgeSourceId: string;
  edgeTargetId: string;
  planSourceId: string;
  planTargetId: string;
  processSourceId: string;
  processTargetId: string;
  flowSourceId: string;
  flowTargetId: string;
  actionRef: React.MutableRefObject<ActionType | undefined>;
};
const DeleteEdgeFlow: FC<Props> = ({
  projectId,
  modelId,
  edgeSourceId,
  edgeTargetId,
  planSourceId,
  planTargetId,
  processSourceId,
  processTargetId,
  flowSourceId,
  flowTargetId,
  actionRef,
}) => {
  const onDelete = useCallback(() => {
    Modal.confirm({
      title: 'Are you sure to delete this process?',
      icon: <ExclamationCircleOutlined />,
      content: '',
      onOk() {
        deletePlanModelFlow({
          projectId,
          planId: modelId,
          edgeSourceId,
          edgeTargetId,
          planSourceId,
          planTargetId,
          processSourceId,
          processTargetId,
          flowSourceId,
          flowTargetId,
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
    flowSourceId,
    flowTargetId,
    modelId,
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

export default DeleteEdgeFlow;
