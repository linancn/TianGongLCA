import type { FC } from 'react';
import { useRef } from 'react';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { Button, Space, Tooltip } from 'antd';
import type { ListPagination } from '@/services/home/data';
import { getUslciFlowGrid } from '@/services/uslciflows/api';
import type { UslciFlow } from '@/services/uslciflows/data';
import { ProfileOutlined } from '@ant-design/icons';

const USLCI: FC = () => {
  const actionRef = useRef<ActionType>();
  const dataColumns: ProColumns<UslciFlow>[] = [
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
      title: 'Flow Type',
      dataIndex: 'flowtype',
      sorter: true,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      valueType: 'textarea',
    },
    {
      title: 'Version',
      dataIndex: 'version',
      search: false,
    },
    {
      title: 'Last Change',
      dataIndex: 'lastchange',
      valueType: 'dateTime',
      sorter: true,
      search: false,
    },
    {
      title: 'Option',
      dataIndex: 'option',
      search: false,
      render: () => [
        <Space size={'small'}>
          <Tooltip title="View">
            <Button shape="circle" icon={<ProfileOutlined />} size="small" />
          </Tooltip>
        </Space>,
      ],
    },
  ];

  return (
    <ProTable<UslciFlow, ListPagination>
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
        return getUslciFlowGrid(params, sort);
      }}
      columns={dataColumns}
    />
  );
};

export default USLCI;
