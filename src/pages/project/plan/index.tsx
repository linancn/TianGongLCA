import type { FC } from 'react';
import { useState, useRef } from 'react';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { createPlan, getPlanInfoGrid } from '@/services/plan/api';
import type { PlanInfo } from '@/services/plan/data';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Drawer, message, Space, Tooltip } from 'antd';
import type { ProFormInstance } from '@ant-design/pro-form';
import { ProFormTextArea } from '@ant-design/pro-form';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import { PlusOutlined } from '@ant-design/icons';
import styles from '@/style/custom.less';
import type { ListPagination } from '@/services/home/data';
import PlanDelete from './components/delete';
import PlanView from './components/view';
import PlanEdit from './components/edit';
import PlanOpen from './components/open';

type ListProps = {
  location: {
    query: {
      projectid: number;
    };
  };
};
const PlanList: FC<ListProps> = (porps) => {
  const actionRef = useRef<ActionType>();
  const { projectid } = porps.location.query;
  const formRefCreate = useRef<ProFormInstance>();
  const [drawerCreateVisible, handleDrawerCreateVisible] = useState(false);
  const columns: ProColumns<PlanInfo>[] = [
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
      title: 'Type',
      dataIndex: 'type',
      sorter: true,
    },
    {
      title: 'Nation',
      dataIndex: 'nation',
      sorter: true,
    },
    {
      title: 'Comment',
      dataIndex: 'comment',
      valueType: 'textarea',
      search: false,
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
      title: 'Option',
      search: false,
      render: (_, row) => [
        <Space size={'small'}>
          <PlanOpen projectId={row.projectId} id={row.id} />
          <PlanView pkid={row.pkid} />
          <PlanEdit pkid={row.pkid} actionRef={actionRef} />
          <PlanDelete pkid={row.pkid} actionRef={actionRef} />
        </Space>,
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable<PlanInfo, ListPagination>
        actionRef={actionRef}
        search={{
          defaultCollapsed: false,
        }}
        toolBarRender={() => [
          <Tooltip title="Create">
            <Button
              size={'middle'}
              type="text"
              icon={<PlusOutlined />}
              onClick={() => {
                handleDrawerCreateVisible(true);
              }}
            />
          </Tooltip>,
        ]}
        request={(
          params: {
            pageSize: number;
            current: number;
          },
          sort,
        ) => {
          return getPlanInfoGrid(params, sort, projectid);
        }}
        columns={columns}
      />
      <Drawer
        title="Create Plan"
        width="400px"
        maskClosable={false}
        visible={drawerCreateVisible}
        onClose={() => handleDrawerCreateVisible(false)}
        footer={
          <Space size={'middle'} className={styles.footer_right}>
            <Button onClick={() => handleDrawerCreateVisible(false)}>Cancel</Button>
            <Button onClick={() => formRefCreate.current?.submit()} type="primary">
              Submit
            </Button>
          </Space>
        }
      >
        <ProForm
          formRef={formRefCreate}
          submitter={{
            render: () => {
              return [];
            },
          }}
          onFinish={async (values) => {
            createPlan({ ...values, projectId: projectid }).then(async (result) => {
              if (result === 'ok') {
                message.success('Create successfully!');
                handleDrawerCreateVisible(false);
                if (actionRef.current) {
                  actionRef.current.reload();
                }
              } else {
                message.error(result);
              }
            });
            return true;
          }}
        >
          <ProFormText width="md" name="name" label="Name" />
          <ProFormText width="md" name="type" label="Type" />
          <ProFormText width="md" name="nation" label="Nation" />
          <ProFormTextArea width="md" name="comment" label="Comment" />
        </ProForm>
      </Drawer>
    </PageContainer>
  );
};

export default PlanList;
