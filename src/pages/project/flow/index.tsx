import type { FC } from 'react';
import { useRef, useEffect, useState } from 'react';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { getFlowBaseGrid } from '@/services/flowbase/api';
import type { FlowBase } from '@/services/flowbase/data';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Space, Tooltip } from 'antd';
import { OrderedListOutlined } from '@ant-design/icons';
import type { ListPagination } from '@/services/home/data';
import FlowView from './components/view';
import FlowEdit from './components/edit';
import FlowDelete from './components/delete';
import FlowCreate from './components/create';
import FlowMeasurementSetting from './components/measurement/setting';
import { FormattedMessage } from 'umi';
import { getProject } from '@/services/project/api';

type ListProps = {
  location: {
    query: {
      projectid: number;
    };
  };
};

const TableList: FC<ListProps> = (porps) => {
  const { projectid } = porps.location.query;
  const [projectName, setProjectName] = useState('');
  const actionRef = useRef<ActionType>();
  const flowBaseColumns: ProColumns<FlowBase>[] = [
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
      title: 'Nation',
      dataIndex: 'nation',
      sorter: true,
    },
    {
      title: 'Source',
      dataIndex: 'source',
      sorter: true,
    },
    {
      title: 'Type',
      dataIndex: 'type',
      sorter: true,
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
      title: 'Measurements',
      dataIndex: 'measurements',
      search: false,
      render: (_, row) => [
        <Space size={'small'}>
          <Tooltip title="List">
            <Button
              shape="circle"
              icon={<OrderedListOutlined />}
              size="small"
              // onClick={() => onViewFlowProcess(row.sourceProcessId, row.sourceFlowId)}
            />
          </Tooltip>
          <FlowMeasurementSetting projectId={row.projectId} flowBaseId={row.id} />
        </Space>,
      ],
    },
    {
      title: 'Option',
      dataIndex: 'option',
      search: false,
      render: (_, row) => [
        <Space size={'small'}>
          <FlowView pkid={row.pkid} />
          <FlowEdit pkid={row.pkid} actionRef={actionRef} />
          <FlowDelete pkid={row.pkid} actionRef={actionRef} />
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
            <FormattedMessage id="menu.flows" defaultMessage="Flows" />
          </>
        ),
      }}
    >
      <ProTable<FlowBase, ListPagination>
        actionRef={actionRef}
        search={{
          defaultCollapsed: false,
        }}
        toolBarRender={() => [<FlowCreate projectId={projectid} actionRef={actionRef} />]}
        request={(
          params: {
            pageSize: number;
            current: number;
          },
          sort,
        ) => {
          return getFlowBaseGrid(params, sort, projectid);
        }}
        columns={flowBaseColumns}
      />
    </PageContainer>
  );
};

export default TableList;
