import type { FC } from 'react';
import { useRef } from 'react';
import { getProjectList } from '@/services/project/api';
import type { Project } from '@/services/project/data';
import ProList from '@ant-design/pro-list';
import type { ActionType } from '@ant-design/pro-table';
import moment from 'moment';
import ProjectStar from '../components/star';
import ProjectDelete from '../components/delete';
import ProjectOpen from '../components/open';
import { BookOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { FormattedMessage } from 'umi';

type Props = {
  nl: string;
  r: number;
  star: boolean | null;
};
let nameLike = '';
let reload = 0;
const ProjectCard: FC<Props> = ({ nl, r, star }) => {
  const actionRef = useRef<ActionType>();
  if (nameLike !== nl) {
    nameLike = nl;
    actionRef.current?.reload();
  }
  if (reload < r) {
    reload = r;
    actionRef.current?.reload();
  }
  return (
    <ProList<Project>
      actionRef={actionRef}
      request={(params) => {
        return getProjectList(params, { lastUpdateTime: 'descend' }, nl, star);
      }}
      grid={{
        gutter: 16,
        xs: 1,
        sm: 2,
        md: 3,
        lg: 3,
        xl: 4,
        xxl: 4,
      }}
      metas={{
        avatar: {
          render: () => {
            return <Button shape="circle" icon={<BookOutlined />} size="small" />;
          },
        },
        subTitle: {
          dataIndex: 'name',
        },
        actions: {
          render: (_, row) => {
            return [
              <ProjectStar pkid={row.id} star={row.star} actionRef={actionRef} />,
              <ProjectOpen pkid={row.id} />,
              <ProjectDelete pkid={row.id} actionRef={actionRef} />,
            ];
          },
        },
        content: {
          render: (_, row) => {
            return (
              <>
                <FormattedMessage id="project.createTime" />:{' '}
                {moment(row.createTime).format('YYYY-MM-DD HH:mm:ss')}
                <br />
                <FormattedMessage id="project.lastUpdateTime" />:{' '}
                {moment(row.lastUpdateTime).format('YYYY-MM-DD HH:mm:ss')}
                <br />
                <FormattedMessage id="project.comment" />: {row.comment}
              </>
            );
          },
        },
      }}
    />
  );
};

export default ProjectCard;
