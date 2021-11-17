import type { FC } from 'react';
import { useState, useRef } from 'react';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import {
  createProcess,
  deleteProcess,
  getProcessByPkid,
  getProcessGrid,
  updateProcess,
} from '@/services/process/api';
import type { Process } from '@/services/process/data';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Drawer, message, Modal, Space, Tooltip } from 'antd';
import type { ProFormInstance } from '@ant-design/pro-form';
import ProForm, { ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import {
  DeleteOutlined,
  ExclamationCircleOutlined,
  FormOutlined,
  OrderedListOutlined,
  PlusOutlined,
  ProfileOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import styles from './style.less';
import type { ListPagination } from '@/services/home/data';
import ParameterCard from '../setting/parameter';

type ListProps = {
  location: {
    query: {
      projectid: number;
    };
  };
};

const TableList: FC<ListProps> = (porps) => {
  const actionRef = useRef<ActionType>();
  const formRefCreate = useRef<ProFormInstance>();
  const formRefEdit = useRef<ProFormInstance>();
  const { projectid } = porps.location.query;
  const [drawerCreateVisible, handleDrawerCreateVisible] = useState(false);
  const [drawerEditVisible, handleDrawerEditVisible] = useState(false);
  const [drawerSettingVisible, handleDrawerSettingVisible] = useState(false);
  const [editForm, setEditForm] = useState<JSX.Element>();
  const [setting, setSetting] = useState<JSX.Element>();
  const [editPkid, setEditPkid] = useState<number>(0);
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
      title: 'Last Update',
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
      dataIndex: 'option',
      valueType: 'option',
      render: (_, row) => [
        <Tooltip title="View">
          <Button
            shape="circle"
            icon={<ProfileOutlined />}
            size="small"
            href={`/project/process/view?projectid=${row.projectId}&id=${row.id}`}
            target="_blank"
          />
        </Tooltip>,
        <Tooltip title="Edit">
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
  function onEdit(pkid: number) {
    handleDrawerEditVisible(true);
    setEditPkid(pkid);
    getProcessByPkid(pkid).then(async (pi) => {
      setEditForm(
        <ProForm
          formRef={formRefEdit}
          submitter={{
            render: () => {
              return [];
            },
          }}
          onFinish={async (values) => {
            updateProcess({ ...values, pkid: pi.pkid }).then(async (result) => {
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
          <ProFormText width="md" name="nation" label="Nation" />
          <ProFormText width="md" name="source" label="Source" />
          <ProFormText width="md" name="type" label="Type" />
          <ProFormTextArea width="md" name="comment" label="Comment" />
        </ProForm>,
      );
      formRefEdit.current?.setFieldsValue(pi);
    });
  }
  function onReset(pkid: number) {
    getProcessByPkid(pkid).then(async (result) => {
      formRefEdit.current?.setFieldsValue(result);
    });
  }
  function onDelete(pkid: number) {
    Modal.confirm({
      title: 'Do you Want to delete this flow?',
      icon: <ExclamationCircleOutlined />,
      content: '',
      onOk() {
        deleteProcess(pkid).then(async (result) => {
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
  function onSetting(projectId: number, processId: string) {
    handleDrawerSettingVisible(true);
    setSetting(<ParameterCard projectId={projectId} processId={processId} />);
  }
  return (
    <PageContainer>
      <ProTable<Process, ListPagination>
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
          return getProcessGrid(params, sort, projectid);
        }}
        columns={columns}
      />
      <Drawer
        title="Create"
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
            createProcess({ ...values, projectId: projectid }).then(async (result) => {
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
          <ProFormText width="md" name="nation" label="Nation" />
          <ProFormText width="md" name="source" label="Source" />
          <ProFormText width="md" name="type" label="Type" />
          <ProFormTextArea width="md" name="comment" label="Comment" />
        </ProForm>
      </Drawer>
      <Drawer
        title="Edit"
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
        {editForm}
      </Drawer>
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
