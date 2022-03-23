import { Button, Drawer, Space } from 'antd';
import type { Dispatch, FC } from 'react';
import { useCallback, useRef } from 'react';
import styles from '@/style/custom.less';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { CloseOutlined } from '@ant-design/icons';
import { getPlanModelFlowGrid } from '@/services/plan/api';
import type { PlanModelFlow } from '@/services/plan/data';

type Props = {
  projectId: number;
  modelId: string;
  sourceId: string;
  targetId: string;
  drawerVisible: boolean;
  setDrawerVisible: Dispatch<React.SetStateAction<boolean>>;
};

const ViewEdge: FC<Props> = ({
  projectId,
  modelId,
  sourceId,
  targetId,
  drawerVisible,
  setDrawerVisible,
}) => {
  const actionRef = useRef<ActionType>();
  const callbackDrawerVisible = useCallback(() => {
    setDrawerVisible(false);
  }, [setDrawerVisible]);

  const columns: ProColumns<PlanModelFlow>[] = [
    {
      title: '',
      // render: (_, row) => [
      // <EdgeProcessDelete pkid={row.pkid} actionRef={actionRef} />
      // ],
    },
    {
      title: 'Source Name',
      dataIndex: 'flowSourceId',
      sorter: true,
      render: (_, row) => [
        <Space size={'small'} className={styles.footer_left}>
          {row.flowSourceId}
        </Space>,
        <Space size={'small'} className={styles.footer_right}>
          {/* <EdgeProcessView projectId={projectId} id={row.flowSourceId} /> */}
          {/* <EdgeProcessSelect
            pkid={row.pkid}
            projectId={projectId}
            processId={sourceId}
            st={'source'}
            actionRef={actionRef}
          /> */}
        </Space>,
      ],
    },
    {
      title: '',
    },
    {
      title: 'Target Name',
      dataIndex: 'flowTargetId',
      sorter: true,
      render: (_, row) => [
        <Space size={'small'} className={styles.footer_left}>
          {row.flowTargetId}
        </Space>,
        <Space size={'small'} className={styles.footer_right}>
          {/* <EdgeProcessView projectId={projectId} id={row.flowTargetId} /> */}
          {/* <EdgeProcessSelect
            pkid={row.pkid}
            projectId={projectId}
            processId={targetId}
            st={'target'}
            actionRef={actionRef}
          /> */}
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
        columns={columns}
        toolBarRender={() => []}
        request={(
          params: {
            pageSize: number;
            current: number;
          },
          sort,
        ) => {
          return getPlanModelFlowGrid(params, sort, projectId, modelId, sourceId, targetId);
        }}
      />
    </Drawer>
  );
};
export default ViewEdge;
