import { Button, message, Tooltip } from 'antd';
import type { ActionType } from '@ant-design/pro-table';
import type { FC } from 'react';
import { useCallback } from 'react';
import { updateParentCategory } from '@/services/category/api';
import { FormattedMessage } from 'umi';

type Props = {
  projectId: number;
  parentId: string;
  parentType: string;
  parentActionRef: React.MutableRefObject<ActionType | undefined>;
  setViewDrawerVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const CategoryDeleteByParent: FC<Props> = ({
  projectId,
  parentId,
  parentType,
  parentActionRef,
  setViewDrawerVisible,
}) => {
  const reload = useCallback(() => {
    setViewDrawerVisible(false);
    parentActionRef.current?.reload();
  }, [parentActionRef, setViewDrawerVisible]);

  const onDelete = () => {
    updateParentCategory(parentType, projectId, parentId, '').then(async (result) => {
      if (result === 'ok') {
        message.success(
          <FormattedMessage
            id="category.deletesuccess"
            defaultMessage="Selected category has been deleted."
          />,
        );
        reload();
      } else {
        message.error(result);
      }
    });
  };

  return (
    <Tooltip title={<FormattedMessage id="options.delete" defaultMessage="Delete" />}>
      <Button onClick={onDelete}>
        <FormattedMessage id="options.delete" defaultMessage="Delete" />
      </Button>
    </Tooltip>
  );
};

export default CategoryDeleteByParent;
