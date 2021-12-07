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

type ProjectListProps = {
  location: {
    query: {
      nl: string;
      r: number;
    };
  };
};
let nameLike = '';
let reload = 0;
const ListSearchApplications: FC<ProjectListProps> = (porps) => {
  const actionRef = useRef<ActionType>();
  const { nl, r } = porps.location.query;
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
        return getProjectList(params, { lastUpdateTime: 'descend' }, nl);
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
                Created: {moment(row.createTime).format('YYYY-MM-DD HH:mm:ss')}
                <br />
                Updated: {moment(row.lastUpdateTime).format('YYYY-MM-DD HH:mm:ss')}
                <br />
                Comment: {row.comment}
              </>
            );
          },
        },
      }}
    />
  );
};

export default ListSearchApplications;
