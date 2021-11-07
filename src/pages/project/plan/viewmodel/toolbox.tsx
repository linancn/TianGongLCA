import type { Dispatch, FC } from 'react';
import React from 'react';
import type { OnLoadParams, Elements } from 'react-flow-renderer';
import { useStoreState } from 'react-flow-renderer';
import localforage from 'localforage';
import styles from './index.less';
import { Divider, Drawer } from 'antd';
import View from './toolbox/view';
import Reload from './toolbox/reload';
import DrillDown from './toolbox/drilldown';
import RollUp from './toolbox/rollup';

localforage.config({
  name: 'react-flow',
  storeName: 'flows',
});

type toolboxProps = {
  rfInstance?: OnLoadParams;
  setElements: Dispatch<React.SetStateAction<Elements<any>>>;
  elements: Elements<any>;
  project: number;
  plan: string;
  parentCount: number;
};

const Toolbox: FC<toolboxProps> = ({ project, plan, parentCount }) => {
  const selectedElements = useStoreState((store) => store.selectedElements);

  return (
    <>
      <Drawer visible={true} closable={false} mask={false} width="150px">
        <div className={styles.tools}>
          <RollUp project={project} plan={plan} parentCount={parentCount} />
          <DrillDown project={project} selectedElements={selectedElements} />
          <Divider />
          <View project={project} selectedElements={selectedElements} />
          <Reload />
        </div>
      </Drawer>
    </>
  );
};

export default Toolbox;
