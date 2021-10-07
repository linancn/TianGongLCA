import { Button } from 'antd';
import type { FC } from 'react';
import { useStoreState } from 'react-flow-renderer';

type drillDownProps = {
  project: number;
};
const DrillDown: FC<drillDownProps> = ({ project }) => {
  const selectedElements = useStoreState((store) => store.selectedElements);
  if (selectedElements) {
    return (
      <Button
        key="DrillDown"
        href={`/project/plan/model?projectid=${project}&id=${selectedElements[0].id}`}
        block
      >
        Drill Down
      </Button>
    );
  }
  return (
    <Button key="DrillDown" href={''} block disabled={true}>
      Drill Down
    </Button>
  );
};
export default DrillDown;
