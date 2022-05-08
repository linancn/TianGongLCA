import type { FC } from 'react';
import { useRef, useEffect, useState } from 'react';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { PageContainer } from '@ant-design/pro-layout';
import type { ListPagination } from '@/services/home/data';
import { FormattedMessage } from 'umi';
import { getProject } from '@/services/project/api';
import UnitGroupCreate from './components/create';
import { Space } from 'antd';
import UnitGroupView from './components/view';
import UnitGroupEdit from './components/edit';
import UnitGroupDelete from './components/delete';
import { getUnitGroupGrid } from '@/services/unitgroup/api';
import type { UnitGroup } from '@/services/unitgroup/data';
import UnitJsonList from './components/unitjson';
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
      title: <FormattedMessage id="unitgroup.index" defaultMessage="Index" />,
      dataIndex: 'index',
      valueType: 'index',
      search: false,
    },
    {
      title: <FormattedMessage id="unitgroup.dataName" defaultMessage="Data Name" />,
      dataIndex: 'dataName',
      sorter: true,
    },
    {
      title: <FormattedMessage id="unitgroup.referenceUnit" defaultMessage="Reference Unit" />,
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
          <UnitJsonList unitGroupId={row.id} parentActionRef={actionRef} projectId={projectid} />
        </Space>,
      ],
    },
    {
      title: <FormattedMessage id="unitgroup.categoryName" defaultMessage="Category" />,
      dataIndex: 'categoryName',
      search: false,
      render: (_, row) => [
        <Space size={'small'}>
          {row.categoryId == null ? '-' : row.categoryName}
          <CategoryViewByParent
            projectId={row.projectId}
            id={row.categoryId}
            parentType={'unitgroup'}
            parentId={row.id}
            actionRef={actionRef}
          />
        </Space>,
      ],
    },
    {
      title: <FormattedMessage id="unitgroup.lastChange" defaultMessage="Last Change" />,
      dataIndex: 'lastChange',
      valueType: 'dateTime',
      sorter: true,
      search: false,
    },
    {
      title: <FormattedMessage id="unitgroup.release" defaultMessage="Release" />,
      dataIndex: 'release',
      sorter: true,
      search: false,
    },
    {
      title: <FormattedMessage id="options.option" defaultMessage="Option" />,
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
          <UnitGroupCreate projectId={projectid} actionRef={actionRef} />,
          <UnitGroupSelect projectId={projectid} parentActionRef={actionRef} />,
        ]}
        request={(
          params: {
            pageSize: number;
            current: number;
          },
          sort,
        ) => {
          return getUnitGroupGrid(params, sort, projectid, false);
        }}
        columns={unitGroupColumns}
      />
    </PageContainer>
  );
};

export default UnitGroupIndex;
