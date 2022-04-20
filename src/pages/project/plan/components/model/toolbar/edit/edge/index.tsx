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

  const [planSourceId, setPlanSourceId] = useState<string>('');
  const [planTargetId, setPlanTargetId] = useState<string>('');

  const [processSourceId, setProcessSourceId] = useState<string>();
  const [processTargetId, setProcessTargetId] = useState<string>();

  const callbackDrawerVisible = useCallback(() => {
    setDrawerVisible(false);
  }, [setDrawerVisible]);

  useEffect(() => {
    if (sourceValue) {
      const idList = sourceValue.split('_');
      setProcessSourceId(idList[idList.length - 1]);
      if (idList.length >= 2) {
        let planId = idList[1];
        for (let i = 2; i < idList.length - 1; i++) {
          planId = planId + '_' + idList[i];
        }
        setPlanSourceId(planId);
      }
    } else setProcessSourceId(undefined);

    if (targetValue) {
      const idList = targetValue.split('_');
      setProcessTargetId(idList[idList.length - 1]);
      if (idList.length >= 2) {
        let planId = idList[1];
        for (let i = 2; i < idList.length - 1; i++) {
          planId = planId + '_' + idList[i];
        }
        setPlanTargetId(planId);
      }
    } else setProcessTargetId(undefined);
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
        edgeSourceId={sourceId}
        edgeTargetId={targetId}
        planSourceId={planSourceId}
        planTargetId={planTargetId}
        processSourceId={processSourceId}
        processTargetId={processTargetId}
      />
    </Drawer>
  );
};
export default EditEdge;
