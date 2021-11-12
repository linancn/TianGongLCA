import type { FC } from 'react';
import { useState } from 'react';
import type { Elements, Connection, Edge, OnLoadParams } from 'react-flow-renderer';
import { ArrowHeadType } from 'react-flow-renderer';
import ReactFlow, {
  ReactFlowProvider,
  removeElements,
  addEdge,
  // MiniMap,
  Controls,
  Background,
  updateEdge,
} from 'react-flow-renderer';

import Toolbox from './toolbox';
// import Sidebar from './sidebar';
import { getPlanModel } from '@/services/plan/api';

type modelProps = {
  location: {
    query: {
      projectid: number;
      id: string;
    };
  };
};

let isSetData = false;

const SaveRestore: FC<modelProps> = (props) => {
  const { projectid, id } = props.location.query;
  // const [plan, setPlan] = useState<PlanItem>();
  const [rfInstance, setRfInstance] = useState<OnLoadParams>();
  const onLoad = (reactFlowInstance: OnLoadParams) => setRfInstance(reactFlowInstance);
  const [elements, setElements] = useState<Elements>([]);
  const [parentCount, setParentCount] = useState<number>(-1);
  // let reatedat = false;
  if (!isSetData) {
    getPlanModel(projectid, id).then((result) => {
      isSetData = true;
      // setPlan(result);
      setParentCount(result.parentCount);
      const childrenJson = JSON.parse(result.childrenJson);
      if (childrenJson !== null) {
        setElements(childrenJson.data);
      }
    });
  }
  // console.log(plan);
  const onConnect = (params: Connection | Edge) =>
    setElements((els) =>
      addEdge(
        {
          ...params,
          animated: false,
          arrowHeadType: ArrowHeadType.ArrowClosed,
          label: '',
          style: { strokeWidth: '2px' },
        },
        els,
      ),
    );
  // eslint-disable-next-line no-console
  // const onElementClick = (_: MouseEvent, element: FlowElement) => console.log('click', element);
  const onElementsRemove = (elementsToRemove: Elements) =>
    setElements((els) => removeElements(elementsToRemove, els));
  const onEdgeUpdate = (oldEdge: Edge, newConnection: Connection) =>
    setElements((els) => updateEdge(oldEdge, newConnection, els));

  return (
    <ReactFlowProvider>
      <ReactFlow
        onLoad={onLoad}
        elements={elements}
        onConnect={onConnect}
        // onElementClick={onElementClick}
        onElementsRemove={onElementsRemove}
        onEdgeUpdate={onEdgeUpdate}
      >
        {/* <MiniMap /> */}
        <Controls />
        <Background />
      </ReactFlow>
      <Toolbox
        rfInstance={rfInstance}
        setElements={setElements}
        elements={elements}
        project={projectid}
        plan={id}
        parentCount={parentCount}
      />
    </ReactFlowProvider>
  );
};

export default SaveRestore;
