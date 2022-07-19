import React, { useRef } from 'react';
import { getUserGrid } from '@/services/user/api';
import type { User } from '@/services/user/data';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { ListPagination } from '@/services/home/data';
import { PageContainer } from '@ant-design/pro-layout';
import UserCreate from './components/create';
import { FormattedMessage } from 'umi';
import { Space } from 'antd';
import UserEdit from './components/edit';
import UserView from './components/view';
import UserDelete from './components/delete';
export default (): React.ReactNode => {
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<User>[] = [
    {
      title: 'index',
      dataIndex: 'index',
      valueType: 'index',
      search: false,
    },
    {
      title: 'name',
      dataIndex: 'name',
      sorter: true,
    },
    {
      title: 'email',
      dataIndex: 'email',
      sorter: true,
      search: false,
    },
    {
      title: 'create time',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      sorter: true,
      search: false,
    },
    {
      title: <FormattedMessage id="options.option" defaultMessage="Option" />,
      dataIndex: 'option',
      search: false,
      render: (_, row) => [
        <Space key={0} size={'small'}>
          <UserView id={row.id} actionRef={actionRef} />
          <UserEdit
            id={row.id}
            buttonType={'icon'}
            actionRef={actionRef}
            setViewDrawerVisible={() => {}}
          />
          <UserDelete
            id={row.id}
            buttonType={'icon'}
            actionRef={actionRef}
            setViewDrawerVisible={() => {}}
          />
        </Space>,
      ],
    },
  ];

  return (
    <PageContainer
      header={{
        title: <>用户列表</>,
      }}
    >
      <ProTable<User, ListPagination>
        actionRef={actionRef}
        search={{
          defaultCollapsed: false,
        }}
        toolBarRender={() => [<UserCreate key={0} actionRef={actionRef} />]}
        request={(
          params: {
            pageSize: number;
            current: number;
          },
          sort,
        ) => {
          return getUserGrid(params, sort);
        }}
        columns={columns}
      />
    </PageContainer>
  );
};
