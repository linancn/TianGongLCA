import type { Dispatch, FC } from 'react';
import React, { useState, useCallback } from 'react';
import { Button, Drawer, Space } from 'antd';
import { getPlanGrid } from '@/services/plan/api';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { PlanInfo } from '@/services/plan/data';
import type { Process } from '@/services/process/data';
import { getProcessGrid } from '@/services/process/api';
import type { ListPagination } from '@/services/home/data';
import type { IApplication, NsNodeCmd } from '@antv/xflow';
import { XFlowNodeCommands } from '@antv/xflow';
import { NodeAttrs, NodePorts } from './config/node';
import styles from '@/style/custom.less';
import { CloseOutlined } from '@ant-design/icons';
import { FormattedMessage } from 'umi';

type Props = {
  xflowApp: IApplication | undefined;
  projectId: number;
  drawerVisible: boolean;
  setDrawerVisible: Dispatch<React.SetStateAction<boolean>>;
};

const Add: FC<Props> = ({ xflowApp, projectId, drawerVisible, setDrawerVisible }) => {
  const [drawerAddPlanVisible, setDrawerAddPlanVisible] = useState(false);
  const [drawerAddProcessVisible, setDrawerAddProcessVisible] = useState(false);
  const [addPlanToModel, setAddPlanToModel] = useState<PlanInfo>();
  const [addProcessToModel, setAddProcessToModel] = useState<Process>();
  // const app = useXFlowApp();

  const planInfoColumns: ProColumns<PlanInfo>[] = [
    {
      title: <FormattedMessage id="plan.index" defaultMessage="Index" />,
      dataIndex: 'index',
      valueType: 'index',
      search: false,
    },
    {
      title: <FormattedMessage id="plan.dataName" defaultMessage="Index" />,
      dataIndex: 'dataName',
      sorter: true,
    },
    {
      title: <FormattedMessage id="plan.planType" defaultMessage="Plan Type" />,
      dataIndex: 'planType',
      sorter: true,
    },
    {
      title: <FormattedMessage id="plan.description" defaultMessage="Description" />,
      dataIndex: 'description',
      valueType: 'textarea',
      search: false,
    },
    {
      title: <FormattedMessage id="plan.lastChange" defaultMessage="Last Change" />,
      dataIndex: 'lastChange',
      valueType: 'dateTime',
      sorter: true,
      search: false,
    },
    {
      title: <FormattedMessage id="plan.version" defaultMessage="Version" />,
      dataIndex: 'version',
      search: false,
    },
  ];
  const processColumns: ProColumns<Process>[] = [
    {
      title: 'ID',
      dataIndex: 'index',
      valueType: 'index',
      search: false,
    },
    {
      title: 'Data Name',
      dataIndex: 'dataName',
      sorter: true,
    },
    {
      title: 'Process Type',
      dataIndex: 'processType',
      sorter: true,
      search: false,
    },
    {
      title: 'Last Change',
      dataIndex: 'lastChange',
      valueType: 'dateTime',
      sorter: true,
      search: false,
    },
    {
      title: 'Release',
      dataIndex: 'release',
      sorter: true,
      search: false,
    },
  ];

  const callbackDrawerVisible = useCallback(() => {
    setDrawerVisible(false);
  }, [setDrawerVisible]);

  const onAddToModel = (id: string, name: string, type: string) => {
    if (xflowApp) {
      xflowApp.getGraphInstance().then(async (graph) => {
        const area = graph.getGraphArea();
        const newNode = {
          id: id,
          x: (area.x + area.width) / 2 - 50,
          y: (area.y + area.height) / 2 - 15,
          width: 100,
          height: 30,
          attrs: NodeAttrs(name),
          ports: NodePorts(id),
          info: {
            type: type,
          },
        };
        xflowApp.commandService.executeCommand<NsNodeCmd.AddNode.IArgs>(
          XFlowNodeCommands.ADD_NODE.id,
          {
            nodeConfig: newNode,
          },
        );
      });
    }
  };
  const onAddPlanToModel = () => {
    if (addPlanToModel) {
      onAddToModel(addPlanToModel.id, addPlanToModel.dataName, 'plan');
      setDrawerAddPlanVisible(false);
    }
  };
  const onAddProcessToModel = () => {
    if (addProcessToModel) {
      onAddToModel(addProcessToModel.id, addProcessToModel.dataName, 'process');
      setDrawerAddProcessVisible(false);
    }
  };

  return (
    <>
      <Drawer
        closable={false}
        extra={
          <Button icon={<CloseOutlined />} style={{ border: 0 }} onClick={callbackDrawerVisible} />
        }
        visible={drawerVisible}
        title="Add"
        onClose={callbackDrawerVisible}
      >
        <Button
          key="plan"
          onClick={() => {
            setDrawerVisible(false);
            setDrawerAddPlanVisible(true);
          }}
        >
          Plan
        </Button>{' '}
        Or{' '}
        <Button
          key="process"
          onClick={() => {
            setDrawerVisible(false);
            setDrawerAddProcessVisible(true);
          }}
        >
          Process
        </Button>
      </Drawer>
      <Drawer
        visible={drawerAddPlanVisible}
        title="Add Plan"
        width="800px"
        closable={false}
        extra={
          <Button
            icon={<CloseOutlined />}
            style={{ border: 0 }}
            onClick={() => setDrawerAddPlanVisible(false)}
          />
        }
        onClose={() => setDrawerAddPlanVisible(false)}
        footer={
          <Space size={'middle'} className={styles.footer_right}>
            <Button onClick={() => setDrawerAddPlanVisible(false)}>Cancel</Button>
            <Button onClick={onAddPlanToModel} type="primary">
              Add
            </Button>
          </Space>
        }
      >
        <ProTable<PlanInfo, ListPagination>
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
            return getPlanGrid(params, sort, projectId);
          }}
          columns={planInfoColumns}
          rowClassName={(record) => {
            return record.dataName === addPlanToModel?.dataName
              ? styles.split_row_select_active
              : '';
          }}
          onRow={(record) => {
            return {
              onClick: () => {
                if (record) {
                  setAddPlanToModel(record);
                }
              },
            };
          }}
        />
      </Drawer>
      <Drawer
        visible={drawerAddProcessVisible}
        title="Add Process"
        width="800px"
        closable={false}
        extra={
          <Button
            icon={<CloseOutlined />}
            style={{ border: 0 }}
            onClick={() => setDrawerAddProcessVisible(false)}
          />
        }
        onClose={() => setDrawerAddProcessVisible(false)}
        footer={
          <Space size={'middle'} className={styles.footer_right}>
            <Button onClick={() => setDrawerAddProcessVisible(false)}>Cancel</Button>
            <Button onClick={onAddProcessToModel} type="primary">
              Add
            </Button>
          </Space>
        }
      >
        <ProTable<Process, ListPagination>
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
            return getProcessGrid(params, sort, projectId, false);
          }}
          columns={processColumns}
          rowClassName={(record) => {
            return record.dataName === addProcessToModel?.dataName
              ? styles.split_row_select_active
              : '';
          }}
          onRow={(record) => {
            return {
              onClick: () => {
                if (record) {
                  setAddProcessToModel(record);
                }
              },
            };
          }}
        />
      </Drawer>
    </>
  );
};

export default Add;
