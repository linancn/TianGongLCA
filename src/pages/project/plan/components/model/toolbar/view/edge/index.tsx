import { Button, Drawer, Space } from 'antd';
import type { Dispatch, FC } from 'react';
import { useCallback, useRef } from 'react';
import styles from '@/style/custom.less';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { getEdgeProcessFlowGrid } from '@/services/edgeprocessflow/api';
import type { EdgeProcessFlow } from '@/services/edgeprocessflow/data';
import EdgeProcessView from './view';
import { CloseOutlined } from '@ant-design/icons';

type Props = {
  projectId: number;
  planId: string;
  sourceId: string;
  targetId: string;
  drawerVisible: boolean;
  setDrawerVisible: Dispatch<React.SetStateAction<boolean>>;
};

const ViewEdge: FC<Props> = ({
  projectId,
  planId,
  sourceId,
  targetId,
  drawerVisible,
  setDrawerVisible,
}) => {
  const actionRef = useRef<ActionType>();
  const callbackDrawerVisible = useCallback(() => {
    setDrawerVisible(false);
  }, [setDrawerVisible]);

  const edgeColumns: ProColumns<EdgeProcessFlow>[] = [
    {
      title: 'Source Name',
      dataIndex: 'sourceFlowName',
      sorter: true,
      render: (_, row) => [
        <Space size={'small'} className={styles.footer_left}>
          {row.sourceFlowName}
        </Space>,
        <Space size={'small'} className={styles.footer_right}>
          <EdgeProcessView projectId={projectId} id={row.sourceFlowId} />
        </Space>,
      ],
    },
    {
      title: '',
    },
    {
      title: 'Target Name',
      dataIndex: 'targetFlowName',
      sorter: true,
      render: (_, row) => [
        <Space size={'small'} className={styles.footer_left}>
          {row.targetFlowName}
        </Space>,
        <Space size={'small'} className={styles.footer_right}>
          <EdgeProcessView projectId={projectId} id={row.targetFlowId} />
        </Space>,
      ],
    },
  ];
  return (
    <Drawer
      visible={drawerVisible}
      maskClosable={false}
      title="View"
      width="750px"
      closable={false}
      extra={
        <Button icon={<CloseOutlined />} style={{ border: 0 }} onClick={callbackDrawerVisible} />
      }
      onClose={callbackDrawerVisible}
    >
      <ProTable
        actionRef={actionRef}
        search={false}
        pagination={false}
        columns={edgeColumns}
        toolBarRender={() => []}
        request={(
          params: {
            pageSize: number;
            current: number;
          },
          sort,
        ) => {
          return getEdgeProcessFlowGrid(params, sort, projectId, planId, sourceId, targetId);
        }}
      />
    </Drawer>
  );
};
export default ViewEdge;
