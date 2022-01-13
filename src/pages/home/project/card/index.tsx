import type { FC } from 'react';
import ProjectCard from './card';

type Props = {
  location: {
    query: {
      nl: string;
      r: number;
    };
  };
};
const ProjectCardIndex: FC<Props> = (porps) => {
  const { nl, r } = porps.location.query;
  return <ProjectCard nl={nl} r={r} star={null} />;
};

export default ProjectCardIndex;
