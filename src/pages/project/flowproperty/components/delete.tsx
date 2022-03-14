import type { FC } from 'react';
import { useCallback } from 'react';
import { Button, message, Modal, Tooltip } from 'antd';
import { DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import type { ActionType } from '@ant-design/pro-table';
import { deleteFlowProperty } from '@/services/flowproperty/api';

type Props = {
  pkid: number;
  buttonType: string;
  actionRef: React.MutableRefObject<ActionType | undefined>;
  setViewDrawerVisible: React.Dispatch<React.SetStateAction<boolean>>;
};
const FlowPropertyDelete: FC<Props> = ({ pkid, buttonType, actionRef, setViewDrawerVisible }) => {
  const onDelete = useCallback(() => {
    Modal.confirm({
      title: 'Are you sure to delete this flow property?',
      icon: <ExclamationCircleOutlined />,
      content: '',
      onOk() {
        deleteFlowProperty(pkid).then(async (result) => {
          if (result === 'ok') {
            message.success('Successfully deleted!');
            setViewDrawerVisible(false);
            actionRef.current?.reload();
          } else {
            message.error(result);
          }
        });
      },
      onCancel() {},
    });
  }, [actionRef, pkid, setViewDrawerVisible]);
  return (
    <>
      <Tooltip title="Delete">
        {buttonType === 'icon' ? (
          <Button shape="circle" icon={<DeleteOutlined />} size="small" onClick={onDelete} />
        ) : (
          <Button onClick={onDelete}>Delete</Button>
        )}
      </Tooltip>
    </>
  );
};

export default FlowPropertyDelete;
