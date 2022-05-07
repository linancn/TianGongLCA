import type { FC } from 'react';
import { useRef, useEffect, useState } from 'react';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { PageContainer } from '@ant-design/pro-layout';
import { Space } from 'antd';
import type { ListPagination } from '@/services/home/data';
import FlowView from './components/view';
import FlowEdit from './components/edit';
import FlowDelete from './components/delete';
import FlowCreate from './components/create';
import { FormattedMessage } from 'umi';
import { getProject } from '@/services/project/api';
import type { Flow } from '@/services/flow/data';
import { getFlowGrid } from '@/services/flow/api';
import LocationViewByParent from '../location/components/viewbyparent';
import CategoryViewByParent from '../category/components/viewbyparent';
import FlowPropertyJsonList from './components/propertyjson';
import FlowSelect from './components/select';

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
  const flowColumns: ProColumns<Flow>[] = [
    {
      title: <FormattedMessage id="flow.index" defaultMessage="Index" />,
      dataIndex: 'index',
      valueType: 'index',
      search: false,
    },
    {
      title: <FormattedMessage id="flow.dataName" defaultMessage="Data Name" />,
      dataIndex: 'dataName',
      sorter: true,
    },
    {
      title: <FormattedMessage id="flow.flowType" defaultMessage="Flow Type" />,
      dataIndex: 'flowType',
      sorter: true,
      search: false,
    },
    {
      title: <FormattedMessage id="flow.categoryName" defaultMessage="Category" />,
      dataIndex: 'categoryName',
      sorter: true,
      search: false,
      render: (_, row) => [
        <Space size={'small'}>
          {row.categoryId == null ? '-' : row.categoryName}
          <CategoryViewByParent
            projectId={row.projectId}
            id={row.categoryId}
            parentType={'flow'}
            parentId={row.id}
            actionRef={actionRef}
          />
        </Space>,
      ],
    },
    {
      title: <FormattedMessage id="flow.locationName" defaultMessage="Location Name" />,
      dataIndex: 'locationName',
      sorter: true,
      search: false,
      render: (_, row) => [
        <Space size={'small'}>
          {row.locationId == null ? '-' : row.locationName}
          <LocationViewByParent
            projectId={row.projectId}
            id={row.locationId}
            parentType={'flow'}
            parentId={row.id}
            actionRef={actionRef}
          />
        </Space>,
      ],
    },
    {
      title: <FormattedMessage id="flow.flowPropertyCount" defaultMessage="Measurement Count" />,
      dataIndex: 'flowPropertyCount',
      search: false,
      render: (_, row) => [
        <Space size={'small'}>
          {row.flowPropertyCount}
          {/* <Tooltip title="List">
            <Button
              shape="circle"
              icon={<OrderedListOutlined />}
              size="small"
              // onClick={() => onViewFlowProcess(row.sourceProcessId, row.sourceFlowId)}
            />
          </Tooltip> */}
          <FlowPropertyJsonList
            projectId={row.projectId}
            flowId={row.id}
            parentActionRef={actionRef}
          />
        </Space>,
      ],
    },
    {
      title: <FormattedMessage id="flow.database" defaultMessage="Database" />,
      dataIndex: 'database',
      sorter: true,
      search: false,
    },
    {
      title: <FormattedMessage id="flow.release" defaultMessage="Release" />,
      dataIndex: 'release',
      sorter: true,
      search: false,
    },
    {
      title: <FormattedMessage id="flow.lastChange" defaultMessage="Last Change" />,
      dataIndex: 'lastChange',
      valueType: 'dateTime',
      sorter: true,
      search: false,
    },
    {
      title: <FormattedMessage id="options.option" defaultMessage="Option" />,
      dataIndex: 'option',
      search: false,
      render: (_, row) => [
        <Space size={'small'}>
          <FlowView pkid={row.pkid} actionRef={actionRef} />
          <FlowEdit
            pkid={row.pkid}
            buttonType={'icon'}
            actionRef={actionRef}
            setViewDrawerVisible={() => {}}
          />
          <FlowDelete
            pkid={row.pkid}
            buttonType={'icon'}
            actionRef={actionRef}
            setViewDrawerVisible={() => {}}
          />
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
      <ProTable<Flow, ListPagination>
        actionRef={actionRef}
        search={{
          defaultCollapsed: false,
        }}
        toolBarRender={() => [
          <FlowCreate projectId={projectid} actionRef={actionRef} />,
          <FlowSelect projectId={projectid} parentActionRef={actionRef} />,
        ]}
        request={(
          params: {
            pageSize: number;
            current: number;
          },
          sort,
        ) => {
          return getFlowGrid(params, sort, projectid, false);
        }}
        columns={flowColumns}
      />
    </PageContainer>
  );
};

export default TableList;
