import { getPlanInfo, updatePlanInfo } from '@/services/plan/api';
import { Button, Descriptions, Drawer, message, Modal, Space, Tooltip } from 'antd';
import type { FC } from 'react';
import { useState, useRef } from 'react';
import type { Elements } from 'react-flow-renderer';
import { isNode, isEdge } from 'react-flow-renderer';
import type { ProFormInstance } from '@ant-design/pro-form';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import styles from '../index.less';
import { getProcess, updateProcess } from '@/services/process/api';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import {
  DeleteOutlined,
  ExclamationCircleOutlined,
  ProfileOutlined,
  SelectOutlined,
} from '@ant-design/icons';
import type { EdgeProcess } from '@/services/edgeprocess/data';
import { deleteEdgeProcess, getEdgeProcessGrid } from '@/services/edgeprocess/api';
import { getFlowProcess, getFlowProcessGrid } from '@/services/flowprocess/api';
import type { FlowProcess, FlowProcessListPagination } from '@/services/flowprocess/data';

type EditProps = {
  project: number;
  plan: string;
  selectedElements: Elements<any> | null;
};

let preid = '';

const Edit: FC<EditProps> = ({ project, plan, selectedElements }) => {
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [drawerViewVisible, handleDrawerViewVisible] = useState(false);
  const [drawerSelectVisible, handleDrawerSelectVisible] = useState<boolean>(false);
  const [drawerBody, setDrawerBody] = useState<JSX.Element>();
  const [viewDescriptions, setViewDescriptions] = useState<JSX.Element>();
  const [selectRowFlowProcess, setSelectRowFlowProcess] = useState<FlowProcess>();
  const formRefNode = useRef<ProFormInstance>();
  const actionRefEdge = useRef<ActionType>();
  const edgeColumns: ProColumns<EdgeProcess>[] = [
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
      dataIndex: 'pkid',
      sorter: true,
    },
    {
      title: 'Source Name',
      dataIndex: 'sourceFlowName',
      sorter: true,
      render: (_, row) => [
        <Space size={'small'} className={styles.footer_right}>
          <Tooltip title="View">
            <Button
              shape="circle"
              icon={<ProfileOutlined />}
              size="small"
              onClick={() => onViewFlowProcess(row.pkid)}
            />
          </Tooltip>
          <Tooltip title="Select">
            <Button
              shape="circle"
              icon={<SelectOutlined />}
              size="small"
              onClick={() => onSelectFlowProcess()}
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
      // render: (_, row) => [
      //   <Space size={'small'} className={styles.footer_right}>
      //     <Tooltip title="View">
      //       <Button
      //         shape="circle"
      //         icon={<ProfileOutlined />}
      //         size="small"
      //       // onClick={() => onView(row.pkid)}
      //       />
      //     </Tooltip>
      //     <Tooltip title="Edit">
      //       <Button
      //         shape="circle"
      //         icon={<FormOutlined />}
      //         size="small"
      //       // onClick={() => onEdit(row.pkid)}
      //       />
      //     </Tooltip>
      //   </Space>
      // ]
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
  const handleDrawerAddCancel = () => {
    setIsDrawerVisible(false);
  };
  const handleDrawerViewCancel = () => {
    handleDrawerViewVisible(false);
  };
  const handleDrawerSelectCancel = () => {
    handleDrawerSelectVisible(false);
  };
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
  function onViewFlowProcess(pkid: number) {
    handleDrawerViewVisible(true);
    getFlowProcess(pkid).then(async (result) => {
      setViewDescriptions(
        <Descriptions column={1}>
          <Descriptions.Item label="Comment">{result?.comment}</Descriptions.Item>
        </Descriptions>,
      );
    });
  }
  function onSelectFlowProcess() {
    handleDrawerSelectVisible(true);
  }
  function onSelectFlowProcessToEdgeProcess() {}
  const onSubmit = () => {
    formRefNode.current?.submit();
  };
  function setEditProForm(typeName: string) {
    if (typeName === 'plan') {
      getPlanInfo(project, preid).then(async (pi) => {
        setDrawerBody(
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
      getProcess(project, preid).then(async (pc) => {
        setDrawerBody(
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
  const onReset = () => {
    if (selectedElements) {
      if (preid === selectedElements[0].id) {
        if (isNode(selectedElements[0])) {
          setEditProForm(selectedElements[0].data?.type);
        }
      }
    }
  };
  const onEdit = () => {
    setIsDrawerVisible(true);
  };
  if (selectedElements) {
    if (isNode(selectedElements[0])) {
      if (isDrawerVisible) {
        if (preid !== selectedElements[0].id) {
          preid = selectedElements[0].id;
          setEditProForm(selectedElements[0].data?.type);
        }
      }
      return (
        <>
          <Button key="Edit" onClick={onEdit} block>
            Edit
          </Button>
          <Drawer
            visible={isDrawerVisible}
            maskClosable={false}
            title="Edit"
            width="400px"
            onClose={handleDrawerAddCancel}
            footer={
              <Space size={'middle'} className={styles.footer_right}>
                <Button onClick={onReset}>Reset</Button>
                <Button onClick={onSubmit} type="primary">
                  Submit
                </Button>
              </Space>
            }
          >
            {drawerBody}
          </Drawer>
        </>
      );
    }
    if (isEdge(selectedElements[0])) {
      const edge = selectedElements[0];
      if (isDrawerVisible) {
        if (preid !== edge.id) {
          preid = edge.id;
        }
      }
      return (
        <>
          <Button key="Edit" onClick={onEdit} block>
            Edit
          </Button>
          <Drawer
            visible={isDrawerVisible}
            maskClosable={false}
            title="Edit"
            width="600px"
            onClose={handleDrawerAddCancel}
          >
            <ProTable
              actionRef={actionRefEdge}
              search={false}
              pagination={false}
              columns={edgeColumns}
              request={(
                params: {
                  pageSize: number;
                  current: number;
                },
                sort,
              ) => {
                return getEdgeProcessGrid(params, sort, project, plan, edge.source, edge.target);
              }}
            />
          </Drawer>
          <Drawer
            title="View Flow"
            width="600px"
            maskClosable={true}
            visible={drawerViewVisible}
            onClose={handleDrawerViewCancel}
          >
            {viewDescriptions}
          </Drawer>
          <Drawer
            title="Select Flow"
            width="600px"
            maskClosable={true}
            visible={drawerSelectVisible}
            onClose={handleDrawerSelectCancel}
            footer={
              <Space size={'middle'} className={styles.footer_space}>
                <Button onClick={handleDrawerSelectCancel}>Cancel</Button>
                <Button onClick={onSelectFlowProcessToEdgeProcess} type="primary">
                  Select
                </Button>
              </Space>
            }
          >
            <ProTable<FlowProcess, FlowProcessListPagination>
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
                return getFlowProcessGrid(params, sort, project, edge.source, 'output');
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
