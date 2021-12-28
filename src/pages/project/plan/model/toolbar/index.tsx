import { getPlanParentGrid, updatePlanChinlrenJson } from '@/services/plan/api';
import type { PlanModelState } from '@/services/plan/data';
import {
  DeleteOutlined,
  ExclamationCircleOutlined,
  FormOutlined,
  HighlightOutlined,
  NodeCollapseOutlined,
  NodeExpandOutlined,
  PlusCircleOutlined,
  ProfileOutlined,
  ReloadOutlined,
  SaveOutlined,
} from '@ant-design/icons';
import type {
  IGraphCommandService,
  IModelService,
  IToolbarItemOptions,
  NsEdgeCmd,
  NsGraphCmd,
  NsNodeCmd,
} from '@antv/xflow';
import {
  XFlowEdgeCommands,
  CanvasToolbar,
  createToolbarConfig,
  IconStore,
  MODELS,
  XFlowGraphCommands,
  XFlowNodeCommands,
} from '@antv/xflow';
import { message, Modal } from 'antd';
import type { FC } from 'react';
import { useState } from 'react';
import Design from './design';
import Add from './add';
import Edit from './edit';
import View from './view';
import RollUp from './rollup';

type Props = {
  projectId: number;
  id: string;
  parentCount: number;
};

