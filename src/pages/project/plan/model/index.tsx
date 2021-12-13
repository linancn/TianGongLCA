import type { FC } from 'react';
import { useEffect, useState } from 'react';
import type { IAppLoad, NsGraph, NsGraphCmd } from '@antv/xflow';
import { FlowchartCanvas, XFlow, createGraphConfig, XFlowGraphCommands } from '@antv/xflow';
import { PageContainer } from '@ant-design/pro-layout';
import './index.css';
import './index.less';
import { getProject } from '@/services/project/api';
import { getPlanModel } from '@/services/plan/api';
import Toolbar from './toolbar';

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

  const graphData: NsGraph.IGraphData = {
    nodes: [],
    edges: [],
  };
  const onLoad: IAppLoad = async (app) => {
    await app.executeCommand<NsGraphCmd.GraphRender.IArgs>(XFlowGraphCommands.GRAPH_RENDER.id, {
      graphData,
    });
  };
  useEffect(() => {
    getProject(projectid).then((result) => setProjectName(result.name + ' - '));
    getPlanModel(projectid, id).then((result) => {
      // setParentCount(result.parentCount);
      setPlanName(result.name);
      const childrenJson = JSON.parse(result.childrenJson);
      if (childrenJson !== null) {
        // setElements(childrenJson.data);
      }
    });
  }, [id, projectid]);
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
          <FlowchartCanvas position={{ top: 0, left: 0, right: 0, bottom: 0 }} />
        </XFlow>
      </div>
    </PageContainer>
  );
};

export default PlanModel;
