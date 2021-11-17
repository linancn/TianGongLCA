import type { FC } from 'react';
import { useState, useRef } from 'react';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import {
  createPlan,
  deletePlan,
  getPlanInfoByPkid,
  getPlanInfoGrid,
  updatePlanInfo,
} from '@/services/plan/api';
import type { PlanInfo } from '@/services/plan/data';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Descriptions, Drawer, message, Modal, Space, Tooltip } from 'antd';
import type { ProFormInstance } from '@ant-design/pro-form';
import { ProFormTextArea } from '@ant-design/pro-form';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import {
  ApartmentOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
  FormOutlined,
  PlusOutlined,
  ProfileOutlined,
} from '@ant-design/icons';
import styles from './style.less';
import moment from 'moment';
import type { ListPagination } from '@/services/home/data';

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
  const formRefEdit = useRef<ProFormInstance>();
  const [viewDescriptions, setViewDescriptions] = useState<JSX.Element>();
  const [editDescriptions, setEditDescriptions] = useState<JSX.Element>();
  const [drawerCreateVisible, handleDrawerCreateVisible] = useState(false);
  const [drawerViewVisible, handleDrawerViewVisible] = useState(false);
  const [drawerEditVisible, handleDrawerEditVisible] = useState(false);
  const [editPkid, setEditPkid] = useState<number>(0);
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
          <Button
            shape="circle"
            icon={<ProfileOutlined />}
            size="small"
            onClick={() => onView(row.pkid)}
          />
        </Tooltip>,
        <Tooltip title="Edit info">
          <Button
            shape="circle"
            icon={<FormOutlined />}
            size="small"
            onClick={() => onEdit(row.pkid)}
          />
        </Tooltip>,
        <Tooltip title="Delete">
          <Button
            shape="circle"
            icon={<DeleteOutlined />}
            size="small"
            onClick={() => onDelete(row.pkid)}
          />
        </Tooltip>,
      ],
    },
  ];
  function onDelete(pkid: number) {
    Modal.confirm({
      title: 'Do you Want to delete this plan?',
      icon: <ExclamationCircleOutlined />,
      content: '',
      onOk() {
        deletePlan(pkid).then(async (result) => {
          if (result === 'ok') {
            message.success('Delete successfully!');
            if (actionRef.current) {
              actionRef.current.reload();
            }
          } else {
            message.error(result);
          }
        });
      },
      onCancel() {},
    });
  }
  function onView(pkid: number) {
    handleDrawerViewVisible(true);
    getPlanInfoByPkid(pkid).then(async (result) => {
      setViewDescriptions(
        <Descriptions column={1}>
          <Descriptions.Item label="Name">{result?.name}</Descriptions.Item>
          <Descriptions.Item label="Type">{result?.type}</Descriptions.Item>
          <Descriptions.Item label="Nation">{result?.nation}</Descriptions.Item>
          <Descriptions.Item label="Last Update">
            {moment(result?.lastUpdateTime).format('YYYY-MM-DD HH:mm:ss')}
          </Descriptions.Item>
          <Descriptions.Item label="Comment">{result?.comment}</Descriptions.Item>
        </Descriptions>,
      );
    });
  }
  function onEdit(pkid: number) {
    handleDrawerEditVisible(true);
    setEditPkid(pkid);
    getPlanInfoByPkid(pkid).then(async (pi) => {
      setEditDescriptions(
        <ProForm
          formRef={formRefEdit}
          submitter={{
            render: () => {
              return [];
            },
          }}
          onFinish={async (values) => {
            updatePlanInfo({ ...values, pkid: pi.pkid }).then(async (result) => {
              if (result === 'ok') {
                message.success('Edit successfully!');
                handleDrawerEditVisible(false);
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
        </ProForm>,
      );
      formRefEdit.current?.setFieldsValue(pi);
    });
  }
  function onReset(pkid: number) {
    getPlanInfoByPkid(pkid).then(async (pi) => {
      formRefEdit.current?.setFieldsValue(pi);
    });
  }

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
      <Drawer
        title="View Plan"
        width="400px"
        maskClosable={true}
        visible={drawerViewVisible}
        onClose={() => handleDrawerViewVisible(false)}
      >
        {viewDescriptions}
      </Drawer>
      <Drawer
        title="Edit Plan"
        width="400px"
        maskClosable={false}
        visible={drawerEditVisible}
        onClose={() => handleDrawerEditVisible(false)}
        footer={
          <Space size={'middle'} className={styles.footer_right}>
            <Button onClick={() => handleDrawerEditVisible(false)}>Cancel</Button>
            <Button onClick={() => onReset(editPkid)}>Reset</Button>
            <Button onClick={() => formRefEdit.current?.submit()} type="primary">
              Submit
            </Button>
          </Space>
        }
      >
        {editDescriptions}
      </Drawer>
    </PageContainer>
  );
};

export default PlanList;
