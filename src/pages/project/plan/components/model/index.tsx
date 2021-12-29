import type { Dispatch, FC, SetStateAction } from 'react';
import { useState } from 'react';
import type { IApplication, IAppLoad, NsEdgeCmd, NsGraph, NsGraphCmd } from '@antv/xflow';
import { XFlowEdgeCommands, XFlowCanvas } from '@antv/xflow';
import { XFlow, XFlowGraphCommands } from '@antv/xflow';
import { getPlanModel } from '@/services/plan/api';
import Toolbar from './toolbar';
import './index.css';
import './index.less';
import { useGraphConfig } from './toolbar/config/graph';
import { EdgeAttrs, EdgeConnector, EdgeRouter } from './toolbar/config/edge';

type Props = {
  projectId: number;
  planId: string;
  setModelId: Dispatch<SetStateAction<string>>;
};

const PlanModelBuilder: FC<Props> = ({ projectId, planId, setModelId }) => {
  const [isOnLoad, setIsOnLoad] = useState(false);
  const [toolbar, setToolbar] = useState<JSX.Element>(<></>);

  // const updateModelId = useCallback(
  //   (newModelId: string) => {
  //     setModelId(newModelId);
  //   },
  //   [setModelId],
  // );

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

  const onLoad: IAppLoad = async (app) => {
    if (!isOnLoad) {
      getPlanModel(projectId, planId).then((result) => {
        setToolbar(
          <Toolbar
            projectId={projectId}
            planId={planId}
            parentCount={result.parentCount}
            setModelId={setModelId}
          />,
        );
        const childrenJson = JSON.parse(result.childrenJson);
        if (childrenJson !== null) {
          const graphData: NsGraph.IGraphData = childrenJson;
          app.executeCommand<NsGraphCmd.GraphRender.IArgs>(XFlowGraphCommands.GRAPH_RENDER.id, {
            graphData,
          });
          setIsOnLoad(true);
        }
      });
    }
    await watchEvent(app);
  };
  return (
    <XFlow onLoad={onLoad}>
      {toolbar}
      <XFlowCanvas config={useGraphConfig()} position={{ top: 0, left: 0, right: 0, bottom: 0 }} />
    </XFlow>
  );
};

export default PlanModelBuilder;
