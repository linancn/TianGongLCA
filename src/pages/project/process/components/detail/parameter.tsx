import type { FC } from 'react';
import { useRef } from 'react';
import ProCard from '@ant-design/pro-card';
import type { Parameter } from '@/services/parameter/data';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { getParameterGrid } from '@/services/parameter/api';
import { Space } from 'antd';
import type { ListPagination } from '@/services/home/data';
import ProcessParameterDelete from './parameter/delete';
import ProcessParameterEdit from './parameter/edit';
import ProcessParameterView from './parameter/view';
import ProcessParameterCreate from './parameter/create';

type ParameterProps = {
  projectId: number;
  processId: string;
};

const ParameterCard: FC<ParameterProps> = ({ projectId, processId }) => {
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<Parameter>[] = [
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
      title: 'Formula',
      dataIndex: 'formula',
      search: false,
    },
    {
      title: 'Value',
      dataIndex: 'value',
      search: false,
    },
    {
      title: 'Min',
      dataIndex: 'min',
      search: false,
    },
    {
      title: 'Max',
      dataIndex: 'max',
      search: false,
    },
    {
      title: 'SD',
      dataIndex: 'sd',
      search: false,
    },
    {
      title: 'Option',
      search: false,
      render: (_, row) => [
        <Space size={'small'}>
          <ProcessParameterView pkid={row.pkid} />
          <ProcessParameterEdit pkid={row.pkid} actionRef={actionRef} />
          <ProcessParameterDelete pkid={row.pkid} actionRef={actionRef} />
        </Space>,
      ],
    },
  ];

  actionRef.current?.reload();
  return (
    <ProCard title="Parameters" bordered={false} collapsible>
      <ProTable<Parameter, ListPagination>
        actionRef={actionRef}
        search={{
          defaultCollapsed: false,
        }}
        toolBarRender={() => [
          <ProcessParameterCreate
            projectId={projectId}
            processId={processId}
            actionRef={actionRef}
          />,
        ]}
        request={(
          params: {
            pageSize: number;
            current: number;
          },
          sort,
        ) => {
          return getParameterGrid(params, sort, projectId, processId);
        }}
        columns={columns}
      />
    </ProCard>
  );
};
export default ParameterCard;
