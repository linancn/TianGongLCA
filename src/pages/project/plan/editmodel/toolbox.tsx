import type { Dispatch, FC } from 'react';
import React, { useCallback } from 'react';
import type { OnLoadParams, Elements } from 'react-flow-renderer';
import {
  // useZoomPanHelper,
  useStoreState,
  // removeElements,
  // isNode,
  // isEdge,
  // useStoreActions,
} from 'react-flow-renderer';
import localforage from 'localforage';
import styles from './index.less';
import { Button, Divider, Drawer, message } from 'antd';
import { updatePlanChinlrenJson } from '@/services/plan/api';
import Add from './toolbox/add';
import View from './toolbox/view';
import Reload from './toolbox/reload';
import Remove from './toolbox/remove';
import Edit from './toolbox/edit';
import DrillDown from './toolbox/drilldown';
import Design from './toolbox/design';
import RollUp from './toolbox/rollup';

localforage.config({
  name: 'react-flow',
  storeName: 'flows',
});

const flowKey = 'flow';

// const getTimeId = () => new Date().getTime() - 1577836800000;

// const waitTime = (time: number = 100) => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(true);
//     }, time);
//   });
// };

type toolboxProps = {
  rfInstance?: OnLoadParams;
  setElements: Dispatch<React.SetStateAction<Elements<any>>>;
  elements: Elements<any>;
  project: number;
  plan: string;
  parentCount: number;
};

const Toolbox: FC<toolboxProps> = ({
  rfInstance,
  setElements,
  elements,
  project,
  plan,
  parentCount,
}) => {
  // const { transform } = useZoomPanHelper();
  const selectedElements = useStoreState((store) => store.selectedElements);
  // const setSelectedElements = useStoreActions((actions) => actions.setSelectedElements);
  // const [copyElements, setCopyElements] = useState<Elements>();

  const onSave = useCallback(() => {
    if (rfInstance) {
      const flow = rfInstance.toObject();
      localforage.setItem(flowKey, flow);
      const updatePlan = {
        projectId: project,
        id: plan,
        childrenJson: `{"data": ${JSON.stringify(flow.elements)}}`,
      };
      updatePlanChinlrenJson(updatePlan).then(() => {
        message.success('Save successfully!');
      });
    }
  }, [plan, project, rfInstance]);

  // const onCopy = useCallback(() => {
  //   if (selectedElements != null) {
  //     // setCopyElements(selectedElements);
  //   }
  // }, [selectedElements]);

  return (
    <>
      <Drawer visible={true} closable={false} mask={false} width="150px">
        <div className={styles.tools}>
          <RollUp project={project} plan={plan} parentCount={parentCount} />
          <DrillDown project={project} selectedElements={selectedElements} />
          <Divider />
          {/* <Button key="toolRestore" onClick={onToolRestore} block>Restore</Button> */}
          <View project={project} selectedElements={selectedElements} />
          <Edit project={project} plan={plan} selectedElements={selectedElements} />
          <Design
            setElements={setElements}
            elements={elements}
            selectedElements={selectedElements}
          />
          <Divider />
          <Add setElements={setElements} project={project} />
          {/* <Button key="Copy" onClick={onCopy} block>
            Copy
          </Button> */}
          <Remove setElements={setElements} selectedElements={selectedElements} />
          <Divider />
          <Reload />
          <Divider />
          <Button key="Save" onClick={onSave} block>
            Save
          </Button>
          {/* <Button key="toolPaste" onClick={onToolPaste} block>Paste</Button> */}
        </div>
      </Drawer>
    </>
  );
};

export default Toolbox;
