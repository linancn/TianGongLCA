import { getPlanInfo, updatePlanInfo } from '@/services/plan/api';
import { Button, Descriptions, Drawer, message, Modal, Space, Tooltip } from 'antd';
import type { FC } from 'react';
import { useState, useRef } from 'react';
import type { Elements } from 'react-flow-renderer';
import { isNode, isEdge } from 'react-flow-renderer';
import type { ProFormInstance } from '@ant-design/pro-form';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import styles from '../index.less';
import { getProcessById, updateProcess } from '@/services/process/api';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import {
  DeleteOutlined,
  ExclamationCircleOutlined,
  PlusOutlined,
  ProfileOutlined,
  SelectOutlined,
} from '@ant-design/icons';
import {
  createEdgeProcess,
  deleteEdgeProcess,
  updateEdgeProcess,
} from '@/services/edgeprocess/api';
import { getFlowProcessById, getFlowProcessGrid } from '@/services/flowprocess/api';
import type { FlowProcess } from '@/services/flowprocess/data';
import type { ListPagination } from '@/services/home/data';
import { getEdgeProcessFlowGrid } from '@/services/edgeprocessflow/api';
import type { EdgeProcessFlow } from '@/services/edgeprocessflow/data';

type EditProps = {
  projectId: number;
  planId: string;
  selectedElements: Elements<any> | null;
};

let preid = '';

