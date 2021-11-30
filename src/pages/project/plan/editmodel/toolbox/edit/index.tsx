import { Button } from 'antd';
import type { FC } from 'react';
import type { Elements } from 'react-flow-renderer';
import { isNode, isEdge } from 'react-flow-renderer';
import EditNode from './node';
import EditEdge from './edge';

type EditProps = {
  projectId: number;
  planId: string;
  selectedElements: Elements<any> | null;
};

let preid = '';

const Edit: FC<EditProps> = ({ projectId, planId, selectedElements }) => {
  if (selectedElements) {
    const selectedElement = selectedElements[0];
    if (isNode(selectedElement)) {
      if (preid !== selectedElement.id) {
        preid = selectedElement.id;
      }
      return (
        <EditNode
          projectId={projectId}
          id={selectedElement.id}
          typeName={selectedElement.data?.type}
          label={selectedElement.data?.label}
        />
      );
    }
    if (isEdge(selectedElement)) {
      if (preid !== selectedElement.id) {
        preid = selectedElement.id;
      }
      return (
        <EditEdge
          projectId={projectId}
          planId={planId}
          sourceId={selectedElement.source}
          targetId={selectedElement.target}
        />
      );
    }
  }
  preid = '';
  return (
    <Button key="Edit" block disabled={true}>
      Edit
    </Button>
  );
};
export default Edit;
