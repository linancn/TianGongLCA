import type { MouseEvent } from 'react';
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

import Tools from './Tools';
import Sidebar from './Sidebar';

const initialElements: Elements = [
  { id: '1', data: { label: 'Node 1' }, position: { x: 100, y: 100 } },
  { id: '2', data: { label: 'Node 2' }, position: { x: 100, y: 200 } },
  { id: 'e1-2', source: '1', target: '2' },
];

const SaveRestore = () => {
  const [rfInstance, setRfInstance] = useState<OnLoadParams>();
  const onLoad = (reactFlowInstance: OnLoadParams) => setRfInstance(reactFlowInstance);
  const [elements, setElements] = useState<Elements>(initialElements);
  const onConnect = (params: Connection | Edge) => setElements((els) => addEdge(params, els));
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
      <Tools rfInstance={rfInstance} setElements={setElements} />
      <Sidebar setElements={setElements} />
    </ReactFlowProvider>
  );
};

export default SaveRestore;
