import type { FC } from 'react';
import { useState, useRef } from 'react';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { getProcessGrid } from '@/services/process/api';
import type { Process } from '@/services/process/data';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Drawer, Space, Tooltip } from 'antd';
import { OrderedListOutlined, SettingOutlined } from '@ant-design/icons';
import styles from '@/style/custom.less';
import type { ListPagination } from '@/services/home/data';
import ParameterCard from './setting/parameter';
import InputCard from './setting/input';
import OutputCard from './setting/output';
import ProcessDelete from './components/delete';
import ProcessView from './components/view';
import ProcessEdit from './components/edit';
import ProcessCreate from './components/create';

type ListProps = {
  location: {
    query: {
      projectid: number;
    };
  };
};

const TableList: FC<ListProps> = (porps) => {
  const actionRef = useRef<ActionType>();
  const { projectid } = porps.location.query;
  const [drawerSettingVisible, handleDrawerSettingVisible] = useState(false);
  const [setting, setSetting] = useState<JSX.Element>();
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
      title: 'Flows',
      dataIndex: 'flows',
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
          <Tooltip title="Setting">
            <Button
              shape="circle"
              icon={<SettingOutlined />}
              size="small"
              onClick={() => onSetting(row.projectId, row.id)}
            />
          </Tooltip>
        </Space>,
      ],
    },
    {
      title: 'Option',
      render: (_, row) => [
        <Space size={'small'}>
          <ProcessView pkid={row.pkid} />
          <ProcessEdit pkid={row.pkid} actionRef={actionRef} />
          <ProcessDelete pkid={row.pkid} actionRef={actionRef} />
        </Space>,
      ],
    },
  ];

  function onSetting(projectId: number, processId: string) {
    handleDrawerSettingVisible(true);
    setSetting(
      <>
        <ParameterCard projectId={projectId} processId={processId} />
        <InputCard projectId={projectId} processId={processId} />
        <OutputCard projectId={projectId} processId={processId} />
      </>,
    );
  }
  return (
    <PageContainer>
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

      <Drawer
        title="Setting"
        width="100%"
        maskClosable={false}
        visible={drawerSettingVisible}
        onClose={() => handleDrawerSettingVisible(false)}
        footer={
          <Space size={'middle'} className={styles.footer_right}>
            <Button onClick={() => handleDrawerSettingVisible(false)} type="primary">
              Finish
            </Button>
          </Space>
        }
      >
        {setting}
      </Drawer>
    </PageContainer>
  );
};

export default TableList;
