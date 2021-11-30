import type { Dispatch, FC } from 'react';
import React, { useState, useCallback } from 'react';
import type { Elements } from 'react-flow-renderer';
import { useStoreActions } from 'react-flow-renderer';
import styles from '@/style/custom.less';
import { Button, Drawer, Space } from 'antd';
import { getPlanInfoGrid } from '@/services/plan/api';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { PlanInfo } from '@/services/plan/data';
import type { Process } from '@/services/process/data';
import { getProcessGrid } from '@/services/process/api';
import type { ListPagination } from '@/services/home/data';

type addProps = {
  setElements: Dispatch<React.SetStateAction<Elements<any>>>;
  projectId: number;
};

const Add: FC<addProps> = ({ setElements, projectId }) => {
  const setSelectedElements = useStoreActions((actions) => actions.setSelectedElements);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [drawerAddPlanVisible, setDrawerAddPlanVisible] = useState(false);
  const [drawerAddProcessVisible, setDrawerAddProcessVisible] = useState(false);
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
      setDrawerAddPlanVisible(false);
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
      setDrawerAddProcessVisible(false);
    }
  }, [addProcessToModel, setElements, setSelectedElements]);

  return (
    <>
      <Button key="Add" onClick={() => setDrawerVisible(true)} block>
        Add
      </Button>
      <Drawer visible={drawerVisible} title="Add" onClose={() => setDrawerVisible(false)}>
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
        onClose={() => setDrawerAddPlanVisible(false)}
        footer={
          <Space size={'middle'} className={styles.footer_space}>
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
            optionRender: (searchConfig, formProps, dom) => [
              ...dom.reverse(),
              <Button onClick={() => {}}>Create</Button>,
            ],
          }}
          request={(
            params: {
              pageSize: number;
              current: number;
            },
            sort,
          ) => {
            return getPlanInfoGrid(params, sort, projectId);
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
        visible={drawerAddProcessVisible}
        title="Add Process"
        width="800px"
        onClose={() => setDrawerAddPlanVisible(false)}
        footer={
          <Space size={'middle'} className={styles.footer_space}>
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
            optionRender: (searchConfig, formProps, dom) => [
              ...dom.reverse(),
              <Button onClick={() => {}}>Create</Button>,
            ],
          }}
          request={(
            params: {
              pageSize: number;
              current: number;
            },
            sort,
          ) => {
            return getProcessGrid(params, sort, projectId);
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
