import type { FC } from 'react';
import ProjectTable from '../../project/table/table';

type Props = {
  location: {
    query: {
      nl: string;
      r: number;
    };
  };
};
const StarredProjectTableIndex: FC<Props> = (porps) => {
  const { nl, r } = porps.location.query;
  return <ProjectTable nl={nl} r={r} star={true} />;
};

export default StarredProjectTableIndex;
