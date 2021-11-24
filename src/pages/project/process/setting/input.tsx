import type { FC } from 'react';
import { useRef, useState } from 'react';
import ProCard from '@ant-design/pro-card';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { Button, Descriptions, Divider, Drawer, message, Modal, Space, Tooltip } from 'antd';
import type { ListPagination } from '@/services/home/data';
import type { ProFormInstance } from '@ant-design/pro-form';
import ProForm, { ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import {
  DeleteOutlined,
  ExclamationCircleOutlined,
  FormOutlined,
  PlusOutlined,
  ProfileOutlined,
  SelectOutlined,
} from '@ant-design/icons';
// import moment from 'moment';
import styles from '@/style/custom.less';
import {
  createFlowProcess,
  deleteFlowProcess,
  getFlowProcessByPkid,
  updateFlowProcess,
} from '@/services/flowprocess/api';
import type { FlowBase } from '@/services/flowbase/data';
import { getFlowBaseGrid } from '@/services/flowbase/api';
import { getFlowProcessBaseByPkid, getFlowProcessBaseGrid } from '@/services/flowprocessbase/api';
import type { FlowProcessBase } from '@/services/flowprocessbase/data';
import type { Parameter } from '@/services/parameter/data';
import { getParameterGrid } from '@/services/parameter/api';

type InputProps = {
  projectId: number;
  processId: string;
};

const InputCard: FC<InputProps> = ({ projectId, processId }) => {
  const actionRef = useRef<ActionType>();
  const formRefCreate = useRef<ProFormInstance>();
  const formRefEdit = useRef<ProFormInstance>();
  const formRefCreateFlowBase = useRef<ProFormInstance>();
  const [viewDescriptions, setViewDescriptions] = useState<JSX.Element>();
  const [editForm, setEditForm] = useState<JSX.Element>();
  const [drawerCreateVisible, handleDrawerCreateVisible] = useState(false);
  const [drawerViewVisible, handleDrawerViewVisible] = useState(false);
  const [drawerEditVisible, handleDrawerEditVisible] = useState(false);
  const [drawerSelectCreateVisible, handleDrawerSelectCreateVisible] = useState(false);
  const [drawerSelectEditVisible, handleDrawerSelectEditVisible] = useState(false);
  const [drawerSelectParameterVisible, handleDrawerSelectParameterVisible] = useState(false);
  const [selectRowFlowBase, setSelectRowFlowBase] = useState<FlowBase>();
  const [selectRowParameter, setSelectRowParameter] = useState<Parameter>();
  const [editFlowPkid, setEditFlowPkid] = useState<number>();
  const [editPkid, setEditPkid] = useState<number>(0);
  const columns: ProColumns<FlowProcessBase>[] = [
    {
      title: 'ID',
      dataIndex: 'index',
      valueType: 'index',
      search: false,
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      search: false,
    },
    {
      title: 'SD',
      dataIndex: 'sd',
      search: false,
    },
    {
      title: 'Factor',
      dataIndex: 'factor',
      search: false,
    },
    {
      title: 'Name',
      dataIndex: 'name',
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
      title: 'Parameter',
      dataIndex: 'parameterName',
      sorter: true,
      render: (_, row) => [
        <Space size={'small'} className={styles.footer_left}>
          {row.parameterName}
        </Space>,
        <Space size={'small'} className={styles.footer_right}>
          <Tooltip title="View">
            <Button
              shape="circle"
              icon={<ProfileOutlined />}
              size="small"
              // onClick={() => onViewParameter(row.pkid)}
            />
          </Tooltip>
          <Tooltip title="Select">
            <Button
              shape="circle"
              icon={<SelectOutlined />}
              size="small"
              onClick={() => onSelectParameter(row.pkid)}
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
  const flowBaseColumns: ProColumns<FlowBase>[] = [
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
      search: false,
    },
    {
      title: 'Source',
      dataIndex: 'Source',
      search: false,
    },
    {
      title: 'Type',
      dataIndex: 'type',
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
  ];
  const parameterColumns: ProColumns<Parameter>[] = [
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
  ];
  function onDelete(pkid: number) {
    Modal.confirm({
      title: 'Do you want to delete this flow?',
      icon: <ExclamationCircleOutlined />,
      content: '',
      onOk() {
        deleteFlowProcess(pkid).then(async (result) => {
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
    getFlowProcessBaseByPkid(pkid).then(async (result) => {
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
    getFlowProcessBaseByPkid(pkid).then(async (pi) => {
      setEditForm(
        <ProForm
          formRef={formRefEdit}
          submitter={{
            render: () => {
              return [];
            },
          }}
          onFinish={async (values) => {
            updateFlowProcess({ ...values, pkid: pi.pkid }).then(async (result) => {
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
          <ProFormText width="md" name="amount" label="Amount" />
          <ProFormText width="md" name="sd" label="SD" />
          <ProFormText width="md" name="factor" label="Factor" />
          <ProFormText width="md" name="flowBaseId" label="FlowBaseId" hidden={true} />
          <Divider>
            Flow Base Info{' '}
            <Tooltip title="Select">
              <Button
                shape="circle"
                size="small"
                icon={<SelectOutlined />}
                onClick={() => {
                  handleDrawerSelectEditVisible(true);
                }}
              />
            </Tooltip>
          </Divider>
          <ProFormText width="md" name="name" label="Name" disabled={true} />
          <ProFormText width="md" name="nation" label="Nation" disabled={true} />
          <ProFormText width="md" name="source" label="Source" disabled={true} />
          <ProFormText width="md" name="type" label="Type" disabled={true} />
          <ProFormTextArea width="md" name="comment" label="Comment" disabled={true} />
        </ProForm>,
      );
      formRefEdit.current?.setFieldsValue(pi);
    });
  }
  function onReset(pkid: number) {
    getFlowProcessByPkid(pkid).then(async (result) => {
      formRefEdit.current?.setFieldsValue(result);
    });
  }
  function onSelectParameter(pkid: number) {
    setEditFlowPkid(pkid);
    handleDrawerSelectParameterVisible(true);
  }
  function onSelectParameterToFlow(pkid: number | undefined, parameterId: string | undefined) {
    updateFlowProcess({ pkid, parameterId }).then((result) => {
      if (result === 'ok') {
        handleDrawerSelectParameterVisible(false);
        actionRef.current?.reload();
      } else {
        message.error(result);
      }
    });
    return true;
  }
  actionRef.current?.reload();
  return (
    <ProCard title="Input Flows" bordered={false} collapsible>
      <ProTable<FlowProcessBase, ListPagination>
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
          return getFlowProcessBaseGrid(params, sort, projectId, processId, 'input');
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
            createFlowProcess({ ...values, projectId, processId }).then(async (result) => {
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
        {editForm}
      </Drawer>
      <Drawer
        title="Create Input Flow"
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
            createFlowProcess({
              ...values,
              projectId,
              processId,
              ioType: 'input',
            }).then(async (result) => {
              if (result === 'ok') {
                message.success('Create successfully!');
                handleDrawerCreateVisible(false);
                actionRef.current?.reload();
              } else {
                message.error(result);
              }
            });
            return true;
          }}
        >
          <ProFormText width="md" name="amount" label="Amount" />
          <ProFormText width="md" name="sd" label="SD" />
          <ProFormText width="md" name="factor" label="Factor" />
          <ProFormText width="md" name="flowBaseId" label="FlowBaseId" hidden={true} />
        </ProForm>
        <Divider>
          Flow Base Info{' '}
          <Tooltip title="Select">
            <Button
              shape="circle"
              size="small"
              icon={<SelectOutlined />}
              onClick={() => {
                handleDrawerSelectCreateVisible(true);
              }}
            />
          </Tooltip>
        </Divider>
        <ProForm
          formRef={formRefCreateFlowBase}
          submitter={{
            render: () => {
              return [];
            },
          }}
        >
          <ProFormText width="md" name="name" label="Name" disabled={true} />
          <ProFormText width="md" name="nation" label="Nation" disabled={true} />
          <ProFormText width="md" name="source" label="Source" disabled={true} />
          <ProFormText width="md" name="type" label="Type" disabled={true} />
          <ProFormTextArea width="md" name="comment" label="Comment" disabled={true} />
        </ProForm>
      </Drawer>
      <Drawer
        title="Select Flow Base Info"
        width="100%"
        maskClosable={true}
        visible={drawerSelectCreateVisible}
        onClose={() => handleDrawerSelectCreateVisible(false)}
        footer={
          <Space size={'middle'} className={styles.footer_right}>
            <Button onClick={() => handleDrawerSelectCreateVisible(false)}>Cancel</Button>
            <Button
              onClick={() => {
                if (selectRowFlowBase) {
                  formRefCreateFlowBase.current?.setFieldsValue(selectRowFlowBase);
                  formRefCreate.current?.setFieldsValue({
                    flowBaseId: selectRowFlowBase.id,
                  });
                  handleDrawerSelectCreateVisible(false);
                } else {
                  message.error('Select nothing');
                }
              }}
              type="primary"
            >
              Select
            </Button>
          </Space>
        }
      >
        <ProTable<FlowBase, ListPagination>
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
            return getFlowBaseGrid(params, sort, projectId);
          }}
          columns={flowBaseColumns}
          rowClassName={(record) => {
            return record.pkid === selectRowFlowBase?.pkid ? styles['split-row-select-active'] : '';
          }}
          onRow={(record) => {
            return {
              onClick: () => {
                if (record) {
                  setSelectRowFlowBase(record);
                }
              },
            };
          }}
        />
      </Drawer>
      <Drawer
        title="Edit Input Flow"
        width="400px"
        maskClosable={false}
        visible={drawerEditVisible}
        onClose={() => handleDrawerEditVisible(false)}
        footer={
          <Space size={'middle'} className={styles.footer_right}>
            <Button onClick={() => handleDrawerEditVisible(false)}>Cancel</Button>
            <Button onClick={() => formRefEdit.current?.submit()} type="primary">
              Submit
            </Button>
          </Space>
        }
      >
        {editForm}
      </Drawer>
      <Drawer
        title="Select Flow Base Info"
        width="100%"
        maskClosable={true}
        visible={drawerSelectEditVisible}
        onClose={() => handleDrawerSelectEditVisible(false)}
        footer={
          <Space size={'middle'} className={styles.footer_right}>
            <Button onClick={() => handleDrawerSelectEditVisible(false)}>Cancel</Button>
            <Button
              onClick={() => {
                if (selectRowFlowBase) {
                  formRefEdit.current?.setFieldsValue({
                    flowBaseId: selectRowFlowBase.id,
                    name: selectRowFlowBase.name,
                    nation: selectRowFlowBase.nation,
                    source: selectRowFlowBase.source,
                    type: selectRowFlowBase.type,
                    comment: selectRowFlowBase.comment,
                  });
                  handleDrawerSelectEditVisible(false);
                } else {
                  message.error('Select nothing');
                }
              }}
              type="primary"
            >
              Select
            </Button>
          </Space>
        }
      >
        <ProTable<FlowBase, ListPagination>
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
            return getFlowBaseGrid(params, sort, projectId);
          }}
          columns={flowBaseColumns}
          rowClassName={(record) => {
            return record.pkid === selectRowFlowBase?.pkid ? styles['split-row-select-active'] : '';
          }}
          onRow={(record) => {
            return {
              onClick: () => {
                if (record) {
                  setSelectRowFlowBase(record);
                }
              },
            };
          }}
        />
      </Drawer>
      <Drawer
        title="Select Parameter"
        width="750px"
        maskClosable={true}
        visible={drawerSelectParameterVisible}
        onClose={() => handleDrawerSelectParameterVisible(false)}
        footer={
          <Space size={'middle'} className={styles.footer_right}>
            <Button onClick={() => handleDrawerSelectParameterVisible(false)}>Cancel</Button>
            <Button
              onClick={() => onSelectParameterToFlow(editFlowPkid, selectRowParameter?.id)}
              type="primary"
            >
              Select
            </Button>
          </Space>
        }
      >
        <ProTable<Parameter, ListPagination>
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
            return getParameterGrid(params, sort, projectId, processId);
          }}
          columns={parameterColumns}
          rowClassName={(record) => {
            return record.pkid === selectRowParameter?.pkid
              ? styles['split-row-select-active']
              : '';
          }}
          onRow={(record) => {
            return {
              onClick: () => {
                if (record) {
                  setSelectRowParameter(record);
                }
              },
            };
          }}
        />
      </Drawer>
    </ProCard>
  );
};
export default InputCard;
