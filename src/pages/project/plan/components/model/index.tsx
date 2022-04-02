import type { FC } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Button, Divider, Drawer, message, Modal, Space, Tooltip } from 'antd';
import {
  ApartmentOutlined,
  CloseOutlined,
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
  IApplication,
  IAppLoad,
  IModelService,
  NsEdgeCmd,
  NsGraph,
  NsGraphCmd,
  NsNodeCmd,
} from '@antv/xflow';
import { MODELS, XFlowNodeCommands } from '@antv/xflow';
import { XFlow, XFlowCanvas, XFlowEdgeCommands, XFlowGraphCommands } from '@antv/xflow';
import { useGraphConfig } from './toolbar/config/graph';
import { getPlanModelCells, getPlanParentGrid, updatePlanModelCells } from '@/services/plan/api';
import { EdgeAttrs, EdgeConnector, EdgeRouter } from './toolbar/config/edge';
import Add from './toolbar/add';
import View from './toolbar/view';
import Edit from './toolbar/edit';
import Design from './toolbar/design';
import RollUp from './toolbar/rollup';
import type { PlanModelState } from '@/services/plan/data';

import './index.css';
import './index.less';
import type { ActionType } from '@ant-design/pro-table';

type Props = {
  projectId: number;
  planId: string;
  name: string;
  actionRef: React.MutableRefObject<ActionType | undefined>;
};
const Model: FC<Props> = ({ projectId, planId, name, actionRef }) => {
  const [xflowApp, setxflowApp] = useState<IApplication>();
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [addDrawerVisible, setAddDrawerVisible] = useState(false);
  const [viewDrawerVisible, setViewDrawerVisible] = useState(false);
  const [editDrawerVisible, setEditDrawerVisible] = useState(false);
  const [rollupDrawerVisible, setRollUpDrawerVisible] = useState(false);
  const [designDrawerVisible, setDesignDrawerVisible] = useState(false);
  const [modelId, setModelId] = useState(planId);
  const [modelName, setModelName] = useState(name);
  const [isOnLoad, setIsOnLoad] = useState(false);
  const [parentCount, setParentCount] = useState(0);
  const [planModelState, setPlanModelState] = useState<PlanModelState>({
    isSelected: false,
    cellType: '',
    cellId: '',
    cellConfig: {
      info: {
        type: '',
      },
    },
  });

  const changePortsVisible = (visible: boolean) => {
    const ports = document.body.querySelectorAll('.x6-port-body') as NodeListOf<SVGElement>;
    for (let i = 0, len = ports.length; i < len; i = i + 1) {
      ports[i].style.visibility = visible ? 'visible' : 'hidden';
    }
  };
  const watchEvent = async (appRef: IApplication) => {
    if (appRef) {
      const graph = await appRef.getGraphInstance();
      graph.on('edge:connected', ({ edge }) => {
        const relationSourceData = edge?.getSourceNode()?.data;
        const relationTargetData = edge?.getTargetNode()?.data;
        const edgeData: NsGraph.IEdgeConfig = edge?.getData();

        if (!edgeData) {
          appRef.executeCommand(XFlowEdgeCommands.DEL_EDGE.id, {
            x6Edge: edge as any,
          } as NsEdgeCmd.DelEdge.IArgs);

          appRef.executeCommand(XFlowEdgeCommands.ADD_EDGE.id, {
            edgeConfig: {
              id: relationSourceData.id + '_' + relationTargetData.id,
              source: relationSourceData.id,
              target: relationTargetData.id,
              attrs: EdgeAttrs(),
              router: EdgeRouter(),
              connector: EdgeConnector(),
            },
          } as NsEdgeCmd.AddEdge.IArgs);
        }
      });
      graph.on('edge:click', ({ edge }) => {
        edge.toFront();
      });
      graph.on('node:mouseenter', () => {
        changePortsVisible(true);
      });
      graph.on('node:mouseleave', () => {
        changePortsVisible(false);
      });
    }
  };
  const setSelectedCell = async (modelService: IModelService) => {
    let state = {
      isSelected: false,
      cellType: '',
      cellId: '',
      cellConfig: {
        info: {
          type: '',
        },
      },
    };
    const cell = await MODELS.SELECTED_CELL.useValue(modelService);
    if (cell) {
      if (cell.shape === 'react-shape') {
        state = {
          isSelected: true,
          cellType: 'node',
          cellId: cell.id,
          cellConfig: cell.data,
        };
      } else if (cell.shape === 'edge') {
        state = {
          isSelected: true,
          cellType: 'edge',
          cellId: cell.id,
          cellConfig: cell.data,
        };
      }
    }
    setPlanModelState(state);
    return state;
  };
  const loadModel = (loadModelId: string) => {
    getPlanModelCells(projectId, loadModelId).then((pm) => {
      setParentCount(pm.parentCount);
      const modelCells = JSON.parse(pm.modelCells);
      if (xflowApp) {
        if (modelCells !== null) {
          const graphData: NsGraph.IGraphData = modelCells;
          xflowApp.executeCommand<NsGraphCmd.GraphRender.IArgs>(
            XFlowGraphCommands.GRAPH_RENDER.id,
            {
              graphData,
            },
          );
        } else {
          const graphData: NsGraph.IGraphData = { edges: [], nodes: [] };
          xflowApp.executeCommand<NsGraphCmd.GraphRender.IArgs>(
            XFlowGraphCommands.GRAPH_RENDER.id,
            {
              graphData,
            },
          );
        }
      }
      setModelId(pm.id);
      setModelName(pm.dataName);
      setParentCount(pm.parentCount);
    });
  };
  const onLoad: IAppLoad = async (app) => {
    if (!isOnLoad) {
      getPlanModelCells(projectId, modelId).then((pm) => {
        const modelCells = JSON.parse(pm.modelCells);
        if (modelCells !== null) {
          const graphData: NsGraph.IGraphData = modelCells;
          app.executeCommand<NsGraphCmd.GraphRender.IArgs>(XFlowGraphCommands.GRAPH_RENDER.id, {
            graphData,
          });
        } else {
          const graphData: NsGraph.IGraphData = { edges: [], nodes: [] };
          app.executeCommand<NsGraphCmd.GraphRender.IArgs>(XFlowGraphCommands.GRAPH_RENDER.id, {
            graphData,
          });
        }
        setModelId(pm.id);
        setModelName(pm.dataName);
        setParentCount(pm.parentCount);
        setIsOnLoad(true);
      });
    }
    (await MODELS.SELECTED_CELLS.getModel(app.modelService)).watch(async () => {
      setSelectedCell(app.modelService);
    });
    await watchEvent(app);
    setxflowApp(app);
  };

  useEffect(() => {
    if (drawerVisible) {
      loadModel(modelId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [drawerVisible]);

  return (
    <>
      <Tooltip title="Open model">
        <Button
          shape="circle"
          size="small"
          icon={<ApartmentOutlined />}
          onClick={() => setDrawerVisible(true)}
        />
      </Tooltip>
      <Drawer
        push={false}
        title={`Model Builder (${modelName})`}
        width="100%"
        closable={false}
        destroyOnClose={false}
        extra={
          <Button
            icon={<CloseOutlined />}
            style={{ border: 0 }}
            onClick={() => {
              actionRef.current?.reload();
              setDrawerVisible(false);
            }}
          />
        }
        maskClosable={true}
        visible={drawerVisible}
        onClose={() => {
          actionRef.current?.reload();
          setDrawerVisible(false);
        }}
      >
        <XFlow onLoad={onLoad}>
          <XFlowCanvas
            config={useGraphConfig()}
            position={{ top: 0, left: 0, right: 0, bottom: 0 }}
          />
          <Drawer
            visible={true}
            closable={false}
            mask={false}
            getContainer={false}
            push={false}
            style={{ position: 'absolute' }}
            bodyStyle={{ padding: '0px 0px 0px 5px' }}
            width="33px"
          >
            <Space direction="vertical">
              <Tooltip title="Roll Up" placement="left">
                <Button
                  icon={<NodeCollapseOutlined />}
                  disabled={parentCount === 0}
                  onClick={() => {
                    if (parentCount === 1) {
                      getPlanParentGrid({}, {}, projectId, modelId).then((ppg) => {
                        loadModel(ppg.data[0].id);
                      });
                    } else if (parentCount > 1) setRollUpDrawerVisible(true);
                  }}
                />
              </Tooltip>
              <Tooltip title="Drill Down" placement="left">
                <Button
                  icon={<NodeExpandOutlined />}
                  disabled={
                    !(
                      planModelState.isSelected &&
                      planModelState.cellType === 'node' &&
                      planModelState.cellConfig.info.type === 'plan'
                    )
                  }
                  onClick={() => {
                    loadModel(planModelState.cellConfig.id);
                  }}
                />
              </Tooltip>
              <Divider style={{ margin: '0' }} />
              <Tooltip title="Add" placement="left">
                <Button
                  icon={<PlusCircleOutlined />}
                  disabled={false}
                  onClick={() => {
                    setAddDrawerVisible(true);
                  }}
                />
              </Tooltip>
              <Tooltip title="View" placement="left">
                <Button
                  icon={<ProfileOutlined />}
                  disabled={!planModelState.isSelected}
                  onClick={() => {
                    setViewDrawerVisible(true);
                  }}
                />
              </Tooltip>
              <Tooltip title="Edit" placement="left">
                <Button
                  icon={<FormOutlined />}
                  disabled={!planModelState.isSelected}
                  onClick={() => {
                    setEditDrawerVisible(true);
                  }}
                />
              </Tooltip>
              <Tooltip title="Design" placement="left">
                <Button
                  icon={<HighlightOutlined />}
                  disabled={!planModelState.isSelected}
                  onClick={() => {
                    setDesignDrawerVisible(true);
                  }}
                />
              </Tooltip>
              <Tooltip title="Remove" placement="left">
                <Button
                  icon={<DeleteOutlined />}
                  disabled={!planModelState.isSelected}
                  onClick={() => {
                    if (planModelState.cellType === 'node') {
                      Modal.confirm({
                        title: 'Are you sure to remove this node?',
                        icon: <ExclamationCircleOutlined />,
                        content: '',
                        onOk() {
                          if (xflowApp) {
                            xflowApp.commandService.executeCommand<NsNodeCmd.DelNode.IArgs>(
                              XFlowNodeCommands.DEL_NODE.id,
                              {
                                nodeConfig: planModelState.cellConfig,
                              },
                            );
                          }
                        },
                        onCancel() {},
                      });
                    } else if (planModelState.cellType === 'edge') {
                      Modal.confirm({
                        title: 'Are you sure to remove this edge?',
                        icon: <ExclamationCircleOutlined />,
                        content: '',
                        onOk() {
                          if (xflowApp) {
                            xflowApp.commandService.executeCommand<NsEdgeCmd.DelEdge.IArgs>(
                              XFlowEdgeCommands.DEL_EDGE.id,
                              {
                                edgeConfig: planModelState.cellConfig,
                              },
                            );
                          }
                        },
                        onCancel() {},
                      });
                    }
                  }}
                />
              </Tooltip>
              <Divider style={{ margin: '0' }} />
              <Tooltip title="Reload" placement="left">
                <Button
                  icon={<ReloadOutlined />}
                  disabled={false}
                  onClick={() => {
                    Modal.confirm({
                      title: 'Are you sure to reload this model?',
                      icon: <ExclamationCircleOutlined />,
                      content: '',
                      onOk() {
                        loadModel(modelId);
                      },
                      onCancel() {},
                    });
                  }}
                />
              </Tooltip>
              <Divider style={{ margin: '0' }} />
              <Tooltip title="Save" placement="left">
                <Button
                  icon={<SaveOutlined />}
                  disabled={false}
                  onClick={() => {
                    if (xflowApp) {
                      xflowApp.executeCommand<NsGraphCmd.SaveGraphData.IArgs>(
                        XFlowGraphCommands.SAVE_GRAPH_DATA.id,
                        {
                          saveGraphDataService: async (_meta, data) => {
                            const updatePlan = {
                              projectId,
                              id: modelId,
                              modelCells: JSON.stringify(data),
                            };
                            updatePlanModelCells(updatePlan).then(() => {
                              message.success('Save successfully!');
                            });
                          },
                        },
                      );
                    }
                  }}
                />
              </Tooltip>
            </Space>
          </Drawer>
        </XFlow>
      </Drawer>
      <Add
        xflowApp={xflowApp}
        projectId={projectId}
        drawerVisible={addDrawerVisible}
        setDrawerVisible={setAddDrawerVisible}
      />
      <View
        projectId={projectId}
        modelId={modelId}
        drawerVisible={viewDrawerVisible}
        setDrawerVisible={setViewDrawerVisible}
        planModelState={planModelState}
      />
      <Edit
        projectId={projectId}
        modelId={modelId}
        drawerVisible={editDrawerVisible}
        setDrawerVisible={setEditDrawerVisible}
        planModelState={planModelState}
      />
      <Design
        xflowApp={xflowApp}
        projectId={projectId}
        drawerVisible={designDrawerVisible}
        setDrawerVisible={setDesignDrawerVisible}
        planModelState={planModelState}
      />
      <RollUp
        xflowApp={xflowApp}
        projectId={projectId}
        modelId={modelId}
        setModelId={setModelId}
        setModelName={setModelName}
        parentCount={parentCount}
        setParentCount={setParentCount}
        drawerVisible={rollupDrawerVisible}
        setDrawerVisible={setRollUpDrawerVisible}
      />
    </>
  );
};

export default Model;
