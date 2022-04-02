import { Button, message, Tooltip } from 'antd';
import type { ActionType } from '@ant-design/pro-table';
import type { FC } from 'react';
import { useCallback } from 'react';
import { updateParentUnitGroup } from '@/services/unitgroup/api';
import { FormattedMessage } from 'umi';

type Props = {
  projectId: number;
  parentPkid: number;
  parentType: string;
  parentActionRef: React.MutableRefObject<ActionType | undefined>;
  setViewDrawerVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const UnitGroupDeleteByParent: FC<Props> = ({
  parentPkid,
  parentType,
  parentActionRef,
  setViewDrawerVisible,
}) => {
  const reload = useCallback(() => {
    setViewDrawerVisible(false);
    parentActionRef.current?.reload();
  }, [parentActionRef, setViewDrawerVisible]);

  const onDelete = () => {
    updateParentUnitGroup(parentType, parentPkid, '').then(async (result) => {
      if (result === 'ok') {
        message.success(
          <FormattedMessage
            id="unitgroup.deletesuccess"
            defaultMessage="Selected unitgroup has been deleted."
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

export default UnitGroupDeleteByParent;
