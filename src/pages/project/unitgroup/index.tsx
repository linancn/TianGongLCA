import type { FC } from 'react';
import { useRef, useEffect, useState } from 'react';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { PageContainer } from '@ant-design/pro-layout';
import type { ListPagination } from '@/services/home/data';
import { FormattedMessage } from 'umi';
import { getProject } from '@/services/project/api';
import FlowPropertyCreate from './components/create';
import { Space } from 'antd';
import UnitGroupView from './components/view';
import UnitGroupEdit from './components/edit';
import UnitGroupDelete from './components/delete';
import { getUnitGroupGrid } from '@/services/unitgroup/api';
import type { UnitGroup } from '@/services/unitgroup/data';
import UnitJsonList from './components/unitjson/list';
import CategoryViewByParent from '../category/components/viewbyparent';
import UnitGroupSelect from './components/select';

type ListProps = {
  location: {
    query: {
      projectid: number;
    };
  };
};
const UnitGroupIndex: FC<ListProps> = (props) => {
  const actionRef = useRef<ActionType>();
  const { projectid } = props.location.query;
  const [projectName, setProjectName] = useState('');
  const unitGroupColumns: ProColumns<UnitGroup>[] = [
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
      title: 'Reference Unit',
      dataIndex: 'referenceUnit',
      search: false,
      render: (_, row) => [
        <Space size={'small'}>
          {row.referenceUnit == null ? '-' : row.referenceUnit}
          {/* <Tooltip title="List">
            <Button
              shape="circle"
              icon={<OrderedListOutlined />}
              size="small"
              // onClick={() => onViewFlowProcess(row.sourceProcessId, row.sourceFlowId)}
            />
          </Tooltip> */}
          <UnitJsonList
            projectId={row.projectId}
            unitGroupPkid={row.pkid}
            parentActionRef={actionRef}
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
            parentType={'unitgroup'}
            parentPkid={row.pkid}
            actionRef={actionRef}
          />
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
          <UnitGroupView pkid={row.pkid} actionRef={actionRef} />
          <UnitGroupEdit
            pkid={row.pkid}
            buttonType={'icon'}
            actionRef={actionRef}
            setViewDrawerVisible={() => {}}
          />
          <UnitGroupDelete
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
            <FormattedMessage id="menu.units" defaultMessage="Units" />
          </>
        ),
      }}
    >
      <ProTable<UnitGroup, ListPagination>
        actionRef={actionRef}
        search={{
          defaultCollapsed: false,
        }}
        toolBarRender={() => [
          <FlowPropertyCreate projectId={projectid} actionRef={actionRef} />,
          <UnitGroupSelect />,
        ]}
        request={(
          params: {
            pageSize: number;
            current: number;
          },
          sort,
        ) => {
          return getUnitGroupGrid(params, sort, projectid);
        }}
        columns={unitGroupColumns}
      />
    </PageContainer>
  );
};

export default UnitGroupIndex;
