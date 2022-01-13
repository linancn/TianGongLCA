import type { FC } from 'react';
import ProjectCard from '../../project/card/card';

type Props = {
  location: {
    query: {
      nl: string;
      r: number;
    };
  };
};
const StarredProjectCardIndex: FC<Props> = (porps) => {
  const { nl, r } = porps.location.query;
  return <ProjectCard nl={nl} r={r} star={true} />;
};

export default StarredProjectCardIndex;
