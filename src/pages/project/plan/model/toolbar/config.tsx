import type { IModelService, IToolbarItemOptions, NsGraphCmd, NsNodeCmd } from '@antv/xflow';
import {
  createToolbarConfig,
  XFlowGraphCommands,
  IconStore,
  MODELS,
  XFlowNodeCommands,
} from '@antv/xflow';
import { DeleteOutlined, PlusCircleOutlined, SaveOutlined } from '@ant-design/icons';
import { message } from 'antd';

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace NSToolbarConfig {
  IconStore.set('PlusCircleOutlined', PlusCircleOutlined);
  IconStore.set('DeleteOutlined', DeleteOutlined);
  IconStore.set('SaveOutlined', SaveOutlined);

  export interface IState {
    isNodeSelected: boolean;
  }

  export const getToolbarState = async (modelService: IModelService) => {
    const nodes = await MODELS.SELECTED_NODES.useValue(modelService);
    return {
      isNodeSelected: nodes.length > 0,
    } as IState;
  };

  export const getToolbarItems = async (state: IState) => {
    const toolbarGroup1: IToolbarItemOptions[] = [];
    toolbarGroup1.push(
      {
        id: XFlowNodeCommands.ADD_NODE.id,
        iconName: 'PlusCircleOutlined',
        tooltip: '添加节点',
        onClick: async ({ commandService }) => {
          const nodeName = `Node`;
          commandService.executeCommand<NsNodeCmd.AddNode.IArgs>(XFlowNodeCommands.ADD_NODE.id, {
            nodeConfig: {
              id: nodeName,
              label: nodeName,
              width: 160,
              height: 32,
            },
          });
        },
      },
      {
        id: XFlowGraphCommands.SAVE_GRAPH_DATA.id,
        iconName: 'SaveOutlined',
        tooltip: '保存数据',
        onClick: async ({ commandService }) => {
          commandService.executeCommand<NsGraphCmd.SaveGraphData.IArgs>(
            XFlowGraphCommands.SAVE_GRAPH_DATA.id,
            {
              saveGraphDataService: async (meta, data) => {
                console.log(data);
                message.success('nodes count:' + data.nodes.length);
              },
            },
          );
        },
      },
      {
        id: XFlowNodeCommands.MOVE_NODE.id,
        iconName: 'DeleteOutlined',
        tooltip: '删除节点',
        isEnabled: state.isNodeSelected,
      },
    );

    return [{ name: 'toolbar', items: toolbarGroup1 }];
  };
}

export const useToolbarConfig = createToolbarConfig((toolbarConfig) => {
  toolbarConfig.setToolbarModelService(async (toolbarModel, modelService) => {
    const updateToolbarState = async () => {
      const toolbarState = await NSToolbarConfig.getToolbarState(modelService);
      const toolbarItems = await NSToolbarConfig.getToolbarItems(toolbarState);
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
