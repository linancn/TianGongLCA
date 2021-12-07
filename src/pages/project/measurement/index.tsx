import type { FC } from 'react';
import { useRef } from 'react';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { getMeasurementBaseGrid } from '@/services/measurementbase/api';
import type { MeasurementBase } from '@/services/measurementbase/data';
import { PageContainer } from '@ant-design/pro-layout';
import type { ListPagination } from '@/services/home/data';
import MeasurementView from './components/view';
import MeasurementDelete from './components/delete';
import MeasurementEdit from './components/edit';
import MeasurementCreate from './components/create';

type ListProps = {
  location: {
    query: {
      projectid: number;
    };
  };
};
const TableList: FC<ListProps> = (porps) => {
  const actionRef = useRef<ActionType>();
  const { projectid } = porps.location.query;
  const columns: ProColumns<MeasurementBase>[] = [
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
      title: 'Unit',
      dataIndex: 'unit',
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
      title: 'Last Update',
      dataIndex: 'lastUpdateTime',
      valueType: 'dateTime',
      sorter: true,
      search: false,
    },
    {
      title: 'Option',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, row) => [
        <MeasurementView pkid={row.pkid} />,
        <MeasurementEdit pkid={row.pkid} actionRef={actionRef} />,
        <MeasurementDelete pkid={row.pkid} actionRef={actionRef} />,
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable<MeasurementBase, ListPagination>
        actionRef={actionRef}
        search={{
          defaultCollapsed: false,
        }}
        toolBarRender={() => [<MeasurementCreate projectId={projectid} actionRef={actionRef} />]}
        request={(
          params: {
            pageSize: number;
            current: number;
          },
          sort,
        ) => {
          return getMeasurementBaseGrid(params, sort, projectid);
        }}
        columns={columns}
      />
    </PageContainer>
  );
};

export default TableList;
