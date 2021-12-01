import type { Dispatch, FC } from 'react';
import React, { useCallback } from 'react';
import type { OnLoadParams, Elements } from 'react-flow-renderer';
import { useStoreState } from 'react-flow-renderer';
import localforage from 'localforage';
import styles from '@/style/custom.less';
import { Button, Divider, Drawer, message } from 'antd';
import { updatePlanChinlrenJson } from '@/services/plan/api';
import Add from './add';
import View from './view';
import Reload from './reload';
import Remove from './remove';
import Edit from './edit';
import DrillDown from './drilldown';
import Design from './design';
import RollUp from './rollup';

localforage.config({
  name: 'react-flow',
  storeName: 'flows',
});

const flowKey = 'flow';

type toolboxProps = {
  rfInstance?: OnLoadParams;
  setElements: Dispatch<React.SetStateAction<Elements<any>>>;
  elements: Elements<any>;
  projectId: number;
  id: string;
  parentCount: number;
};

const Toolbox: FC<toolboxProps> = ({
  rfInstance,
  setElements,
  elements,
  projectId,
  id,
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
        projectId,
        id,
        childrenJson: `{"data": ${JSON.stringify(flow.elements)}}`,
      };
      updatePlanChinlrenJson(updatePlan).then(() => {
        message.success('Save successfully!');
      });
    }
  }, [id, projectId, rfInstance]);

  // const onCopy = useCallback(() => {
  //   if (selectedElements != null) {
  //     // setCopyElements(selectedElements);
  //   }
  // }, [selectedElements]);

  return (
    <>
      <Drawer
        visible={true}
        closable={false}
        mask={false}
        getContainer={false}
        push={false}
        style={{ position: 'absolute' }}
        width="150px"
      >
        <div className={styles.tools}>
          <RollUp projectId={projectId} planId={id} parentCount={parentCount} />
          <DrillDown projectId={projectId} selectedElements={selectedElements} />
          <Divider />
          <View projectId={projectId} selectedElements={selectedElements} />
          <Edit projectId={projectId} planId={id} selectedElements={selectedElements} />
          <Design
            setElements={setElements}
            elements={elements}
            selectedElements={selectedElements}
          />
          <Divider />
          <Add setElements={setElements} projectId={projectId} />
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
