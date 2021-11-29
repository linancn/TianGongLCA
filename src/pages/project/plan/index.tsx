import type { FC } from 'react';
import { useRef } from 'react';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { getPlanInfoGrid } from '@/services/plan/api';
import type { PlanInfo } from '@/services/plan/data';
import { PageContainer } from '@ant-design/pro-layout';
import { Space } from 'antd';
import type { ListPagination } from '@/services/home/data';
import PlanDelete from './components/delete';
import PlanView from './components/view';
import PlanEdit from './components/edit';
import PlanOpen from './components/open';
import PlanCreate from './components/create';

type ListProps = {
  location: {
    query: {
      projectid: number;
    };
  };
};
const PlanList: FC<ListProps> = (porps) => {
  const actionRef = useRef<ActionType>();
  const { projectid } = porps.location.query;
  const columns: ProColumns<PlanInfo>[] = [
    {
      title: 'ID',
      dataIndex: 'index',
      valueType: 'index',
      search: false,
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
      search: false,
    },
    {
      title: 'Creator',
      dataIndex: 'creator',
      sorter: true,
      search: false,
    },
    {
      title: 'Create Time',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      sorter: true,
      search: false,
    },
    {
      title: 'Last Update Time',
      dataIndex: 'lastUpdateTime',
      valueType: 'dateTime',
      sorter: true,
      search: false,
    },
    {
      title: 'Comment',
      dataIndex: 'comment',
      valueType: 'textarea',
      search: false,
    },
    {
      title: 'Version',
      dataIndex: 'version',
      search: false,
    },
    {
      title: 'Option',
      search: false,
      render: (_, row) => [
        <Space size={'small'}>
          <PlanOpen projectId={row.projectId} id={row.id} />
          <PlanView pkid={row.pkid} />
          <PlanEdit pkid={row.pkid} actionRef={actionRef} />
          <PlanDelete pkid={row.pkid} actionRef={actionRef} />
        </Space>,
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable<PlanInfo, ListPagination>
        actionRef={actionRef}
        search={{
          defaultCollapsed: false,
        }}
        toolBarRender={() => [<PlanCreate projectId={projectid} actionRef={actionRef} />]}
        request={(
          params: {
            pageSize: number;
            current: number;
          },
          sort,
        ) => {
          return getPlanInfoGrid(params, sort, projectid);
        }}
        columns={columns}
      />
    </PageContainer>
  );
};

export default PlanList;
