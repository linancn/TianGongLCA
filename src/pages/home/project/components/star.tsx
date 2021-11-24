import type { FC } from 'react';
import { useCallback } from 'react';
import { Button, message, Modal, Tooltip } from 'antd';
import { ExclamationCircleOutlined, StarFilled, StarOutlined } from '@ant-design/icons';
import type { ActionType } from '@ant-design/pro-table';
import { starProject } from '@/services/project/api';

type Props = {
  pkid: number;
  star: any;
  actionRef: React.MutableRefObject<ActionType | undefined>;
};
const ProjectStar: FC<Props> = ({ pkid, star, actionRef }) => {
  const onStar = useCallback(() => {
    Modal.confirm({
      title: `Are you sure to ${star === true ? 'remove star' : 'add star'} this project?`,
      icon: <ExclamationCircleOutlined />,
      content: '',
      onOk() {
        starProject(pkid).then(async (result) => {
          if (result === 'ok') {
            message.success(`Successfully ${star === true ? 'remove star' : 'add star'}!`);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          } else {
            message.error(result);
          }
        });
      },
      onCancel() {},
    });
  }, [actionRef, star, pkid]);
  return (
    <>
      <Tooltip title={star === true ? 'Starred' : 'No star'}>
        <Button
          shape="circle"
          icon={star === true ? <StarFilled /> : <StarOutlined />}
          size="small"
          onClick={onStar}
        />
      </Tooltip>
    </>
  );
};

export default ProjectStar;
