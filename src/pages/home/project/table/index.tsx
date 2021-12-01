import type { FC } from 'react';
import { useRef } from 'react';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { getProjectList } from '@/services/project/api';
import type { Project } from '@/services/project/data';
import type { ListPagination } from '@/services/home/data';
import ProjectDelete from '../components/delete';
import ProjectEdit from '../components/edit';
import ProjectView from '../components/view';
import ProjectStar from '../components/star';
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
const TableList: FC<ProjectListProps> = (porps) => {
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
  const columns: ProColumns<Project>[] = [
    {
      title: 'ID',
      dataIndex: 'index',
      valueType: 'index',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: true,
    },
    {
      title: 'Type',
      dataIndex: 'type',
      sorter: true,
    },
    {
      title: 'Nation',
      dataIndex: 'nation',
      sorter: true,
    },
    {
      title: 'Comment',
      dataIndex: 'comment',
      valueType: 'textarea',
    },
    {
      title: 'Creator',
      dataIndex: 'creator',
      sorter: true,
    },
    {
      title: 'Create Time',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      sorter: true,
    },
    {
      title: 'Last Update Time',
      dataIndex: 'lastUpdateTime',
      valueType: 'dateTime',
      sorter: true,
    },
    {
      title: 'Comment',
      dataIndex: 'comment',
      valueType: 'textarea',
    },
    // {
    //   title: 'Star',
    //   dataIndex: 'star',
    //   sorter: false,
    // },
    // {
    //   title: 'Star',
    //   render: (_, record: Project) => [
    //     <ProjectStar pkid={record.id} star={record.star} actionRef={actionRef} />,
    //   ],
    // },
    {
      title: 'Option',
      valueType: 'option',
      render: (_, record: Project) => [
        <ProjectStar pkid={record.id} star={record.star} actionRef={actionRef} />,
        <ProjectOpen pkid={record.id} />,
        <ProjectView pkid={record.id} />,
        <ProjectEdit pkid={record.id} actionRef={actionRef} />,
        <ProjectDelete pkid={record.id} actionRef={actionRef} />,
      ],
    },
  ];

  return (
    <ProTable<Project, ListPagination>
      actionRef={actionRef}
      search={false}
      // toolBarRender={() => [<ProjectCreate actionRef={actionRef} />]}
      request={(
        params: {
          pageSize: number;
          current: number;
        },
        sort,
      ) => {
        return getProjectList(params, sort, nl);
      }}
      columns={columns}
    />
  );
};

export default TableList;
