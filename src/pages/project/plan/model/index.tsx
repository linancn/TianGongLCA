import type { FC, MouseEvent } from 'react';
import { useState } from 'react';
import type { Elements, Connection, Edge, OnLoadParams, FlowElement } from 'react-flow-renderer';
import ReactFlow, {
  ReactFlowProvider,
  removeElements,
  addEdge,
  MiniMap,
  Controls,
  Background,
  updateEdge,
} from 'react-flow-renderer';

import Tools from './tools';
import Sidebar from './sidebar';
import { getPlan } from '@/services/plan/list';

type PlanModelProps = {
  location: {
    query: {
      projectid: number;
      id: string;
    };
  };
};

let isSetData = false;

const SaveRestore: FC<PlanModelProps> = (props) => {
  const { projectid, id } = props.location.query;
  // const [plan, setPlan] = useState<PlanItem>();
  const [rfInstance, setRfInstance] = useState<OnLoadParams>();
  const onLoad = (reactFlowInstance: OnLoadParams) => setRfInstance(reactFlowInstance);
  const [elements, setElements] = useState<Elements>([]);

  if (!isSetData) {
    getPlan(projectid, id).then((result) => {
      isSetData = true;
      // setPlan(result);
      const childrenJson = JSON.parse(result.childrenJson);
      if (childrenJson !== null) {
        setElements(childrenJson.data);
      }
    });
  }
  // console.log(plan);
  const onConnect = (params: Connection | Edge) =>
    setElements((els) => addEdge({ ...params, animated: true }, els));
  // eslint-disable-next-line no-console
  const onElementClick = (_: MouseEvent, element: FlowElement) => console.log('click', element);
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
        onElementClick={onElementClick}
        onElementsRemove={onElementsRemove}
        onEdgeUpdate={onEdgeUpdate}
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
      <Tools rfInstance={rfInstance} setElements={setElements} project={projectid} plan={id} />
      <Sidebar setElements={setElements} />
    </ReactFlowProvider>
  );
};

export default SaveRestore;
