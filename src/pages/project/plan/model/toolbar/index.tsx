import { updatePlanChinlrenJson } from '@/services/plan/api';
import { DeleteOutlined, PlusCircleOutlined, SaveOutlined } from '@ant-design/icons';
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
import { message } from 'antd';
import type { FC } from 'react';
import { useState } from 'react';
import Add from './add';

type Props = {
  projectId: number;
  id: string;
};

const Toolbar: FC<Props> = ({ projectId, id }) => {
  const [graphCommandService, setGraphCommandService] = useState<IGraphCommandService>();
  const [drawerAddVisible, setAddDrawerVisible] = useState(false);

  IconStore.set('PlusCircleOutlined', PlusCircleOutlined);
  IconStore.set('DeleteOutlined', DeleteOutlined);
  IconStore.set('SaveOutlined', SaveOutlined);

  interface IState {
    isSelected: boolean;
    cellType: string;
    cellID: string;
    cellConfig: any;
  }

  const getToolbarState = async (modelService: IModelService) => {
    const cell = await MODELS.SELECTED_CELL.useValue(modelService);
    if (cell) {
      if (cell.shape === 'react-shape') {
        return {
          isSelected: true,
          cellType: 'node',
          cellID: cell.id,
          cellConfig: cell.data,
        } as IState;
      }
      if (cell.shape === 'edge') {
        return {
          isSelected: true,
          cellType: 'edge',
          cellID: cell.id,
          cellConfig: cell.data,
        } as IState;
      }
    }
    return {
      isSelected: false,
      cellType: '',
      cellID: '',
      cellConfig: '',
    } as IState;
  };

  const getToolbarItems = async (state: IState) => {
    const toolbarGroup1: IToolbarItemOptions[] = [];
    toolbarGroup1.push(
      {
        id: XFlowNodeCommands.ADD_NODE.id,
        iconName: 'PlusCircleOutlined',
        tooltip: 'Add',
        onClick: async ({ commandService }) => {
          setGraphCommandService(commandService);
          setAddDrawerVisible(true);
        },
      },
      {
        id: XFlowNodeCommands.MOVE_NODE.id,
        iconName: 'DeleteOutlined',
        tooltip: 'Delete',
        isEnabled: state.isSelected,
        onClick: async ({ commandService }) => {
          if (state.cellType === 'node')
            commandService.executeCommand<NsNodeCmd.DelNode.IArgs>(XFlowNodeCommands.DEL_NODE.id, {
              nodeConfig: state.cellConfig,
            });
          else if (state.cellType === 'edge') {
            commandService.executeCommand<NsEdgeCmd.DelEdge.IArgs>(XFlowEdgeCommands.DEL_EDGE.id, {
              edgeConfig: state.cellConfig,
            });
          }
        },
      },
      {
        id: XFlowGraphCommands.SAVE_GRAPH_DATA.id,
        iconName: 'SaveOutlined',
        tooltip: 'Save',
        onClick: async ({ commandService }) => {
          commandService.executeCommand<NsGraphCmd.SaveGraphData.IArgs>(
            XFlowGraphCommands.SAVE_GRAPH_DATA.id,
            {
              saveGraphDataService: async (_meta, data) => {
                const updatePlan = {
                  projectId,
                  id,
                  childrenJson: `{"data": ${JSON.stringify(data)}}`,
                };
                updatePlanChinlrenJson(updatePlan).then(() => {
                  message.success('Save successfully!');
                });
                // console.log(data);
              },
            },
          );
        },
      },
    );

    return [{ name: 'toolbar', items: toolbarGroup1 }];
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

      const model = await MODELS.SELECTED_NODES.getModel(modelService);
      model.watch(() => {
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
        drawerVisible={drawerAddVisible}
        setDrawerVisible={setAddDrawerVisible}
        commandService={graphCommandService}
      />
    </>
  );
};

export default Toolbar;
