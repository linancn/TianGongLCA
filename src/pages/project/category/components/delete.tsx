import type { FC } from 'react';
import { useCallback } from 'react';
import { Button, message, Modal, Tooltip } from 'antd';
import { DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import type { ActionType } from '@ant-design/pro-table';
import { deleteCategory } from '@/services/category/api';

type Props = {
  pkid: number;
  buttonType: string;
  actionRef: React.MutableRefObject<ActionType | undefined>;
  setViewDrawerVisible: React.Dispatch<React.SetStateAction<boolean>>;
};
const CategoryDelete: FC<Props> = ({ pkid, buttonType, actionRef, setViewDrawerVisible }) => {
  const onDelete = useCallback(() => {
    Modal.confirm({
      title: 'Are you sure to delete this category?',
      icon: <ExclamationCircleOutlined />,
      content: '',
      onOk() {
        deleteCategory(pkid).then(async (result) => {
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
        )}{' '}
      </Tooltip>
    </>
  );
};

export default CategoryDelete;
