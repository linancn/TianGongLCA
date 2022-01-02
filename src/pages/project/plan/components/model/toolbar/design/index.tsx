import type { Dispatch, FC } from 'react';
import DesignNode from './node';
import DesignEdge from './edge';
import type { PlanModelState } from '@/services/plan/data';
import { IApplication } from '@antv/xflow';

type Props = {
  xflowApp: IApplication | undefined;
  projectId: number;
  drawerVisible: boolean;
  setDrawerVisible: Dispatch<React.SetStateAction<boolean>>;
  planModelState: PlanModelState;
};

const Design: FC<Props> = ({ xflowApp, drawerVisible, setDrawerVisible, planModelState }) => {
  if (drawerVisible) {
    if (planModelState.isSelected) {
      if (planModelState.cellType === 'node') {
        return (
          <DesignNode
            xflowApp={xflowApp}
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
            xflowApp={xflowApp}
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
