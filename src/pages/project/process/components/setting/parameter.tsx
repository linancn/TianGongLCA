import type { FC } from 'react';
import { useRef } from 'react';
import ProCard from '@ant-design/pro-card';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { getParameterJsonGrid } from '@/services/process/api';
import { Space } from 'antd';
import type { ListPagination } from '@/services/home/data';
import type { ParameterJson } from '@/services/process/data';
import ParameterJsonCreate from './parameter/create';
import ParameterJsonView from './parameter/view';
import ParameterJsonEdit from './parameter/edit';
import ParameterJsonDelete from './parameter/delete';
import { FormattedMessage } from 'umi';

type Props = {
  projectId: number;
  processId: string;
};

const ParameterCard: FC<Props> = ({ projectId, processId }) => {
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<ParameterJson>[] = [
    {
      title: <FormattedMessage id="parameter.index" defaultMessage="Index" />,
      dataIndex: 'index',
      valueType: 'index',
      search: false,
    },
    {
      title: <FormattedMessage id="parameter.dataName" defaultMessage="Data Name" />,
      dataIndex: 'name',
      sorter: true,
    },
    {
      title: <FormattedMessage id="parameter.formula" defaultMessage="Formula" />,
      dataIndex: 'formula',
      search: false,
    },
    {
      title: <FormattedMessage id="parameter.value" defaultMessage="Value" />,
      dataIndex: 'value',
      search: false,
    },
    // {
    //   title: 'Min',
    //   dataIndex: 'min',
    //   search: false,
    // },
    // {
    //   title: 'Max',
    //   dataIndex: 'max',
    //   search: false,
    // },
    {
      title: <FormattedMessage id="parameter.uncertaintyGeomSd" defaultMessage="SD" />,
      dataIndex: 'uncertaintyGeomSd',
      search: false,
    },
    {
      title: <FormattedMessage id="parameter.uncertaintyGeomMean" defaultMessage="Mean" />,
      dataIndex: 'uncertaintyGeomMean',
      search: false,
    },
    {
      title: <FormattedMessage id="options.option" defaultMessage="Option" />,
      search: false,
      render: (_, row) => [
        <Space key={0} size={'small'}>
          <ParameterJsonView projectId={projectId} processId={processId} id={row.id} />
          <ParameterJsonEdit
            projectId={projectId}
            processId={processId}
            id={row.id}
            actionRef={actionRef}
          />
          <ParameterJsonDelete
            projectId={projectId}
            processId={processId}
            id={row.id}
            actionRef={actionRef}
          />
        </Space>,
      ],
    },
  ];

  actionRef.current?.reload();
  return (
    <ProCard
      title={<FormattedMessage id="menu.parameters" defaultMessage="Parameters" />}
      bordered={false}
      collapsible
    >
      <ProTable<ParameterJson, ListPagination>
        actionRef={actionRef}
        search={{
          defaultCollapsed: false,
        }}
        toolBarRender={() => [
          <ParameterJsonCreate
            key={0}
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
          return getParameterJsonGrid(params, sort, projectId, processId);
        }}
        columns={columns}
      />
    </ProCard>
  );
};
export default ParameterCard;
