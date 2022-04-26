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
import { FormattedMessage } from 'umi';

type Props = {
  projectId: number;
  processPkid: number;
  input: boolean;
};

const FlowCard: FC<Props> = ({ projectId, processPkid, input }) => {
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<ExchangeJson>[] = [
    {
      title: <FormattedMessage id="process.index" defaultMessage="No." />,
      dataIndex: 'index',
      valueType: 'index',
      search: false,
    },
    {
      title: <FormattedMessage id="process.amount" defaultMessage="Amount" />,
      dataIndex: 'amount',
      search: false,
    },
    {
      title: <FormattedMessage id="process.amountFormula" defaultMessage="Amount Formula" />,
      dataIndex: 'amountFormula',
      search: false,
    },
    {
      title: <FormattedMessage id="process.flowName" defaultMessage="Flow Name" />,
      dataIndex: 'flowName',
      sorter: true,
    },
    {
      title: <FormattedMessage id="options.option" defaultMessage="Option" />,
      search: false,
      render: (_, row) => [
        <Space size={'small'}>
          <ProcessFlowView
            projectId={projectId}
            processId={row.processId}
            internalId={row.internalId}
            input={input}
          />
          <ProcessFlowEdit
            projectId={projectId}
            processId={row.processId}
            processPkid={row.processPkid}
            internalId={row.internalId}
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
    <ProCard
      title={
        input ? (
          <FormattedMessage id="process.inputFlows" defaultMessage="Input Flows" />
        ) : (
          <FormattedMessage id="process.outputFlows" defaultMessage="Output Flows" />
        )
      }
      bordered={false}
      collapsible
    >
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
