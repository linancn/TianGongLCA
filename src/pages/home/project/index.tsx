import type { FC } from 'react';
import Project from './project';

type Props = {
  match: {
    url: string;
    path: string;
  };
  location: {
    pathname: string;
  };
};

const ProjectIndex: FC<Props> = (props) => {
  return (
    <Project
      url={props.match.url}
      path={props.match.path}
      pathName={props.location.pathname}
      pChinlren={props.children}
      star={'false'}
    />
  );
};

export default ProjectIndex;
