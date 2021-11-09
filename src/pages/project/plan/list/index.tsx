import type { FC } from 'react';
import { useState, useRef } from 'react';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { createPlan, getPlanInfoGrid } from '@/services/plan/api';
import type { PlanInfo, PlanListPagination } from '@/services/plan/data';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Drawer, message, Space, Tooltip } from 'antd';
import { ProFormInstance, ProFormTextArea } from '@ant-design/pro-form';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import {
  ApartmentOutlined,
  DeleteOutlined,
  FormOutlined,
  ProfileOutlined,
} from '@ant-design/icons';
import styles from './style.less';

type ListProps = {
  location: {
    query: {
      project: number;
    };
  };
};
const TableList: FC<ListProps> = (porps) => {
  const actionRef = useRef<ActionType>();
  const { project } = porps.location.query;
  const formRefCreate = useRef<ProFormInstance>();
  const columns: ProColumns<PlanInfo>[] = [
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
      title: 'Last Update',
      dataIndex: 'lastUpdateTime',
      valueType: 'dateTime',
      sorter: true,
      search: false,
    },
    {
      title: 'Option',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, row) => [
        <Tooltip title="Open model">
          <Button
            href={`/project/plan/editmodel?projectid=${row.projectId}&id=${row.id}`}
            target="_blank"
            shape="circle"
            icon={<ApartmentOutlined />}
            size="small"
          />
        </Tooltip>,
        // <Tooltip title="Open model">
        //   <Button href={`/project/plan/viewmodel?projectid=${row.projectId}&id=${row.id}`} target="_blank" shape="circle" icon={<ApartmentOutlined />} size="small" />
        // </Tooltip>,
        <Tooltip title="View info">
          <Button shape="circle" icon={<ProfileOutlined />} size="small" />
        </Tooltip>,
        <Tooltip title="Edit info">
          <Button shape="circle" icon={<FormOutlined />} size="small" />
        </Tooltip>,
        <Tooltip title="Delete">
          <Button shape="circle" icon={<DeleteOutlined />} size="small" />
        </Tooltip>,
      ],
    },
  ];
  const [drawerCreateVisible, handleDrawerCreateVisible] = useState<boolean>(false);
  const handleDrawerCreateCancel = () => {
    handleDrawerCreateVisible(false);
  };
  const onSubmitCreate = () => {
    formRefCreate.current?.submit();
  };
  return (
    <PageContainer>
      <ProTable<PlanInfo, PlanListPagination>
        actionRef={actionRef}
        search={{
          defaultCollapsed: false,
          optionRender: (searchConfig, formProps, dom) => [
            ...dom.reverse(),
            <Button
              key="create"
              onClick={() => {
                handleDrawerCreateVisible(true);
              }}
            >
              Create
            </Button>,
          ],
        }}
        request={(
          params: {
            pageSize: number;
            current: number;
          },
          sort,
        ) => {
          return getPlanInfoGrid(params, sort, project);
        }}
        columns={columns}
      />
      <Drawer
        title="Create Plan"
        width="400px"
        maskClosable={false}
        visible={drawerCreateVisible}
        onClose={handleDrawerCreateCancel}
        footer={
          <Space size={'middle'} className={styles.footer_right}>
            <Button onClick={handleDrawerCreateCancel}>Cancel</Button>
            <Button onClick={onSubmitCreate} type="primary">
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
            createPlan({ ...values, projectId: project }).then(async (result) => {
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

export default TableList;
