import type { FC } from 'react';
import { useRef } from 'react';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { getFlowBaseGrid } from '@/services/flowbase/api';
import type { FlowBase } from '@/services/flowbase/data';
import { Button, Space, Tooltip } from 'antd';
import { OrderedListOutlined } from '@ant-design/icons';
import type { ListPagination } from '@/services/home/data';
import FlowView from './view';

type Props = {
  projectId: number;
};

const CrystaLCA: FC<Props> = ({ projectId }) => {
  const actionRef = useRef<ActionType>();
  const flowBaseColumns: ProColumns<FlowBase>[] = [
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
      title: 'Nation',
      dataIndex: 'nation',
      sorter: true,
    },
    {
      title: 'Source',
      dataIndex: 'source',
      sorter: true,
    },
    {
      title: 'Type',
      dataIndex: 'type',
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
      title: 'Measurements',
      dataIndex: 'measurements',
      search: false,
      render: () => [
        <Space size={'small'}>
          <Tooltip title="List">
            <Button
              shape="circle"
              icon={<OrderedListOutlined />}
              size="small"
              // onClick={() => onViewFlowProcess(row.sourceProcessId, row.sourceFlowId)}
            />
          </Tooltip>
        </Space>,
      ],
    },
    {
      title: 'Option',
      dataIndex: 'option',
      search: false,
      render: (_, row) => [
        <Space size={'small'}>
          <FlowView pkid={row.pkid} />
        </Space>,
      ],
    },
  ];

  return (
    <ProTable<FlowBase, ListPagination>
      actionRef={actionRef}
      search={{
        defaultCollapsed: false,
      }}
      request={(
        params: {
          pageSize: number;
          current: number;
        },
        sort,
      ) => {
        return getFlowBaseGrid(params, sort, projectId);
      }}
      columns={flowBaseColumns}
    />
  );
};

export default CrystaLCA;
