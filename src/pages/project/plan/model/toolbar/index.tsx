import { DeleteOutlined, PlusCircleOutlined, SaveOutlined } from '@ant-design/icons';
import type {
  IGraphCommandService,
  IModelService,
  IToolbarItemOptions,
  NsGraphCmd,
} from '@antv/xflow';
import {
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

const Toolbar: FC<Props> = ({ projectId }) => {
  const [graphCommandService, setGraphCommandService] = useState<IGraphCommandService>();
  const [drawerAddVisible, setAddDrawerVisible] = useState(false);
  IconStore.set('PlusCircleOutlined', PlusCircleOutlined);
  IconStore.set('DeleteOutlined', DeleteOutlined);
  IconStore.set('SaveOutlined', SaveOutlined);

  interface IState {
    isNodeSelected: boolean;
  }

  const getToolbarState = async (modelService: IModelService) => {
    const nodes = await MODELS.SELECTED_NODES.useValue(modelService);
    return {
      isNodeSelected: nodes.length > 0,
    } as IState;
  };

  const getToolbarItems = async (state: IState) => {
    const toolbarGroup1: IToolbarItemOptions[] = [];
    toolbarGroup1.push(
      {
        id: XFlowNodeCommands.ADD_NODE.id,
        iconName: 'PlusCircleOutlined',
        tooltip: '添加节点',
        onClick: async ({ commandService }) => {
          setGraphCommandService(commandService);
          setAddDrawerVisible(true);
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
