import type { FC } from 'react';
import { useEffect, useState } from 'react';
import type { IApplication, IAppLoad, NsEdgeCmd, NsGraph, NsGraphCmd } from '@antv/xflow';
import { XFlowEdgeCommands, XFlowCanvas } from '@antv/xflow';
import { XFlow, XFlowGraphCommands } from '@antv/xflow';
import { PageContainer } from '@ant-design/pro-layout';
import { getProject } from '@/services/project/api';
import { getPlanModel } from '@/services/plan/api';
import Toolbar from './toolbar';
import './index.css';
import './index.less';
import { useGraphConfig } from './toolbar/config/graph';
import { EdgeAttrs, EdgeConnector, EdgeRouter } from './toolbar/config/edge';

type Props = {
  location: {
    query: {
      projectid: number;
      id: string;
    };
  };
  meta: { flowId: string };
};

const PlanModel: FC<Props> = (props) => {
  const { projectid, id } = props.location.query;
  const [projectName, setProjectName] = useState('');
  const [planName, setPlanName] = useState('');
  const [parentCount, setParentCount] = useState(0);
  const [isOnLoad, setIsOnLoad] = useState(false);

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
      getPlanModel(projectid, id).then((result) => {
        setParentCount(result.parentCount);
        setPlanName(result.name);
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

  useEffect(() => {
    getProject(projectid).then((result) => setProjectName(result.name + ' - '));
  }, [projectid]);

  return (
    <PageContainer
      header={{
        title: (
          <>
            {projectName}
            {planName}
          </>
        ),
      }}
    >
      <div style={{ width: '100%', height: '100%', position: 'absolute' }}>
        <XFlow onLoad={onLoad}>
          <Toolbar projectId={projectid} id={id} parentCount={parentCount} />
          <XFlowCanvas
            config={useGraphConfig()}
            position={{ top: 0, left: 0, right: 0, bottom: 0 }}
          />
        </XFlow>
      </div>
    </PageContainer>
  );
};

export default PlanModel;
