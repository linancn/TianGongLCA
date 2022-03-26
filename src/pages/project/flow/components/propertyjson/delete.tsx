import type { FC } from 'react';
import { useCallback } from 'react';
import { Button, message, Modal, Tooltip } from 'antd';
import { DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import type { ActionType } from '@ant-design/pro-table';
import { deleteFlowPropertyJson } from '@/services/flow/api';
import { FormattedMessage } from 'umi';

type Props = {
  flowPkid: number;
  propertyId: string;
  actionRef: React.MutableRefObject<ActionType | undefined>;
};
const FlowPropertyJsonDelete: FC<Props> = ({ flowPkid, propertyId, actionRef }) => {
  const onDelete = useCallback(() => {
    Modal.confirm({
      title: 'Are you sure to delete this flow property?',
      icon: <ExclamationCircleOutlined />,
      content: '',
      onOk() {
        deleteFlowPropertyJson(flowPkid, propertyId).then(async (result) => {
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
  }, [actionRef, flowPkid, propertyId]);
  return (
    <>
      <Tooltip title={<FormattedMessage id="options.delete" defaultMessage="Delete" />}>
        <Button shape="circle" icon={<DeleteOutlined />} size="small" onClick={onDelete} />
      </Tooltip>
    </>
  );
};

export default FlowPropertyJsonDelete;
