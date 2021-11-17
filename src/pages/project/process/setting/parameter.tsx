import type { FC } from 'react';
import { useRef, useState } from 'react';
import ProCard from '@ant-design/pro-card';
import type { Parameter } from '@/services/parameter/data';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import {
  createParameter,
  deleteParameter,
  getParameterByPkid,
  getParameterGrid,
  updateParameter,
} from '@/services/parameter/api';
import { Button, Descriptions, Drawer, message, Modal, Space, Tooltip } from 'antd';
import type { ListPagination } from '@/services/home/data';
import type { ProFormInstance } from '@ant-design/pro-form';
import ProForm, { ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import {
  DeleteOutlined,
  ExclamationCircleOutlined,
  FormOutlined,
  PlusOutlined,
  ProfileOutlined,
} from '@ant-design/icons';
// import moment from 'moment';
import styles from '../list/style.less';

type ParameterProps = {
  projectId: number;
  processId: string;
};

const ParameterCard: FC<ParameterProps> = ({ projectId, processId }) => {
  const actionRef = useRef<ActionType>();
  const formRefCreate = useRef<ProFormInstance>();
  const formRefEdit = useRef<ProFormInstance>();
  const [viewDescriptions, setViewDescriptions] = useState<JSX.Element>();
  const [editDescriptions, setEditDescriptions] = useState<JSX.Element>();
  const [drawerCreateVisible, handleDrawerCreateVisible] = useState(false);
  const [drawerViewVisible, handleDrawerViewVisible] = useState(false);
  const [drawerEditVisible, handleDrawerEditVisible] = useState(false);
  const [editPkid, setEditPkid] = useState<number>(0);
  const columns: ProColumns<Parameter>[] = [
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
      title: 'Formula',
      dataIndex: 'formula',
      search: false,
    },
    {
      title: 'Value',
      dataIndex: 'value',
      search: false,
    },
    {
      title: 'Min',
      dataIndex: 'min',
      search: false,
    },
    {
      title: 'Max',
      dataIndex: 'max',
      search: false,
    },
    {
      title: 'SD',
      dataIndex: 'sd',
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
      dataIndex: 'option',
      valueType: 'option',
      render: (_, row) => [
        <Tooltip title="View">
          <Button
            shape="circle"
            icon={<ProfileOutlined />}
            size="small"
            onClick={() => onView(row.pkid)}
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
  function onDelete(pkid: number) {
    Modal.confirm({
      title: 'Do you want to delete this parameter?',
      icon: <ExclamationCircleOutlined />,
      content: '',
      onOk() {
        deleteParameter(pkid).then(async (result) => {
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
    getParameterByPkid(pkid).then(async (result) => {
      setViewDescriptions(
        <Descriptions column={1}>
          <Descriptions.Item label="Name">{result?.name}</Descriptions.Item>
          {/* <Descriptions.Item label="Unit">{result?.unit}</Descriptions.Item>
          <Descriptions.Item label="Creator">{result?.creator}</Descriptions.Item>
          <Descriptions.Item label="Create Time">
            {moment(result?.createTime).format('YYYY-MM-DD HH:mm:ss')}
          </Descriptions.Item>
          <Descriptions.Item label="Last Update Time">
            {moment(result?.lastUpdateTime).format('YYYY-MM-DD HH:mm:ss')}
          </Descriptions.Item>
          <Descriptions.Item label="Comment">{result?.comment}</Descriptions.Item>
          <Descriptions.Item label="Version">{result?.version}</Descriptions.Item> */}
        </Descriptions>,
      );
    });
  }
  function onEdit(pkid: number) {
    handleDrawerEditVisible(true);
    setEditPkid(pkid);
    getParameterByPkid(pkid).then(async (pi) => {
      setEditDescriptions(
        <ProForm
          formRef={formRefEdit}
          submitter={{
            render: () => {
              return [];
            },
          }}
          onFinish={async (values) => {
            updateParameter({ ...values, pkid: pi.pkid }).then(async (result) => {
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
          <ProFormText width="md" name="formula" label="Formula" />
          <ProFormText width="md" name="value" label="Value" />
          <ProFormText width="md" name="min" label="Min" />
          <ProFormText width="md" name="max" label="Max" />
          <ProFormText width="md" name="sd" label="SD" />
          <ProFormTextArea width="md" name="comment" label="Comment" />
        </ProForm>,
      );
      formRefEdit.current?.setFieldsValue(pi);
    });
  }
  function onReset(pkid: number) {
    getParameterByPkid(pkid).then(async (result) => {
      formRefEdit.current?.setFieldsValue(result);
    });
  }
  return (
    <ProCard title="Parameters" bordered={false} collapsible>
      <ProTable<Parameter, ListPagination>
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
          return getParameterGrid(params, sort, projectId, processId);
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
            createParameter({ ...values, projectId, processId }).then(async (result) => {
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
          <ProFormText width="md" name="formula" label="Formula" />
          <ProFormText width="md" name="value" label="Value" />
          <ProFormText width="md" name="min" label="Min" />
          <ProFormText width="md" name="max" label="Max" />
          <ProFormText width="md" name="sd" label="SD" />
          <ProFormTextArea width="md" name="comment" label="Comment" />
        </ProForm>
      </Drawer>
      <Drawer
        title="View"
        width="400px"
        maskClosable={true}
        visible={drawerViewVisible}
        onClose={() => handleDrawerViewVisible(false)}
      >
        {viewDescriptions}
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
        {editDescriptions}
      </Drawer>
    </ProCard>
  );
};
export default ParameterCard;
