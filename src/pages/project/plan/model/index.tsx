import type { FC } from 'react';
import type { IAppLoad, NsGraph, NsGraphCmd } from '@antv/xflow';
import {
  XFlow,
  createGraphConfig,
  XFlowCanvas,
  XFlowGraphCommands,
  CanvasToolbar,
} from '@antv/xflow';
import { PageContainer } from '@ant-design/pro-layout';
import { FormattedMessage } from 'umi';
import './index.css';
import { useToolbarConfig } from './toolbar/config';

export interface Props {
  anything: string;
}

export const useGraphConfig = createGraphConfig((graphConfig) => {
  graphConfig.setDefaultNodeRender((props) => {
    return <div> {props.data.label} </div>;
  });
});

const XFlowDemo: FC<Props> = (props) => {
  const graphData: NsGraph.IGraphData = {
    nodes: [
      {
        id: 'node1',
        width: 100,
        height: 30,
        attrs: {
          body: {
            stroke: '#1890ff',
            fill: '#fff',
            strokeWidth: '1',
            strokeLinejoin: 'round',
          },
          label: {
            text: '算法节点-1',
            fill: '#333',
          },
        },
      },
      {
        id: 'node2',
        width: 100,
        height: 30,
        attrs: {
          body: {
            stroke: '#1890ff',
            fill: '#fff',
            strokeWidth: '1',
            strokeLinejoin: 'round',
          },
          label: {
            text: '算法节点-2',
            fill: '#333',
          },
        },
      },
      {
        id: 'node3',
        width: 100,
        height: 30,
        attrs: {
          body: {
            stroke: '#1890ff',
            fill: '#fff',
            strokeWidth: '1',
            strokeLinejoin: 'round',
          },
          label: {
            text: '算法节点-3',
            fill: '#333',
          },
        },
      },
      {
        id: 'node4',
        width: 100,
        height: 30,
        attrs: {
          body: {
            stroke: '#1890ff',
            fill: '#fff',
            strokeWidth: '1',
            strokeLinejoin: 'round',
          },
          label: {
            text: '算法节点-4',
            fill: '#333',
          },
        },
      },
    ],
    edges: [
      {
        id: 'e1',
        source: 'node1',
        target: 'node2',
        router: 'orth',
        connector: 'rounded',
        attrs: {
          line: {
            stroke: '#1890ff',
            strokeWidth: '2',
            targetMarker: {
              name: 'block',
              height: 10,
              width: 6,
              offset: -4,
            },
          },
        },
      },
      {
        id: 'e2',
        source: 'node1',
        target: 'node3',
        router: 'orth',
        connector: 'rounded',
        attrs: {
          line: {
            stroke: '#1890ff',
            strokeWidth: '2',
            targetMarker: {
              name: 'block',
              height: 10,
              width: 6,
              offset: -4,
            },
          },
        },
      },
      {
        id: 'e3',
        source: 'node1',
        target: 'node4',
        router: 'orth',
        connector: 'rounded',
        attrs: {
          line: {
            stroke: '#1890ff',
            strokeWidth: '2',
            targetMarker: {
              name: 'block',
              height: 10,
              width: 6,
              offset: -4,
            },
          },
        },
      },
    ],
  };
  const graphConfig = useGraphConfig(props);
  const toolbarConfig = useToolbarConfig(props);
  const onLoad: IAppLoad = async (app) => {
    await app.executeCommand<NsGraphCmd.GraphRender.IArgs>(XFlowGraphCommands.GRAPH_RENDER.id, {
      graphData,
    });
    // await app.executeCommand<NsGraphCmd.GraphZoom.IArgs>(XFlowGraphCommands.GRAPH_ZOOM.id, {
    //   factor: 'real',
    // });
  };

  return (
    <PageContainer
      header={{
        title: (
          <>
            <FormattedMessage id="pages.plan" defaultMessage="Plan: " />
            test
          </>
        ),
      }}
    >
      <div style={{ width: '100%', height: '100%', position: 'absolute' }}>
        <XFlow onLoad={onLoad} className="xflow-workspace">
          <CanvasToolbar layout="vertical" config={toolbarConfig} position={{ top: 0, right: 0 }} />
          <XFlowCanvas config={graphConfig} position={{ top: 0, bottom: 0, left: 0, right: 0 }} />
        </XFlow>
      </div>
    </PageContainer>
  );
};

export default XFlowDemo;
