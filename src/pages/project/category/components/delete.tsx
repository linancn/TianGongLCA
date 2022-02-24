import type { FC } from 'react';
import { useCallback } from 'react';
import { Button, message, Modal, Tooltip } from 'antd';
import { DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import type { ActionType } from '@ant-design/pro-table';
import { deleteCategory } from '@/services/category/api';

type Props = {
  pkid: number;
  actionRef: React.MutableRefObject<ActionType | undefined>;
};
const CategoryDelete: FC<Props> = ({ pkid, actionRef }) => {
  const onDelete = useCallback(() => {
    Modal.confirm({
      title: 'Are you sure to delete this category?',
      icon: <ExclamationCircleOutlined />,
      content: '',
      onOk() {
        deleteCategory(pkid).then(async (result) => {
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
  }, [actionRef, pkid]);
  return (
    <>
      <Tooltip title="Delete">
        <Button shape="circle" icon={<DeleteOutlined />} size="small" onClick={onDelete} />
      </Tooltip>
    </>
  );
};

export default CategoryDelete;
