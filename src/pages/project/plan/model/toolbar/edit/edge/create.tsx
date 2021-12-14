import { Button, message, Tooltip } from 'antd';
import type { FC } from 'react';
import { useCallback } from 'react';
import type { ActionType } from '@ant-design/pro-table';
import { PlusOutlined } from '@ant-design/icons';
import { createEdgeProcess } from '@/services/edgeprocess/api';

type Props = {
  projectId: number;
  planId: string;
  sourceId: string;
  targetId: string;
  actionRef: React.MutableRefObject<ActionType | undefined>;
};

const EdgeProcessCreate: FC<Props> = ({ projectId, planId, sourceId, targetId, actionRef }) => {
  const reload = useCallback(() => {
    actionRef.current?.reload();
  }, [actionRef]);

  return (
    <Tooltip title="Create">
      <Button
        size={'middle'}
        type="text"
        icon={<PlusOutlined />}
        onClick={() => {
          createEdgeProcess({
            projectId,
            planId,
            sourceProcessId: sourceId,
            targetProcessId: targetId,
          }).then(async (result) => {
            if (result === 'ok') {
              message.success('Successfully Created!');
              reload();
            } else {
              message.error(result);
            }
          });
        }}
      />
    </Tooltip>
  );
};
export default EdgeProcessCreate;
