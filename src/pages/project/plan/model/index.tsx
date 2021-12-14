import type { FC } from 'react';
import { useEffect, useState } from 'react';
import type { IAppLoad, NsGraph, NsGraphCmd } from '@antv/xflow';
import {
  FlowchartExtension,
  FlowchartCanvas,
  XFlow,
  createGraphConfig,
  XFlowGraphCommands,
} from '@antv/xflow';
import { PageContainer } from '@ant-design/pro-layout';
import { getProject } from '@/services/project/api';
import { getPlanModel } from '@/services/plan/api';
import Toolbar from './toolbar';
import './index.css';
import './index.less';

export const useGraphConfig = createGraphConfig((graphConfig) => {
  graphConfig.setDefaultNodeRender((props) => {
    return <div> {props.data.label} </div>;
  });
});

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
  const [isOnLoad, setIsOnLoad] = useState(false);

  const onLoad: IAppLoad = async (app) => {
    if (!isOnLoad) {
      getPlanModel(projectid, id).then((result) => {
        // setParentCount(result.parentCount);
        setPlanName(result.name);
        const childrenJson = JSON.parse(result.childrenJson);
        if (childrenJson !== null) {
          const graphData: NsGraph.IGraphData = childrenJson.data;
          app.executeCommand<NsGraphCmd.GraphRender.IArgs>(XFlowGraphCommands.GRAPH_RENDER.id, {
            graphData,
          });
          setIsOnLoad(true);
        }
      });
    }
    return app;
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
          <Toolbar projectId={projectid} id={id} />
          <FlowchartExtension />
          <FlowchartCanvas position={{ top: 0, left: 0, right: 0, bottom: 0 }} />
        </XFlow>
      </div>
    </PageContainer>
  );
};

export default PlanModel;
