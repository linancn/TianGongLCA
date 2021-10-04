import type { Dispatch, FC } from 'react';
import React, { useCallback } from 'react';
import type { OnLoadParams, Elements } from 'react-flow-renderer';
import {
  // useZoomPanHelper,
  useStoreState,
  removeElements,
  // isNode,
  // isEdge,
  // useStoreActions,
} from 'react-flow-renderer';
import localforage from 'localforage';
import styles from './index.less';
import { Button, Divider, Drawer, message } from 'antd';
import { updatePlanChinlrenJson } from '@/services/plan/list';
import Add from './toolbox/add';
import View from './toolbox/view';

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
  project: number;
  plan: string;
};

const Toolbox: FC<toolboxProps> = ({ rfInstance, setElements, project, plan }) => {
  // const { transform } = useZoomPanHelper();
  const selectedElements = useStoreState((store) => store.selectedElements);
  // const setSelectedElements = useStoreActions((actions) => actions.setSelectedElements);
  // const [copyElements, setCopyElements] = useState<Elements>();

  const onToolSave = useCallback(() => {
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

  const onToolCopy = useCallback(() => {
    if (selectedElements != null) {
      // setCopyElements(selectedElements);
    }
  }, [selectedElements]);

  const onToolDelete = useCallback(() => {
    if (selectedElements != null) {
      setElements((els) => removeElements(selectedElements, els));
    }
  }, [setElements, selectedElements]);

  return (
    <>
      <Drawer visible={true} closable={false} mask={false} width="150px">
        <div className={styles.tools}>
          {/* <Button key="toolRestore" onClick={onToolRestore} block>Restore</Button> */}
          <View project={project} />
          <Button key="toolEdit" block>
            Edit
          </Button>
          <Divider />
          <Add setElements={setElements} project={project} />
          <Button key="toolCopy" onClick={onToolCopy} block>
            Copy
          </Button>
          <Button key="toolDelete" onClick={onToolDelete} block>
            Delete
          </Button>
          <Divider />
          <Button key="toolReset" block>
            Reset
          </Button>
          <Divider />
          <Button key="toolSave" onClick={onToolSave} block>
            Save
          </Button>
          {/* <Button key="toolPaste" onClick={onToolPaste} block>Paste</Button> */}
        </div>
      </Drawer>
    </>
  );
};

export default Toolbox;
