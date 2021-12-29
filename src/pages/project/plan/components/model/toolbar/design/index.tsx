import type { Dispatch, FC } from 'react';
import DesignNode from './node';
import DesignEdge from './edge';
import type { PlanModelState } from '@/services/plan/data';

type Props = {
  projectId: number;
  planId: string;
  drawerVisible: boolean;
  setDrawerVisible: Dispatch<React.SetStateAction<boolean>>;
  planModelState: PlanModelState;
};

const Design: FC<Props> = ({ drawerVisible, setDrawerVisible, planModelState }) => {
  if (drawerVisible) {
    if (planModelState.isSelected) {
      if (planModelState.cellType === 'node') {
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
        return (
          <DesignEdge
            label={planModelState.cellConfig.label}
            drawerVisible={drawerVisible}
            setDrawerVisible={setDrawerVisible}
            config={planModelState.cellConfig}
          />
        );
      }
    }
  }
  return <></>;
};
export default Design;
