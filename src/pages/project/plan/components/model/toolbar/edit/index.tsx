import type { Dispatch, FC } from 'react';
import EditNode from './node';
import type { PlanModelState } from '@/services/plan/data';
import EditEdge from './edge';
import EdgeProcess from './edge/process';

type Props = {
  projectId: number;
  modelId: string;
  drawerVisible: boolean;
  setDrawerVisible: Dispatch<React.SetStateAction<boolean>>;
  planModelState: PlanModelState;
};
const Edit: FC<Props> = ({
  projectId,
  modelId,
  drawerVisible,
  setDrawerVisible,
  planModelState,
}) => {
  if (drawerVisible && planModelState.isSelected) {
    if (planModelState.cellType === 'node') {
      return (
        <EditNode
          projectId={projectId}
          planModelState={planModelState}
          drawerVisible={drawerVisible}
          setDrawerVisible={setDrawerVisible}
        />
      );
    }
    if (planModelState.cellType === 'edge') {
      if (
        planModelState.cellConfig.info.sourceType === 'process' &&
        planModelState.cellConfig.info.targetType === 'process'
      )
        return (
          <EdgeProcess
            projectId={projectId}
            modelId={modelId}
            sourceId={planModelState.cellConfig.source}
            targetId={planModelState.cellConfig.target}
            drawerVisible={drawerVisible}
            setDrawerVisible={setDrawerVisible}
          />
        );
      else
        return (
          <EditEdge
            projectId={projectId}
            modelId={modelId}
            sourceId={planModelState.cellConfig.source}
            sourceType={planModelState.cellConfig.info.sourceType}
            targetId={planModelState.cellConfig.target}
            targetType={planModelState.cellConfig.info.targetType}
            drawerVisible={drawerVisible}
            setDrawerVisible={setDrawerVisible}
          />
        );
    }
  }
  return <></>;
};
export default Edit;
