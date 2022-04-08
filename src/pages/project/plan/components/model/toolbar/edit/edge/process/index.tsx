import { Button, Drawer, Space } from 'antd';
import type { Dispatch, FC } from 'react';
import { useCallback, useRef } from 'react';
import styles from '@/style/custom.less';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { CloseOutlined } from '@ant-design/icons';
import { getPlanModelFlowGrid } from '@/services/plan/api';
import type { PlanModelFlow } from '@/services/plan/data';
import CreateEdgeFlow from './create';

type Props = {
  projectId: number;
  modelId: string;
  sourceId: string;
  targetId: string;
  drawerVisible: boolean;
  setDrawerVisible: Dispatch<React.SetStateAction<boolean>>;
};

const EditEdgeProcess: FC<Props> = ({
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
      dataIndex: 'flowSourceName',
      sorter: true,
      render: (_, row) => [
        <Space size={'small'} className={styles.footer_left}>
          {row.flowSourceName}
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
      dataIndex: 'flowTargetName',
      sorter: true,
      render: (_, row) => [
        <Space size={'small'} className={styles.footer_left}>
          {row.flowTargetName}
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
      title="Edit"
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
        toolBarRender={() => [
          <CreateEdgeFlow
            projectId={projectId}
            planId={modelId}
            edgeSourceId={sourceId}
            edgeTargetId={targetId}
            actionRef={actionRef}
          />,
        ]}
        request={(
          params: {
            pageSize: number;
            current: number;
          },
          sort,
        ) => {
          return getPlanModelFlowGrid(
            params,
            sort,
            projectId,
            modelId,
            sourceId,
            targetId,
            '',
            '',
            sourceId,
            targetId,
          );
        }}
      />
    </Drawer>
  );
};
export default EditEdgeProcess;
