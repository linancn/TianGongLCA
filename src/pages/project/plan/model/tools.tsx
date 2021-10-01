import type { Dispatch, FC } from 'react';
import React, { useState, useCallback } from 'react';
import type { OnLoadParams, Elements, FlowExportObject } from 'react-flow-renderer';
import {
  useZoomPanHelper,
  useStoreState,
  removeElements,
  isNode,
  isEdge,
  useStoreActions,
} from 'react-flow-renderer';
import localforage from 'localforage';
import styles from './index.less';
import { DrawerForm } from '@ant-design/pro-form';
import { Button, Drawer, Space } from 'antd';
import { getPlanList } from '@/services/plan/list';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { PlanListPagination } from '@/services/plan/list.d';
import type { PlanListItem } from '@/services/plan/list.d';

localforage.config({
  name: 'react-flow',
  storeName: 'flows',
});

const flowKey = 'flow';

const getTimeId = () => new Date().getTime() - 1577836800000;

// const waitTime = (time: number = 100) => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(true);
//     }, time);
//   });
// };

type ToolsProps = {
  rfInstance?: OnLoadParams;
  setElements: Dispatch<React.SetStateAction<Elements<any>>>;
  project: number;
  // plan: string;
};

const Tools: FC<ToolsProps> = ({ rfInstance, setElements, project }) => {
  const { transform } = useZoomPanHelper();
  const selectedElements = useStoreState((store) => store.selectedElements);
  const setSelectedElements = useStoreActions((actions) => actions.setSelectedElements);
  const [copyElements, setCopyElements] = useState<Elements>();
  const [isDrawerAddVisible, setIsDrawerAddVisible] = useState(false);
  const [isDrawerAddPlanVisible, setIsDrawerAddPlanVisible] = useState(false);
  const [isDrawerAddProcessVisible, setIsDrawerAddProcessVisible] = useState(false);
  const [addPlanToModel, setAddPlanToModel] = useState<PlanListItem>();

  const onToolSave = useCallback(() => {
    if (rfInstance) {
      const flow = rfInstance.toObject();
      localforage.setItem(flowKey, flow);
      // console.log(flow.elements);
    }
  }, [rfInstance]);

  const onToolRestore = useCallback(() => {
    const restoreFlow = async () => {
      const flow: FlowExportObject | null = await localforage.getItem(flowKey);
      if (flow) {
        const [x = 0, y = 0] = flow.position;
        setElements(flow.elements || []);
        transform({ x, y, zoom: flow.zoom || 0 });
      }
    };

    restoreFlow();
  }, [setElements, transform]);

  const onToolAdd = () => {
    setIsDrawerAddVisible(true);
  };

  const onToolCopy = useCallback(() => {
    if (selectedElements != null) {
      setCopyElements(selectedElements);
    }
  }, [selectedElements]);

  const onToolPaste = useCallback(() => {
    if (copyElements != null) {
      const copyid = getTimeId();
      let i = 0;
      copyElements.map((el) => {
        if (isNode(el)) {
          const newNode = {
            ...el,
            id: `n_${copyid + i}`,
            position: {
              x: el.position.x + 10,
              y: el.position.y + 10,
            },
          };
          setElements((els) => els.concat(newNode));
        } else if (isEdge(el)) {
          const newEdge = {
            ...el,
            id: `e_${copyid + i}`,
          };
          setElements((els) => els.concat(newEdge));
        }
        i += 1;
        return '';
      });
    }
  }, [copyElements, setElements]);

  const onToolDelete = useCallback(() => {
    if (selectedElements != null) {
      setElements((els) => removeElements(selectedElements, els));
    }
  }, [setElements, selectedElements]);

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
  // const handleDrawerAddPlan = async (fields: PlanListItem) => {
  //   const hide = message.loading('loading');
  //   try {
  //     await addPlan(fields);
  //     hide();
  //     message.success('success');
  //     return true;
  //   } catch (error) {
  //     hide();
  //     message.error('error');
  //     return false;
  //   }
  // };

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
  const columns: ProColumns<PlanListItem>[] = [
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

  return (
    <div className={styles.save_controls}>
      <Button key="toolSave" onClick={onToolSave}>
        Save
      </Button>
      <Button key="toolRestore" onClick={onToolRestore}>
        Restore
      </Button>
      <Button key="toolAdd" onClick={onToolAdd}>
        Add
      </Button>
      <Button key="toolCopy" onClick={onToolCopy}>
        Copy
      </Button>
      <Button key="toolPaste" onClick={onToolPaste}>
        Paste
      </Button>
      <Button key="toolDelete" onClick={onToolDelete}>
        Delete
      </Button>

      <Drawer
        visible={isDrawerAddVisible}
        title="Add"
        onClose={handleDrawerAddCancel}
        footer={null}
      >
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
        <ProTable<PlanListItem, PlanListPagination>
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

      {/* <DrawerForm
        title="Add Plan"
        width="400px"
        visible={isDrawerAddPlanVisible}
        onVisibleChange={setIsDrawerAddPlanVisible}
        onFinish={async (value) => {
          const success = await handleDrawerAddPlan({ ...value, projectId: project } as PlanListItem);
          if (success) {
            setIsDrawerAddPlanVisible(false);
          }
        }}
      >
      </DrawerForm> */}

      <DrawerForm
        title="Add Process"
        width="400px"
        visible={isDrawerAddProcessVisible}
        onVisibleChange={setIsDrawerAddProcessVisible}
      ></DrawerForm>
    </div>
  );
};

export default Tools;
