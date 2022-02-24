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
import FlowMeasurementSetting from './components/measurement/setting';
import { FormattedMessage } from 'umi';
import { getProject } from '@/services/project/api';
import FlowSelect from './components/select';
import type { Flow } from '@/services/flow/data';
import { getFlowGrid } from '@/services/flow/api';
import LocationViewByParent from '../location/components/viewbyparent';
import CategoryViewByParent from '../category/components/viewbyparent';

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
      title: 'ID',
      dataIndex: 'index',
      valueType: 'index',
      search: false,
    },
    {
      title: 'Data Name',
      dataIndex: 'dataName',
      sorter: true,
    },
    {
      title: 'Flow Type',
      dataIndex: 'flowType',
      sorter: true,
      search: false,
    },
    {
      title: 'Location Name',
      dataIndex: 'locationName',
      search: false,
      render: (_, row) => [
        <Space size={'small'}>
          {row.locationId == null ? '-' : row.locationName}
          <LocationViewByParent
            projectId={row.projectId}
            id={row.locationId}
            parentType={'flow'}
            parentPkid={row.pkid}
            actionRef={actionRef}
          />
        </Space>,
      ],
    },
    {
      title: 'Category',
      dataIndex: 'categoryName',
      search: false,
      render: (_, row) => [
        <Space size={'small'}>
          {row.categoryId == null ? '-' : row.categoryName}
          <CategoryViewByParent
            projectId={row.projectId}
            id={row.categoryId}
            parentType={'flow'}
            parentPkid={row.pkid}
            actionRef={actionRef}
          />
        </Space>,
      ],
    },
    {
      title: 'Measurements',
      dataIndex: 'measurements',
      search: false,
      render: (_, row) => [
        <Space size={'small'}>
          {/* <Tooltip title="List">
            <Button
              shape="circle"
              icon={<OrderedListOutlined />}
              size="small"
              // onClick={() => onViewFlowProcess(row.sourceProcessId, row.sourceFlowId)}
            />
          </Tooltip> */}
          <FlowMeasurementSetting projectId={row.projectId} flowBaseId={row.id} />
        </Space>,
      ],
    },
    {
      title: 'Last Change',
      dataIndex: 'lastChange',
      valueType: 'dateTime',
      sorter: true,
      search: false,
    },
    {
      title: 'Database',
      dataIndex: 'database',
      sorter: true,
      search: false,
    },
    {
      title: 'Release',
      dataIndex: 'release',
      sorter: true,
      search: false,
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
      <ProTable<Flow, ListPagination>
        actionRef={actionRef}
        search={{
          defaultCollapsed: false,
        }}
        toolBarRender={() => [
          <FlowCreate projectId={projectid} actionRef={actionRef} />,
          <FlowSelect />,
        ]}
        request={(
          params: {
            pageSize: number;
            current: number;
          },
          sort,
        ) => {
          return getFlowGrid(params, sort, projectid);
        }}
        columns={flowColumns}
      />
    </PageContainer>
  );
};

export default TableList;
