import type { Dispatch, FC } from 'react';
import type { PlanModelState } from '@/services/plan/data';
import ViewNode from './node';

type Props = {
  projectId: number;
  modelId: string;
  drawerVisible: boolean;
  setDrawerVisible: Dispatch<React.SetStateAction<boolean>>;
  planModelState: PlanModelState;
};
const View: FC<Props> = ({
  projectId,
  // modelId,
  drawerVisible,
  setDrawerVisible,
  planModelState,
}) => {
  if (drawerVisible && planModelState.isSelected) {
    if (planModelState.cellType === 'node') {
      return (
        <ViewNode
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
        return <></>;
      else return <></>;
    }
  }
  return <></>;
};
export default View;
