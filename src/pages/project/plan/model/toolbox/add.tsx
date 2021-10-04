import type { Dispatch, FC } from 'react';
import React, { useState, useCallback } from 'react';
import type { Elements } from 'react-flow-renderer';
import {
  // useZoomPanHelper,
  // useStoreState,
  // removeElements,
  // isNode,
  // isEdge,
  useStoreActions,
} from 'react-flow-renderer';
import localforage from 'localforage';
import styles from '../index.less';
import { DrawerForm } from '@ant-design/pro-form';
import { Button, Drawer, Space } from 'antd';
import { getPlanList } from '@/services/plan/list';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { PlanInfo, PlanListPagination } from '@/services/plan/list.d';

localforage.config({
  name: 'react-flow',
  storeName: 'flows',
});

type addProps = {
  setElements: Dispatch<React.SetStateAction<Elements<any>>>;
  project: number;
};

const Add: FC<addProps> = ({ setElements, project }) => {
  // const selectedElements = useStoreState((store) => store.selectedElements);
  const setSelectedElements = useStoreActions((actions) => actions.setSelectedElements);
  const [isDrawerAddVisible, setIsDrawerAddVisible] = useState(false);
  const [isDrawerAddPlanVisible, setIsDrawerAddPlanVisible] = useState(false);
  const [isDrawerAddProcessVisible, setIsDrawerAddProcessVisible] = useState(false);
  const [addPlanToModel, setAddPlanToModel] = useState<PlanInfo>();

  const columns: ProColumns<PlanInfo>[] = [
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
    setIsDrawerAddVisible(true);
  };
  const onDrawerAddProcess = () => {
    setIsDrawerAddVisible(false);
    setIsDrawerAddProcessVisible(true);
  };
  const onAddPlanToModel = useCallback(() => {
    if (addPlanToModel !== undefined) {
      const newNode = {
        id: addPlanToModel.id,
        data: { label: addPlanToModel.name, type: 'plan' },
        position: {
          x: 0,
          y: 0,
        },
      };
      setElements((els) => els.concat(newNode));
      setSelectedElements(newNode);
      setIsDrawerAddPlanVisible(false);
    }
  }, [addPlanToModel, setElements, setSelectedElements]);
  const handleDrawerAddCancel = () => {
    setIsDrawerAddVisible(false);
  };
  const onDrawerAddPlan = () => {
    setIsDrawerAddVisible(false);
    setIsDrawerAddPlanVisible(true);
  };
  const handleDrawerAddPlanCancel = () => {
    setIsDrawerAddPlanVisible(false);
  };
  return (
    <>
      <Button key="Add" onClick={onAdd} block>
        Add
      </Button>
      <Drawer visible={isDrawerAddVisible} title="Add" onClose={handleDrawerAddCancel}>
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
          // actionRef={actionRef}
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
            return getPlanList(params, sort, project);
          }}
          columns={columns}
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
      <DrawerForm
        title="Add Process"
        width="400px"
        visible={isDrawerAddProcessVisible}
        onVisibleChange={setIsDrawerAddProcessVisible}
      ></DrawerForm>
    </>
  );
};

export default Add;
