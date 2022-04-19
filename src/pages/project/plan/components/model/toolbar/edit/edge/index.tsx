import { Button, Drawer } from 'antd';
import type { Dispatch, FC } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useCallback } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import ProCard from '@ant-design/pro-card';
import EditEdgeFlow from './flow';
import EditEdgeProcess from './process/index';

type Props = {
  projectId: number;
  modelId: string;
  sourceId: string;
  sourceType: string;
  targetId: string;
  targetType: string;
  drawerVisible: boolean;
  setDrawerVisible: Dispatch<React.SetStateAction<boolean>>;
};

const EditEdge: FC<Props> = ({
  projectId,
  modelId,
  sourceId,
  sourceType,
  targetId,
  targetType,
  drawerVisible,
  setDrawerVisible,
}) => {
  const [sourceValue, setSourceValue] = useState<string>();
  const [targetValue, setTargetValue] = useState<string>();

  const [sourceProcessId, setSourceProcessId] = useState<string>();
  const [targetProcessId, setTargetProcessId] = useState<string>();

  const callbackDrawerVisible = useCallback(() => {
    setDrawerVisible(false);
  }, [setDrawerVisible]);

  useEffect(() => {
    if (sourceValue) {
      const sourceIdList = sourceValue.split('_');
      setSourceProcessId(sourceIdList[sourceIdList.length - 1]);
    } else setSourceProcessId(undefined);

    if (targetValue) {
      const targetIdList = targetValue.split('_');
      setTargetProcessId(targetIdList[targetIdList.length - 1]);
    } else setTargetProcessId(undefined);
  }, [sourceValue, targetValue]);

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
          <EditEdgeProcess
            projectId={projectId}
            dataId={sourceId}
            dataType={sourceType}
            selectValue={sourceValue}
            setSelectValue={setSourceValue}
          />
        </ProCard>
        <ProCard colSpan={12} title="Target Process" layout="center" bordered>
          <EditEdgeProcess
            projectId={projectId}
            dataId={targetId}
            dataType={targetType}
            selectValue={targetValue}
            setSelectValue={setTargetValue}
          />
        </ProCard>
      </ProCard>
      <EditEdgeFlow
        projectId={projectId}
        modelId={modelId}
        sourceId={sourceProcessId}
        targetId={targetProcessId}
      />
    </Drawer>
  );
};
export default EditEdge;
