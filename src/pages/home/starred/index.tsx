import type { FC } from 'react';
import Project from '../project/project';

type Props = {
  match: {
    url: string;
    path: string;
  };
  location: {
    pathname: string;
  };
};

const StarredProjectIndex: FC<Props> = (props) => {
  return (
    <Project
      url={props.match.url}
      path={props.match.path}
      pathName={props.location.pathname}
      pChinlren={props.children}
      star={'true'}
    />
  );
};

export default StarredProjectIndex;
