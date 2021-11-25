import type { FC } from 'react';
import { useRef } from 'react';
import ProCard from '@ant-design/pro-card';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { Space } from 'antd';
import type { ListPagination } from '@/services/home/data';
import styles from '@/style/custom.less';
import { getFlowProcessBaseGrid } from '@/services/flowprocessbase/api';
import type { FlowProcessBase } from '@/services/flowprocessbase/data';
import ProcessFlowDelete from './flow/delete';
import ProcessFlowEdit from './flow/edit';
import ProcessFlowView from './flow/view';
import ProcessFlowCreate from './flow/create';
import ProcessFlowParameterSelect from './flow/parameter/select';
import ProcessFlowParameterView from './flow/parameter/view';

type Props = {
  projectId: number;
  processId: string;
  ioType: string;
};

const FlowCard: FC<Props> = ({ projectId, processId, ioType }) => {
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<FlowProcessBase>[] = [
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
      title: 'SD',
      dataIndex: 'sd',
      search: false,
    },
    {
      title: 'Factor',
      dataIndex: 'factor',
      search: false,
    },
    {
      title: 'Name',
      dataIndex: 'name',
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
      title: 'Parameter',
      search: false,
      sorter: true,
      render: (_, row) => [
        <Space size={'small'} className={styles.footer_left}>
          {row.parameterName}
        </Space>,
        <Space size={'small'} className={styles.footer_right}>
          <ProcessFlowParameterView
            projectId={projectId}
            processId={processId}
            id={row.parameterId}
          />
          <ProcessFlowParameterSelect
            projectId={projectId}
            processId={processId}
            flowProcessPkid={row.pkid}
            actionRef={actionRef}
          />
        </Space>,
      ],
    },
    {
      title: 'Option',
      search: false,
      render: (_, row) => [
        <Space size={'small'}>
          <ProcessFlowView pkid={row.pkid} ioType={ioType} />
          <ProcessFlowEdit
            pkid={row.pkid}
            projectId={projectId}
            ioType={ioType}
            actionRef={actionRef}
          />
          <ProcessFlowDelete pkid={row.pkid} actionRef={actionRef} />
        </Space>,
      ],
    },
  ];

  actionRef.current?.reload();
  return (
    <ProCard
      title={ioType === 'input' ? 'Input Flows' : 'Output Flows'}
      bordered={false}
      collapsible
    >
      <ProTable<FlowProcessBase, ListPagination>
        actionRef={actionRef}
        search={{
          defaultCollapsed: false,
        }}
        toolBarRender={() => [
          <ProcessFlowCreate
            projectId={projectId}
            processId={processId}
            ioType={ioType}
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
          return getFlowProcessBaseGrid(params, sort, projectId, processId, ioType);
        }}
        columns={columns}
      />
    </ProCard>
  );
};
export default FlowCard;