const Toolbar: FC<Props> = ({ projectId, id, parentCount }) => {
  const [graphCommandService, setGraphCommandService] = useState<IGraphCommandService>();
  const [addDrawerVisible, setAddDrawerVisible] = useState(false);
  const [viewDrawerVisible, setViewDrawerVisible] = useState(false);
  const [editDrawerVisible, setEditDrawerVisible] = useState(false);
  const [rollupDrawerVisible, setRollUpDrawerVisible] = useState(false);
  const [designDrawerVisible, setDesignDrawerVisible] = useState(false);

  IconStore.set('rollup', NodeCollapseOutlined);
  IconStore.set('drilldown', NodeExpandOutlined);
  IconStore.set('add', PlusCircleOutlined);
  IconStore.set('view', ProfileOutlined);
  IconStore.set('edit', FormOutlined);
  IconStore.set('design', HighlightOutlined);
  IconStore.set('reload', ReloadOutlined);
  IconStore.set('remove', DeleteOutlined);
  IconStore.set('save', SaveOutlined);

  const [planModelState, setPlanModelState] = useState<PlanModelState>({
    isSelected: false,
    cellType: '',
    cellID: '',
    cellConfig: '',
  });
  const getToolbarState = async (modelService: IModelService) => {
    let state = {
      isSelected: false,
      cellType: '',
      cellID: '',
      cellConfig: '',
    };
    const cell = await MODELS.SELECTED_CELL.useValue(modelService);
    if (cell) {
      if (cell.shape === 'react-shape' || cell.shape === 'rect') {
        state = {
          isSelected: true,
          cellType: 'node',
          cellID: cell.id,
          cellConfig: cell.data,
        };
      } else if (cell.shape === 'edge') {
        state = {
          isSelected: true,
          cellType: 'edge',
          cellID: cell.id,
          cellConfig: cell.data,
        };
      }
    }
    setPlanModelState(state);
    return state;
  };
  const getToolbarItems = async (state: PlanModelState) => {
    const toolbarGroup1: IToolbarItemOptions[] = [];
    const toolbarGroup2: IToolbarItemOptions[] = [];
    const toolbarGroup3: IToolbarItemOptions[] = [];
    const toolbarGroup4: IToolbarItemOptions[] = [];
    const toolbarGroup5: IToolbarItemOptions[] = [];
    toolbarGroup1.push(
      {
        id: 'rollup',
        iconName: 'rollup',
        tooltip: 'Roll Up',
        isEnabled: parentCount > 0,
        onClick: async () => {
          if (parentCount === 1) {
            getPlanParentGrid({}, {}, projectId, id).then((result) => {
              window.location.replace(
                `/project/plan/model?projectid=${projectId}&id=${result.data[0].id}`,
              );
            });
          } else if (parentCount > 1) setRollUpDrawerVisible(true);
        },
      },
      {
        id: 'drilldown',
        iconName: 'drilldown',
        tooltip: 'Drill Down',
        isEnabled:
          state.isSelected && state.cellType === 'node' && state.cellConfig.info.type === 'plan',
        onClick: async () => {
          window.location.href = `/project/plan/model?projectid=${projectId}&id=${state.cellConfig.id}`;
        },
      },
    );
    toolbarGroup2.push(
      {
        id: 'view',
        iconName: 'view',
        tooltip: 'View',
        isEnabled: state.isSelected,
        onClick: async () => {
          setViewDrawerVisible(true);
        },
      },
      {
        id: 'edit',
        iconName: 'edit',
        tooltip: 'Edit',
        isEnabled: state.isSelected,
        onClick: async ({ commandService }) => {
          setGraphCommandService(commandService);
          setEditDrawerVisible(true);
        },
      },
      {
        id: 'design',
        iconName: 'design',
        tooltip: 'Design',
        isEnabled: state.isSelected,
        onClick: async ({ commandService }) => {
          setGraphCommandService(commandService);
          setDesignDrawerVisible(true);
        },
      },
    );
    toolbarGroup3.push(
      {
        id: 'add',
        iconName: 'add',
        tooltip: 'Add',
        onClick: async ({ commandService }) => {
          setGraphCommandService(commandService);
          setAddDrawerVisible(true);
        },
      },
      {
        id: 'remove',
        iconName: 'remove',
        tooltip: 'Remove',
        isEnabled: state.isSelected,
        onClick: async ({ commandService }) => {
          if (state.cellType === 'node') {
            Modal.confirm({
              title: 'Are you sure to remove this node?',
              icon: <ExclamationCircleOutlined />,
              content: '',
              onOk() {
                commandService.executeCommand<NsNodeCmd.DelNode.IArgs>(
                  XFlowNodeCommands.DEL_NODE.id,
                  {
                    nodeConfig: state.cellConfig,
                  },
                );
              },
              onCancel() {},
            });
          } else if (state.cellType === 'edge') {
            Modal.confirm({
              title: 'Are you sure to remove this edge?',
              icon: <ExclamationCircleOutlined />,
              content: '',
              onOk() {
                commandService.executeCommand<NsEdgeCmd.DelEdge.IArgs>(
                  XFlowEdgeCommands.DEL_EDGE.id,
                  {
                    edgeConfig: state.cellConfig,
                  },
                );
              },
              onCancel() {},
            });
          }
        },
      },
    );
    toolbarGroup4.push({
      id: 'reload',
      iconName: 'reload',
      tooltip: 'Reload',
      onClick: async () => {
        Modal.confirm({
          title: 'Are you sure to reload this model?',
          icon: <ExclamationCircleOutlined />,
          content: '',
          onOk() {
            window.location.reload();
          },
          onCancel() {},
        });
      },
    });
    toolbarGroup5.push({
      id: 'save',
      iconName: 'save',
      tooltip: 'Save',
      onClick: async ({ commandService }) => {
        commandService.executeCommand<NsGraphCmd.SaveGraphData.IArgs>(
          XFlowGraphCommands.SAVE_GRAPH_DATA.id,
          {
            saveGraphDataService: async (_meta, data) => {
              const updatePlan = {
                projectId,
                id,
                childrenJson: JSON.stringify(data),
              };
              updatePlanChinlrenJson(updatePlan).then(() => {
                message.success('Save successfully!');
              });
            },
          },
        );
      },
    });
    return [
      { name: 'tg1', items: toolbarGroup1 },
      { name: 'tg2', items: toolbarGroup2 },
      { name: 'tg3', items: toolbarGroup3 },
      { name: 'tg4', items: toolbarGroup4 },
      { name: 'tg5', items: toolbarGroup5 },
    ];
  };
  const useToolbarConfig = createToolbarConfig((config) => {
    config.setToolbarModelService(async (toolbarModel, modelService) => {
      const updateToolbarState = async () => {
        const toolbarState = await getToolbarState(modelService);
        const toolbarItems = await getToolbarItems(toolbarState);
        toolbarModel.setValue((toolbar) => {
          toolbar.mainGroups = toolbarItems;
        });
      };

      const selectModel = await MODELS.SELECTED_CELLS.getModel(modelService);
      selectModel.watch(() => {
        updateToolbarState();
      });
    });
  });

  return (
    <>
      <CanvasToolbar
        layout="vertical"
        config={useToolbarConfig()}
        position={{ top: 0, right: 0 }}
      />
      <Add
        projectId={projectId}
        drawerVisible={addDrawerVisible}
        setDrawerVisible={setAddDrawerVisible}
        commandService={graphCommandService}
      />
      <View
        projectId={projectId}
        drawerVisible={viewDrawerVisible}
        setDrawerVisible={setViewDrawerVisible}
        planModelState={planModelState}
      />
      <Edit
        projectId={projectId}
        planId={id}
        drawerVisible={editDrawerVisible}
        setDrawerVisible={setEditDrawerVisible}
        planModelState={planModelState}
      />
      <Design
        projectId={projectId}
        planId={id}
        drawerVisible={designDrawerVisible}
        setDrawerVisible={setDesignDrawerVisible}
        planModelState={planModelState}
      />
      <RollUp
        projectId={projectId}
        planId={id}
        parentCount={parentCount}
        drawerVisible={rollupDrawerVisible}
        setDrawerVisible={setRollUpDrawerVisible}
      />
    </>
  );
};

export default Toolbar;
