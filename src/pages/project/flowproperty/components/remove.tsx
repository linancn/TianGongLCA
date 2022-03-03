import { Button, message, Tooltip } from 'antd';
import type { ActionType } from '@ant-design/pro-table';
import type { FC } from 'react';
import { useCallback } from 'react';
import { updateParentLocation } from '@/services/location/api';

type Props = {
  projectId: number;
  parentPkid: number;
  parentType: string;
  parentActionRef: React.MutableRefObject<ActionType | undefined>;
  setViewDrawerVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const LocationRemove: FC<Props> = ({
  parentPkid,
  parentType,
  parentActionRef,
  setViewDrawerVisible,
}) => {
  const reload = useCallback(() => {
    setViewDrawerVisible(false);
    parentActionRef.current?.reload();
  }, [parentActionRef, setViewDrawerVisible]);

  const onRemove = () => {
    updateParentLocation(parentType, parentPkid, '').then(async (result) => {
      if (result === 'ok') {
        message.success('Successfully Removed!');
        reload();
      } else {
        message.error(result);
      }
    });
  };

  return (
    <Tooltip title="Remove">
      <Button onClick={onRemove}>Remove</Button>
    </Tooltip>
  );
};

export default LocationRemove;
