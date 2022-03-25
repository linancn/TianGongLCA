import type { FC } from 'react';
import { useCallback } from 'react';
import { Button, message, Modal, Tooltip } from 'antd';
import { DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import type { ActionType } from '@ant-design/pro-table';
import { deleteFlow } from '@/services/flow/api';
import { FormattedMessage } from 'umi';

type Props = {
  pkid: number;
  buttonType: string;
  actionRef: React.MutableRefObject<ActionType | undefined>;
  setViewDrawerVisible: React.Dispatch<React.SetStateAction<boolean>>;
};
const FlowDelete: FC<Props> = ({ pkid, buttonType, actionRef, setViewDrawerVisible }) => {
  const onDelete = useCallback(() => {
    Modal.confirm({
      title: 'Are you sure to delete this flow?',
      icon: <ExclamationCircleOutlined />,
      content: '',
      onOk() {
        deleteFlow(pkid).then(async (result) => {
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
      <Tooltip title={<FormattedMessage id="options.delete" defaultMessage="Delete" />}>
        {buttonType === 'icon' ? (
          <Button shape="circle" icon={<DeleteOutlined />} size="small" onClick={onDelete} />
        ) : (
          <Button onClick={onDelete}>
            <FormattedMessage id="options.delete" defaultMessage="Delete" />
          </Button>
        )}
      </Tooltip>
    </>
  );
};

export default FlowDelete;
