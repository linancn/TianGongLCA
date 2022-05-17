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
import { FormattedMessage } from 'umi';

type Props = {
  nl: string;
  r: number;
  star: boolean | null;
};
let nameLike = '';
let reload = 0;
const ProjectTable: FC<Props> = ({ nl, r, star }) => {
  const actionRef = useRef<ActionType>();
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
      title: <FormattedMessage id="project.index" />,
      dataIndex: 'index',
      valueType: 'index',
    },
    {
      title: <FormattedMessage id="project.name" />,
      dataIndex: 'name',
      sorter: true,
    },
    {
      title: <FormattedMessage id="project.projectType" />,
      dataIndex: 'projectType',
      sorter: true,
    },
    {
      title: <FormattedMessage id="project.nation" />,
      dataIndex: 'nation',
      sorter: true,
    },
    {
      title: <FormattedMessage id="project.description" />,
      dataIndex: 'description',
      valueType: 'textarea',
    },
    {
      title: <FormattedMessage id="project.creator" />,
      dataIndex: 'creator',
      sorter: true,
    },
    {
      title: <FormattedMessage id="project.createTime" />,
      dataIndex: 'createTime',
      valueType: 'dateTime',
      sorter: true,
    },
    {
      title: <FormattedMessage id="project.lastChange" />,
      dataIndex: 'lastChange',
      valueType: 'dateTime',
      sorter: true,
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
      title: <FormattedMessage id="project.option" />,
      valueType: 'option',
      render: (_, record: Project) => [
        <ProjectStar key={0} pkid={record.id} star={record.star} actionRef={actionRef} />,
        <ProjectOpen key={1} pkid={record.id} />,
        <ProjectView key={2} pkid={record.id} />,
        <ProjectEdit key={3} pkid={record.id} actionRef={actionRef} />,
        <ProjectDelete key={4} pkid={record.id} actionRef={actionRef} />,
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
        return getProjectList(params, sort, nl, star);
      }}
      columns={columns}
    />
  );
};

export default ProjectTable;
