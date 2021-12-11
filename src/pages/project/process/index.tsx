import { FC, useEffect, useState } from 'react';
import { useRef } from 'react';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { getProcessGrid } from '@/services/process/api';
import type { Process } from '@/services/process/data';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Space, Tooltip } from 'antd';
import { OrderedListOutlined } from '@ant-design/icons';
import type { ListPagination } from '@/services/home/data';
import ProcessDelete from './components/delete';
import ProcessView from './components/view';
import ProcessEdit from './components/edit';
import ProcessCreate from './components/create';
import ProcessFlowSetting from './components/detail/setting';
import { getProject } from '@/services/project/api';
import { FormattedMessage } from 'umi';

type ListProps = {
  location: {
    query: {
      projectid: number;
    };
  };
};

const TableList: FC<ListProps> = (props) => {
  const actionRef = useRef<ActionType>();
  const { projectid } = props.location.query;
  const [projectName, setProjectName] = useState('');
  const columns: ProColumns<Process>[] = [
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
      title: 'Detail',
      search: false,
      render: (_, row) => [
        <Space size={'small'}>
          <Tooltip title="List">
            <Button
              shape="circle"
              icon={<OrderedListOutlined />}
              size="small"
              // onClick={() => onViewFlowProcess(row.sourceProcessId, row.sourceFlowId)}
            />
          </Tooltip>
          <ProcessFlowSetting projectId={row.projectId} processId={row.id} />
        </Space>,
      ],
    },
    {
      title: 'Option',
      search: false,
      render: (_, row) => [
        <Space size={'small'}>
          <ProcessView pkid={row.pkid} />
          <ProcessEdit pkid={row.pkid} actionRef={actionRef} />
          <ProcessDelete pkid={row.pkid} actionRef={actionRef} />
        </Space>,
      ],
    },
  ];
  useEffect(() => {
    getProject(projectid).then((result) => setProjectName(result.name + ' - '));
  }, [projectid]);
  return (
    <PageContainer
      header={{
        title: (
          <>
            {projectName}
            <FormattedMessage id="menu.processes" defaultMessage="Processes" />
          </>
        ),
      }}
    >
      <ProTable<Process, ListPagination>
        actionRef={actionRef}
        search={{
          defaultCollapsed: false,
        }}
        toolBarRender={() => [<ProcessCreate projectId={projectid} actionRef={actionRef} />]}
        request={(
          params: {
            pageSize: number;
            current: number;
          },
          sort,
        ) => {
          return getProcessGrid(params, sort, projectid);
        }}
        columns={columns}
      />
    </PageContainer>
  );
};

export default TableList;
