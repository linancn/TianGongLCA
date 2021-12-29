import type { Dispatch, FC } from 'react';
import EditNode from './node';
import EditEdge from './edge';
import type { PlanModelState } from '@/services/plan/data';

type Props = {
  projectId: number;
  planId: string;
  drawerVisible: boolean;
  setDrawerVisible: Dispatch<React.SetStateAction<boolean>>;
  planModelState: PlanModelState;
};
const Edit: FC<Props> = ({
  projectId,
  planId,
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
      return (
        <EditEdge
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
export default Edit;
