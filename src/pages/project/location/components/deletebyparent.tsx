import { Button, message, Tooltip } from 'antd';
import type { ActionType } from '@ant-design/pro-table';
import type { FC } from 'react';
import { useCallback } from 'react';
import { updateParentLocation } from '@/services/location/api';
import { FormattedMessage } from 'umi';

type Props = {
  projectId: number;
  parentId: string;
  parentType: string;
  parentActionRef: React.MutableRefObject<ActionType | undefined>;
  setViewDrawerVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const LocationDeleteByParent: FC<Props> = ({
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
    updateParentLocation(parentType, projectId, parentId, '').then(async (result) => {
      if (result === 'ok') {
        message.success(
          <FormattedMessage
            id="location.deletesuccess"
            defaultMessage="Selected location has been deleted."
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
        {<FormattedMessage id="options.delete" defaultMessage="Delete" />}
      </Button>
    </Tooltip>
  );
};

export default LocationDeleteByParent;