const Edit: FC<EditProps> = ({ projectId, planId, selectedElements }) => {
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [drawerViewFlowProcessVisible, handleDrawerViewFlowProcessVisible] = useState(false);
  const [drawerSelectSourceVisible, handleDrawerSelectSourceVisible] = useState(false);
  const [drawerSelectTargetVisible, handleDrawerSelectTargetVisible] = useState(false);
  const [drawerBodyNode, setDrawerBodyNode] = useState<JSX.Element>();
  const [viewFlowProcessDescriptions, setViewFlowProcessDescriptions] = useState<JSX.Element>();
  const [selectRowFlowProcess, setSelectRowFlowProcess] = useState<FlowProcess>();
  const [editEdgeProcessPkid, setEditEdgeProcessPkid] = useState<number>();
  const formRefNode = useRef<ProFormInstance>();
  const actionRefEdge = useRef<ActionType>();
  const edgeColumns: ProColumns<EdgeProcessFlow>[] = [
    {
      title: '',
      render: (_, row) => [
        <Tooltip title="Delete">
          <Button
            shape="circle"
            icon={<DeleteOutlined />}
            size="small"
            onClick={() => onDeleteFlowProcess(row.pkid)}
          />
        </Tooltip>,
      ],
    },
    {
      title: 'ID',
      dataIndex: 'index',
      valueType: 'index',
      sorter: true,
    },
    {
      title: 'Source Name',
      dataIndex: 'sourceFlowName',
      sorter: true,
      render: (_, row) => [
        <Space size={'small'} className={styles.footer_left}>
          {row.sourceFlowName}
        </Space>,
        <Space size={'small'} className={styles.footer_right}>
          <Tooltip title="View">
            <Button
              shape="circle"
              icon={<ProfileOutlined />}
              size="small"
              onClick={() => onViewFlowProcess(row.sourceProcessId, row.sourceFlowId)}
            />
          </Tooltip>
          <Tooltip title="Select">
            <Button
              shape="circle"
              icon={<SelectOutlined />}
              size="small"
              onClick={() => onSelectSourceFlowProcess(row.pkid)}
            />
          </Tooltip>
        </Space>,
      ],
    },
    {
      title: '',
    },
    {
      title: 'Target Name',
      dataIndex: 'targetFlowName',
      sorter: true,
      render: (_, row) => [
        <Space size={'small'} className={styles.footer_left}>
          {row.targetFlowName}
        </Space>,
        <Space size={'small'} className={styles.footer_right}>
          <Tooltip title="View">
            <Button
              shape="circle"
              icon={<ProfileOutlined />}
              size="small"
              onClick={() => onViewFlowProcess(row.targetProcessId, row.targetFlowId)}
            />
          </Tooltip>
          <Tooltip title="Select">
            <Button
              shape="circle"
              icon={<SelectOutlined />}
              size="small"
              onClick={() => onSelectTargetFlowProcess(row.pkid)}
            />
          </Tooltip>
        </Space>,
      ],
    },
  ];
  const flowProcessColumns: ProColumns<FlowProcess>[] = [
    {
      title: 'ID',
      dataIndex: 'pkid',
      search: false,
    },
    {
      title: 'Comment',
      dataIndex: 'comment',
    },
  ];
  function onDeleteFlowProcess(pkid: number) {
    Modal.confirm({
      title: 'Do you Want to delete this flow connection?',
      icon: <ExclamationCircleOutlined />,
      content: '',
      onOk() {
        deleteEdgeProcess(pkid).then(async (result) => {
          if (result === 'ok') {
            message.success('Delete successfully!');
            actionRefEdge.current?.reload();
          } else {
            message.error(result);
          }
        });
      },
      onCancel() {},
    });
  }
  function onViewFlowProcess(processId: string, id: string) {
    handleDrawerViewFlowProcessVisible(true);
    getFlowProcessById(projectId, processId, id).then(async (result) => {
      setViewFlowProcessDescriptions(
        <Descriptions column={1}>
          <Descriptions.Item label="Comment">{result?.comment}</Descriptions.Item>
        </Descriptions>,
      );
    });
  }
  function onSelectSourceFlowProcess(pkid: number) {
    setEditEdgeProcessPkid(pkid);
    handleDrawerSelectSourceVisible(true);
  }
  function onSelectTargetFlowProcess(pkid: number) {
    setEditEdgeProcessPkid(pkid);
    handleDrawerSelectTargetVisible(true);
  }
  function onSelectFlowProcessToEdgeProcess(
    pkid: number | undefined,
    id: string | undefined,
    st: string,
  ) {
    if (st === 'source') {
      updateEdgeProcess({ pkid, sourceFlowId: id }).then((result) => {
        if (result === 'ok') {
          handleDrawerSelectSourceVisible(false);
          actionRefEdge.current?.reload();
        } else {
          message.error(result);
        }
      });
      return true;
    }
    if (st === 'target') {
      updateEdgeProcess({ pkid, targetFlowId: id }).then((result) => {
        if (result === 'ok') {
          handleDrawerSelectTargetVisible(false);
          actionRefEdge.current?.reload();
        } else {
          message.error(result);
        }
      });
      return true;
    }
    return true;
  }
  function setEditProFormNode(typeName: string) {
    if (typeName === 'plan') {
      getPlanInfo(projectId, preid).then(async (pi) => {
        setDrawerBodyNode(
          <ProForm
            formRef={formRefNode}
            submitter={{
              render: () => {
                return [];
              },
            }}
            onFinish={async (values) => {
              updatePlanInfo({ ...values, pkid: pi.pkid }).then(async (result) => {
                if (result === 'ok') {
                  message.success('Edit successfully!');
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
            <ProFormText width="md" name="comment" label="Comment" />
          </ProForm>,
        );
        formRefNode.current?.setFieldsValue(pi);
      });
    } else if (typeName === 'process') {
      getProcessById(projectId, preid).then(async (pc) => {
        setDrawerBodyNode(
          <ProForm
            formRef={formRefNode}
            submitter={{
              render: () => {
                return [];
              },
            }}
            onFinish={async (values) => {
              updateProcess({ ...values, pkid: pc.pkid }).then(async (result) => {
                if (result === 'ok') {
                  message.success('Edit successfully!');
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
            <ProFormText width="md" name="comment" label="Comment" />
          </ProForm>,
        );
        formRefNode.current?.setFieldsValue(pc);
      });
    }
  }
  if (selectedElements) {
    const selectedElement = selectedElements[0];
    if (isNode(selectedElement)) {
      if (isDrawerVisible) {
        if (preid !== selectedElement.id) {
          preid = selectedElement.id;
          setEditProFormNode(selectedElement.data?.type);
        }
      }
      return (
        <>
          <Button key="Edit" onClick={() => setIsDrawerVisible(true)} block>
            Edit
          </Button>
          <Drawer
            visible={isDrawerVisible}
            maskClosable={false}
            title="Edit"
            width="400px"
            onClose={() => setIsDrawerVisible(false)}
            footer={
              <Space size={'middle'} className={styles.footer_right}>
                <Button
                  onClick={() => {
                    if (selectedElements) {
                      if (preid === selectedElement.id) {
                        if (isNode(selectedElement)) {
                          setEditProFormNode(selectedElement.data?.type);
                        }
                      }
                    }
                  }}
                >
                  Reset
                </Button>
                <Button onClick={() => formRefNode.current?.submit()} type="primary">
                  Submit
                </Button>
              </Space>
            }
          >
            {drawerBodyNode}
          </Drawer>
        </>
      );
    }
    if (isEdge(selectedElement)) {
      if (isDrawerVisible) {
        if (preid !== selectedElement.id) {
          preid = selectedElement.id;
        }
      }
      return (
        <>
          <Button key="Edit" onClick={() => setIsDrawerVisible(true)} block>
            Edit
          </Button>
          <Drawer
            visible={isDrawerVisible}
            maskClosable={false}
            title="Edit"
            width="750px"
            onClose={() => setIsDrawerVisible(false)}
          >
            <ProTable
              actionRef={actionRefEdge}
              search={false}
              pagination={false}
              columns={edgeColumns}
              toolBarRender={() => [
                <Tooltip title="Add">
                  <Button
                    size={'middle'}
                    type="text"
                    icon={<PlusOutlined />}
                    onClick={() => {
                      createEdgeProcess({
                        projectId,
                        planId,
                        sourceProcessId: selectedElement.source,
                        targetProcessId: selectedElement.target,
                      }).then(() => {
                        actionRefEdge.current?.reload();
                      });
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
                return getEdgeProcessFlowGrid(
                  params,
                  sort,
                  projectId,
                  planId,
                  selectedElement.source,
                  selectedElement.target,
                );
              }}
            />
          </Drawer>
          <Drawer
            title="View Flow"
            width="400px"
            maskClosable={true}
            visible={drawerViewFlowProcessVisible}
            onClose={() => handleDrawerViewFlowProcessVisible(false)}
          >
            {viewFlowProcessDescriptions}
          </Drawer>
          <Drawer
            title="Select Source Flow"
            width="750px"
            maskClosable={true}
            visible={drawerSelectSourceVisible}
            onClose={() => handleDrawerSelectSourceVisible(false)}
            footer={
              <Space size={'middle'} className={styles.footer_right}>
                <Button onClick={() => handleDrawerSelectSourceVisible(false)}>Cancel</Button>
                <Button
                  onClick={() =>
                    onSelectFlowProcessToEdgeProcess(
                      editEdgeProcessPkid,
                      selectRowFlowProcess?.id,
                      'source',
                    )
                  }
                  type="primary"
                >
                  Select
                </Button>
              </Space>
            }
          >
            <ProTable<FlowProcess, ListPagination>
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
                return getFlowProcessGrid(
                  params,
                  sort,
                  projectId,
                  selectedElement.source,
                  'output',
                );
              }}
              columns={flowProcessColumns}
              rowClassName={(record) => {
                return record.pkid === selectRowFlowProcess?.pkid
                  ? styles['split-row-select-active']
                  : '';
              }}
              onRow={(record) => {
                return {
                  onClick: () => {
                    if (record) {
                      setSelectRowFlowProcess(record);
                    }
                  },
                };
              }}
            />
          </Drawer>
          <Drawer
            title="Select Target Flow"
            width="750px"
            maskClosable={true}
            visible={drawerSelectTargetVisible}
            onClose={() => handleDrawerSelectTargetVisible(false)}
            footer={
              <Space size={'middle'} className={styles.footer_right}>
                <Button onClick={() => handleDrawerSelectTargetVisible(false)}>Cancel</Button>
                <Button
                  onClick={() =>
                    onSelectFlowProcessToEdgeProcess(
                      editEdgeProcessPkid,
                      selectRowFlowProcess?.id,
                      'target',
                    )
                  }
                  type="primary"
                >
                  Select
                </Button>
              </Space>
            }
          >
            <ProTable<FlowProcess, ListPagination>
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
                return getFlowProcessGrid(params, sort, projectId, selectedElement.target, 'input');
              }}
              columns={flowProcessColumns}
              rowClassName={(record) => {
                return record.pkid === selectRowFlowProcess?.pkid
                  ? styles['split-row-select-active']
                  : '';
              }}
              onRow={(record) => {
                return {
                  onClick: () => {
                    if (record) {
                      setSelectRowFlowProcess(record);
                    }
                  },
                };
              }}
            />
          </Drawer>
        </>
      );
    }
  }
  preid = '';
  return (
    <Button key="Edit" block disabled={true}>
      Edit
    </Button>
  );
};
export default Edit;
