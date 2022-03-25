import type { FC } from 'react';
import { useRef } from 'react';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { Button, Space, Tooltip } from 'antd';
import type { ListPagination } from '@/services/home/data';
import { getUslciFlowGrid } from '@/services/uslciflows/api';
import type { UslciFlow } from '@/services/uslciflows/data';
import { ProfileOutlined } from '@ant-design/icons';
import { FormattedMessage } from 'umi';

const USLCI: FC = () => {
  const actionRef = useRef<ActionType>();
  const dataColumns: ProColumns<UslciFlow>[] = [
    {
      title: <FormattedMessage id="flow.index" defaultMessage="Index" />,
      dataIndex: 'index',
      valueType: 'index',
      search: false,
    },
    {
      title: <FormattedMessage id="flow.dataName" defaultMessage="Data Name" />,
      dataIndex: 'name',
      sorter: true,
    },
    {
      title: <FormattedMessage id="flow.flowType" defaultMessage="Flow Type" />,
      dataIndex: 'flowtype',
      sorter: true,
    },
    {
      title: <FormattedMessage id="flow.description" defaultMessage="Description" />,
      dataIndex: 'description',
      valueType: 'textarea',
    },
    {
      title: <FormattedMessage id="flow.version" defaultMessage="Version" />,
      dataIndex: 'version',
      search: false,
    },
    {
      title: <FormattedMessage id="flow.lastChange" defaultMessage="Last Change" />,
      dataIndex: 'lastchange',
      valueType: 'dateTime',
      sorter: true,
      search: false,
    },
    {
      title: <FormattedMessage id="options.option" defaultMessage="Option" />,
      dataIndex: 'option',
      search: false,
      render: () => [
        <Space size={'small'}>
          <Tooltip title={<FormattedMessage id="options.view" defaultMessage="View" />}>
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
