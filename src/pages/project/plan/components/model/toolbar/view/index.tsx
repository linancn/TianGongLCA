import type { Dispatch, FC } from 'react';
import ViewEdge from './edge';
import type { PlanModelState } from '@/services/plan/data';
import ViewNode from './node';

type Props = {
  projectId: number;
  planId: string;
  drawerVisible: boolean;
  setDrawerVisible: Dispatch<React.SetStateAction<boolean>>;
  planModelState: PlanModelState;
};
const View: FC<Props> = ({
  projectId,
  planId,
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
      return (
        <ViewEdge
          projectId={projectId}
          planId={planId}
          sourceId={planModelState.cellConfig.source.cell}
          targetId={planModelState.cellConfig.target.cell}
          drawerVisible={drawerVisible}
          setDrawerVisible={setDrawerVisible}
        />
      );
    }
  }
  return <></>;
};
export default View;
