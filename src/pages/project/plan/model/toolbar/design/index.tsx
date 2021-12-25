import type { Dispatch, FC } from 'react';
import DesignNode from './node';
import EditEdge from './edge';
import type { PlanModelState } from '@/services/plan/data';

type Props = {
  projectId: number;
  planId: string;
  drawerVisible: boolean;
  setDrawerVisible: Dispatch<React.SetStateAction<boolean>>;
  planModelState: PlanModelState;
};

let preid = '';

const Design: FC<Props> = ({
  projectId,
  planId,
  drawerVisible,
  setDrawerVisible,
  planModelState,
}) => {
  if (drawerVisible) {
    if (planModelState.isSelected) {
      if (planModelState.cellType === 'node') {
        if (preid !== planModelState.cellID) {
          preid = planModelState.cellID;
        }
        return (
          <DesignNode
            label={planModelState.cellConfig.label}
            drawerVisible={drawerVisible}
            setDrawerVisible={setDrawerVisible}
            config={planModelState.cellConfig}
          />
        );
      }
      if (planModelState.cellType === 'edge') {
        if (preid !== planModelState.cellID) {
          preid = planModelState.cellID;
        }
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
  }
  preid = '';
  return <></>;
};
export default Design;
