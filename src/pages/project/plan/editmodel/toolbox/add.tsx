import type { Dispatch, FC } from 'react';
import React, { useState, useCallback } from 'react';
import type { Elements } from 'react-flow-renderer';
import { useStoreActions } from 'react-flow-renderer';
import styles from '../index.less';
import { Button, Drawer, Space } from 'antd';
import { getPlanInfoGrid } from '@/services/plan/api';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { PlanInfo, PlanListPagination } from '@/services/plan/data';
import type { Process, ProcessListPagination } from '@/services/process/data';
import { getProcessGrid } from '@/services/process/api';

type addProps = {
  setElements: Dispatch<React.SetStateAction<Elements<any>>>;
  project: number;
};

const Add: FC<addProps> = ({ setElements, project }) => {
  const setSelectedElements = useStoreActions((actions) => actions.setSelectedElements);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [isDrawerAddPlanVisible, setIsDrawerAddPlanVisible] = useState(false);
  const [isDrawerAddProcessVisible, setIsDrawerAddProcessVisible] = useState(false);
  const [addPlanToModel, setAddPlanToModel] = useState<PlanInfo>();
  const [addProcessToModel, setAddProcessToModel] = useState<Process>();

  const planInfoColumns: ProColumns<PlanInfo>[] = [
    {
      title: 'Name',
      key: 'name',
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
  ];
  const ProcessColumns: ProColumns<Process>[] = [
    {
      title: 'Name',
      key: 'name',
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
  ];

  const onAdd = () => {
    setIsDrawerVisible(true);
  };

  const onDrawerAddProcess = () => {
    setIsDrawerVisible(false);
    setIsDrawerAddProcessVisible(true);
  };

  const onAddPlanToModel = useCallback(() => {
    if (addPlanToModel) {
      const newNode = {
        id: addPlanToModel.id,
        data: { label: addPlanToModel.name, type: 'plan' },
        position: {
          x: 0,
          y: 0,
        },
        type: 'default',
        style: {
          background: '#ffffff',
          border: '1px solid #000000',
        },
      };
      setElements((els) => els.concat(newNode));
      setSelectedElements(newNode);
      setIsDrawerAddPlanVisible(false);
    }
  }, [addPlanToModel, setElements, setSelectedElements]);

  const onAddProcessToModel = useCallback(() => {
    if (addProcessToModel) {
      const newNode = {
        id: addProcessToModel.id,
        data: { label: addProcessToModel.name, type: 'process' },
        position: {
          x: 0,
          y: 0,
        },
        type: 'default',
        style: {
          background: '#ffffff',
          border: '2px solid #000000',
        },
      };
      setElements((els) => els.concat(newNode));
      setSelectedElements(newNode);
      setIsDrawerAddProcessVisible(false);
    }
  }, [addProcessToModel, setElements, setSelectedElements]);

  const handleDrawerAddCancel = () => {
    setIsDrawerVisible(false);
  };

  const onDrawerAddPlan = () => {
    setIsDrawerVisible(false);
    setIsDrawerAddPlanVisible(true);
  };

  const handleDrawerAddPlanCancel = () => {
    setIsDrawerAddPlanVisible(false);
  };

  const handleDrawerAddProcessCancel = () => {
    setIsDrawerAddProcessVisible(false);
  };

  return (
    <>
      <Button key="Add" onClick={onAdd} block>
        Add
      </Button>
      <Drawer visible={isDrawerVisible} title="Add" onClose={handleDrawerAddCancel}>
        <Button key="plan" onClick={onDrawerAddPlan}>
          Plan
        </Button>{' '}
        Or{' '}
        <Button key="process" onClick={onDrawerAddProcess}>
          Process
        </Button>
      </Drawer>
      <Drawer
        visible={isDrawerAddPlanVisible}
        title="Add Plan"
        width="800px"
        onClose={handleDrawerAddPlanCancel}
        footer={
          <Space size={'middle'} className={styles.footer_space}>
            <Button onClick={handleDrawerAddPlanCancel}>Cancel</Button>
            <Button onClick={onAddPlanToModel} type="primary">
              Add
            </Button>
          </Space>
        }
      >
        <ProTable<PlanInfo, PlanListPagination>
          search={{
            defaultCollapsed: false,
            optionRender: (searchConfig, formProps, dom) => [
              ...dom.reverse(),
              <Button key="creat" onClick={() => {}}>
                Creat
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
          columns={planInfoColumns}
          rowClassName={(record) => {
            return record.name === addPlanToModel?.name ? styles['split-row-select-active'] : '';
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
        visible={isDrawerAddProcessVisible}
        title="Add Process"
        width="800px"
        onClose={handleDrawerAddPlanCancel}
        footer={
          <Space size={'middle'} className={styles.footer_space}>
            <Button onClick={handleDrawerAddProcessCancel}>Cancel</Button>
            <Button onClick={onAddProcessToModel} type="primary">
              Add
            </Button>
          </Space>
        }
      >
        <ProTable<Process, ProcessListPagination>
          search={{
            defaultCollapsed: false,
            optionRender: (searchConfig, formProps, dom) => [
              ...dom.reverse(),
              <Button key="creat" onClick={() => {}}>
                Creat
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
            return getProcessGrid(params, sort, project);
          }}
          columns={ProcessColumns}
          rowClassName={(record) => {
            return record.name === addProcessToModel?.name ? styles['split-row-select-active'] : '';
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
