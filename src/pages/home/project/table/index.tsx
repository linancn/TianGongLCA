import type { FC } from 'react';
import ProjectTable from './table';

type Props = {
  location: {
    query: {
      nl: string;
      r: number;
    };
  };
};
const ProjectTableIndex: FC<Props> = (porps) => {
  const { nl, r } = porps.location.query;
  return <ProjectTable nl={nl} r={r} star={null} />;
};

export default ProjectTableIndex;
