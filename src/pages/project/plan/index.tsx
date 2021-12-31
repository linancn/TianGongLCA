import type { FC } from 'react';
import { useEffect, useState, useRef } from 'react';
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
import { FormattedMessage } from 'umi';
import { getProject } from '@/services/project/api';

type Props = {
  location: {
    query: {
      projectid: number;
    };
  };
};
const PlanList: FC<Props> = (props) => {
  const actionRef = useRef<ActionType>();
  const { projectid } = props.location.query;
  const [projectName, setProjectName] = useState('');
  const columns: ProColumns<PlanInfo>[] = [
    {
      title: <FormattedMessage id="plan.index" />,
      dataIndex: 'index',
      valueType: 'index',
      search: false,
    },
    {
      title: <FormattedMessage id="plan.name" />,
      dataIndex: 'name',
      sorter: true,
    },
    {
      title: <FormattedMessage id="plan.type" />,
      dataIndex: 'type',
      sorter: true,
    },
    {
      title: <FormattedMessage id="plan.nation" />,
      dataIndex: 'nation',
      sorter: true,
    },
    {
      title: <FormattedMessage id="plan.comment" />,
      dataIndex: 'comment',
      valueType: 'textarea',
      search: false,
    },
    {
      title: <FormattedMessage id="plan.creator" />,
      dataIndex: 'creator',
      sorter: true,
      search: false,
    },
    {
      title: <FormattedMessage id="plan.createTime" />,
      dataIndex: 'createTime',
      valueType: 'dateTime',
      sorter: true,
      search: false,
    },
    {
      title: <FormattedMessage id="plan.lastUpdateTime" />,
      dataIndex: 'lastUpdateTime',
      valueType: 'dateTime',
      sorter: true,
      search: false,
    },
    {
      title: <FormattedMessage id="plan.version" />,
      dataIndex: 'version',
      search: false,
    },
    {
      title: <FormattedMessage id="plan.option" />,
      search: false,
      render: (_, row) => [
        <Space size={'small'}>
          <PlanOpen projectId={row.projectId} planId={row.id} name={row.name} />
          <PlanView pkid={row.pkid} />
          <PlanEdit pkid={row.pkid} actionRef={actionRef} />
          <PlanDelete pkid={row.pkid} actionRef={actionRef} />
        </Space>,
      ],
    },
  ];
  useEffect(() => {
    getProject(projectid).then((result) => setProjectName(result.name + ' - '));
  }, [projectid]);

  return (
    <PageContainer
      header={{
        title: (
          <>
            {projectName}
            <FormattedMessage id="menu.plans" defaultMessage="Plans" />
          </>
        ),
      }}
    >
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
