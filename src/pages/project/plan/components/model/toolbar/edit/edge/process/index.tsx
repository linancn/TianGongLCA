import { Button, Drawer, Input } from 'antd';
import type { Dispatch, FC } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useCallback } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import ProCard from '@ant-design/pro-card';
import EditEdgeFlow from '../flow';
import { getProcessById } from '@/services/process/api';

type Props = {
  projectId: number;
  modelId: string;
  sourceId: string;
  targetId: string;
  drawerVisible: boolean;
  setDrawerVisible: Dispatch<React.SetStateAction<boolean>>;
};

const EdgeProcess: FC<Props> = ({
  projectId,
  modelId,
  sourceId,
  targetId,
  drawerVisible,
  setDrawerVisible,
}) => {
  const [sourceData, setSourceData] = useState<any>(undefined);
  const [targetData, setTargetData] = useState<any>(undefined);
  const callbackDrawerVisible = useCallback(() => {
    setDrawerVisible(false);
  }, [setDrawerVisible]);

  useEffect(() => {
    getProcessById(projectId, sourceId).then((result) => {
      setSourceData(result);
    });
    getProcessById(projectId, targetId).then((result) => {
      setTargetData(result);
    });
  }, [projectId, sourceId, targetId]);

  return (
    <Drawer
      visible={drawerVisible}
      maskClosable={false}
      title="Edit"
      width="100%"
      closable={false}
      extra={
        <Button icon={<CloseOutlined />} style={{ border: 0 }} onClick={callbackDrawerVisible} />
      }
      onClose={callbackDrawerVisible}
    >
      <ProCard ghost gutter={[0, 8]} aria-disabled={false}>
        <ProCard colSpan={12} title="Source Process" layout="center" bordered>
          <Input value={sourceData ? sourceData.dataName : ''} disabled={true} />
        </ProCard>
        <ProCard colSpan={12} title="Target Process" layout="center" bordered>
          <Input value={targetData ? targetData.dataName : ''} disabled={true} />
        </ProCard>
      </ProCard>
      <EditEdgeFlow
        projectId={projectId}
        modelId={modelId}
        edgeSourceId={sourceId}
        edgeTargetId={targetId}
        planSourceId={''}
        planTargetId={''}
        processSourceId={sourceId}
        processTargetId={targetId}
      />
    </Drawer>
  );
};
export default EdgeProcess;
