import { Button } from 'antd';
import type { FC } from 'react';
import type { Elements } from 'react-flow-renderer';

type drillDownProps = {
  project: number;
  selectedElements: Elements<any> | null;
};
const DrillDown: FC<drillDownProps> = ({ project, selectedElements }) => {
  if (!selectedElements || selectedElements[0].data.type === 'process') {
    return (
      <Button key="DrillDown" href={''} block disabled={true}>
        Drill Down
      </Button>
    );
  }

  return (
    <Button
      key="DrillDown"
      href={`/project/plan/model?projectid=${project}&id=${selectedElements[0].id}`}
      block
    >
      Drill Down
    </Button>
  );
};
export default DrillDown;
