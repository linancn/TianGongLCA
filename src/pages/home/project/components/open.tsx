import type { FC } from 'react';
import { Button, Tooltip } from 'antd';
import { FolderOpenOutlined } from '@ant-design/icons';

type Props = {
  pkid: number;
};
const ProjectOpen: FC<Props> = ({ pkid }) => {
  return (
    <>
      <Tooltip title="Open">
        <Button
          href={`/project/plan?projectid=${pkid}`}
          // target='_blank'
          shape="circle"
          icon={<FolderOpenOutlined />}
          size="small"
        />
      </Tooltip>
    </>
  );
};

export default ProjectOpen;
