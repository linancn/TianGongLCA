import type { FC } from 'react';
import { useRef } from 'react';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { Button, Space, Tooltip } from 'antd';
import type { ListPagination } from '@/services/home/data';
import { ProfileOutlined } from '@ant-design/icons';
import { getUslciProcessGrid } from '@/services/uslciprocesses/api';
import type { UslciProcess } from '@/services/uslciprocesses/data';

const USLCI: FC = () => {
  const actionRef = useRef<ActionType>();
  const dataColumns: ProColumns<UslciProcess>[] = [
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
      title: 'Process Type',
      dataIndex: 'processtype',
      sorter: true,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      valueType: 'textarea',
    },
    {
      title: 'Last Internalid',
      dataIndex: 'lastinternalid',
      search: false,
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
    <ProTable<UslciProcess, ListPagination>
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
        return getUslciProcessGrid(params, sort);
      }}
      columns={dataColumns}
    />
  );
};

export default USLCI;
