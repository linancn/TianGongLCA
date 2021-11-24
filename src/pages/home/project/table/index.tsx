import type { FC } from 'react';
import { useRef } from 'react';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { getProjectList } from '@/services/project/api';
import type { Project } from '@/services/project/data';
import { PageContainer } from '@ant-design/pro-layout';
import type { ListPagination } from '@/services/home/data';
import ProjectCreate from '../components/create';
import ProjectDelete from '../components/delete';
import ProjectEdit from '../components/edit';
import ProjectView from '../components/view';
import ProjectStar from '../components/star';
/**
 * 更新节点
 *
 * @param fields
 */

type ProjectListProps = {
  location: {
    query: {
      searchValue: string;
    };
  };
};
let oldSearchValue = '';
const TableList: FC<ProjectListProps> = (props) => {
  const actionRef = useRef<ActionType>();
  const { searchValue } = props.location.query;
  const columns: ProColumns<Project>[] = [
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: true,
    },
    {
      title: 'Created At',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      sorter: true,
    },
    {
      title: 'Last Update',
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
    {
      title: 'Star',
      render: (_, record: Project) => [
        <ProjectStar pkid={record.id} star={record.star} actionRef={actionRef} />,
      ],
    },
    {
      title: 'Option',
      valueType: 'option',
      render: (_, record: Project) => [
        <ProjectView pkid={record.id} />,
        <ProjectEdit pkid={record.id} actionRef={actionRef} />,
        <ProjectDelete pkid={record.id} actionRef={actionRef} />,
      ],
    },
  ];
  if (oldSearchValue !== searchValue) {
    oldSearchValue = searchValue;
    actionRef.current?.reload();
  }
  return (
    <PageContainer>
      <ProTable<Project, ListPagination>
        actionRef={actionRef}
        search={{
          defaultCollapsed: false,
        }}
        toolBarRender={() => [<ProjectCreate actionRef={actionRef} />]}
        request={(
          params: {
            pageSize: number;
            current: number;
          },
          sort,
        ) => {
          return getProjectList(params, sort, searchValue);
        }}
        columns={columns}
      />
    </PageContainer>
  );
};

export default TableList;
