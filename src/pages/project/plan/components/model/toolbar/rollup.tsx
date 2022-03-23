import type { Dispatch, FC } from 'react';
import { useCallback } from 'react';
import { useState } from 'react';
import styles from '@/style/custom.less';
import { Button, Drawer, Space } from 'antd';
import { getPlanModelCells, getPlanParentGrid } from '@/services/plan/api';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { PlanInfo } from '@/services/plan/data';
import type { ListPagination } from '@/services/home/data';
import type { IApplication, NsGraph, NsGraphCmd } from '@antv/xflow';
import { XFlowGraphCommands } from '@antv/xflow';

type Props = {
  xflowApp: IApplication | undefined;
  projectId: number;
  modelId: string;
  setModelId: Dispatch<React.SetStateAction<string>>;
  setModelName: Dispatch<React.SetStateAction<string>>;
  parentCount: number;
  setParentCount: Dispatch<React.SetStateAction<number>>;
  drawerVisible: boolean;
  setDrawerVisible: Dispatch<React.SetStateAction<boolean>>;
};

const RollUp: FC<Props> = ({
  xflowApp,
  projectId,
  modelId,
  setModelId,
  setModelName,
  parentCount,
  setParentCount,
  drawerVisible,
  setDrawerVisible,
}) => {
  const [selectParent, setSelectParent] = useState<PlanInfo>();
  const columns: ProColumns<PlanInfo>[] = [
    {
      title: 'ID',
      dataIndex: 'index',
      valueType: 'index',
      search: false,
    },
    {
      title: 'Name',
      key: 'name',
      dataIndex: 'name',
      sorter: true,
    },
    {
      title: 'Comment',
      dataIndex: 'comment',
      valueType: 'textarea',
      search: false,
    },
    {
      title: 'Type',
      dataIndex: 'type',
      sorter: true,
    },
    {
      title: 'Nation',
      dataIndex: 'nation',
      sorter: true,
    },
    {
      title: 'Last Update',
      dataIndex: 'lastUpdateTime',
      valueType: 'dateTime',
      sorter: true,
      search: false,
    },
  ];

  const callbackDrawerVisible = useCallback(() => {
    setDrawerVisible(false);
  }, [setDrawerVisible]);

  const callbackValues = useCallback(
    (id: string, name: string, pc: number) => {
      setModelId(id);
      setModelName(name);
      setParentCount(pc);
      setDrawerVisible(false);
    },
    [setDrawerVisible, setModelId, setModelName, setParentCount],
  );

  const onOpen = () => {
    if (selectParent) {
      getPlanModelCells(projectId, selectParent.id).then((pm) => {
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
        callbackValues(pm.id, pm.dataName, pm.parentCount);
      });
    }
  };

  if (parentCount > 1) {
    return (
      <Drawer
        visible={drawerVisible}
        title="Roll Up"
        width="800px"
        onClose={callbackDrawerVisible}
        footer={
          <Space size={'middle'} className={styles.footer_space}>
            <Button onClick={callbackDrawerVisible}>Cancel</Button>
            <Button onClick={onOpen} type="primary">
              Open
            </Button>
          </Space>
        }
      >
        <ProTable<PlanInfo, ListPagination>
          search={false}
          request={(
            params: {
              pageSize: number;
              current: number;
            },
            sort,
          ) => {
            return getPlanParentGrid(params, sort, projectId, modelId);
          }}
          columns={columns}
          rowClassName={(record) => {
            return record.dataName === selectParent?.dataName
              ? styles['split-row-select-active']
              : '';
          }}
          onRow={(record) => {
            return {
              onClick: () => {
                if (record) {
                  setSelectParent(record);
                }
              },
            };
          }}
        />
      </Drawer>
    );
  }
  return <></>;
};
export default RollUp;
