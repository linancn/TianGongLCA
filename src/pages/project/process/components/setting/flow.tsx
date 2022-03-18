import type { FC } from 'react';
import { useRef } from 'react';
import ProCard from '@ant-design/pro-card';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { Space } from 'antd';
import type { ListPagination } from '@/services/home/data';
import ProcessFlowDelete from './flow/delete';
import ProcessFlowView from './flow/view';
import ProcessFlowCreate from './flow/create';
import { getExchangeJsonGrid } from '@/services/process/api';
import type { ExchangeJson } from '@/services/process/data';
import ProcessFlowEdit from './flow/edit';

type Props = {
  projectId: number;
  processPkid: number;
  input: boolean;
};

const FlowCard: FC<Props> = ({ projectId, processPkid, input }) => {
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<ExchangeJson>[] = [
    {
      title: 'ID',
      dataIndex: 'index',
      valueType: 'index',
      search: false,
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      search: false,
    },
    {
      title: 'Amount Formula',
      dataIndex: 'amountFormula',
      search: false,
    },
    {
      title: 'Flow Name',
      dataIndex: 'flowName',
      sorter: true,
    },
    {
      title: 'Option',
      search: false,
      render: (_, row) => [
        <Space size={'small'}>
          <ProcessFlowView processPkid={row.processPkid} flowId={row.flowId} input={input} />
          <ProcessFlowEdit
            projectId={projectId}
            processPkid={row.processPkid}
            flowId={row.flowId}
            input={input}
            actionRef={actionRef}
          />
          <ProcessFlowDelete
            processPkid={row.processPkid}
            flowId={row.flowId}
            input={input}
            actionRef={actionRef}
          />
        </Space>,
      ],
    },
  ];

  actionRef.current?.reload();
  return (
    <ProCard title={input ? 'Input Flows' : 'Output Flows'} bordered={false} collapsible>
      <ProTable<ExchangeJson, ListPagination>
        actionRef={actionRef}
        search={{
          defaultCollapsed: false,
        }}
        toolBarRender={() => [
          <ProcessFlowCreate
            projectId={projectId}
            processPkid={processPkid}
            input={input}
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
          return getExchangeJsonGrid(params, sort, processPkid, input);
        }}
        columns={columns}
      />
    </ProCard>
  );
};
export default FlowCard;
