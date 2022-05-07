import { Button, Drawer, Space } from 'antd';
import type { Dispatch, FC } from 'react';
import { useCallback } from 'react';
import { useRef } from 'react';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { getPlanModelProcessGrid } from '@/services/plan/api';
import type { PlanModelProcess } from '@/services/plan/data';
import { CloseOutlined } from '@ant-design/icons';
import CreateEdgeProcess from './create';
import EditEdgeProcess from './edit';
import DeleteEdgeProcess from './delete';

type Props = {
  projectId: number;
  modelId: string;
  sourceId: string;
  sourceType: string;
  targetId: string;
  targetType: string;
  drawerVisible: boolean;
  setDrawerVisible: Dispatch<React.SetStateAction<boolean>>;
};

const EditEdge: FC<Props> = ({
  projectId,
  modelId,
  sourceId,
  sourceType,
  targetId,
  targetType,
  drawerVisible,
  setDrawerVisible,
}) => {
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<PlanModelProcess>[] = [
    {
      title: 'Index',
      dataIndex: 'index',
      valueType: 'index',
      search: false,
    },
    {
      title: 'Source Name',
      dataIndex: 'processSourceName',
      sorter: true,
    },
    {
      title: 'Target Name',
      dataIndex: 'processTargetName',
      sorter: true,
    },
    {
      title: 'Option',
      dataIndex: 'pkid',
      search: false,
      render: (_, row) => [
        <Space size={'small'}>
          <EditEdgeProcess
            projectId={projectId}
            modelId={modelId}
            edgeSourceId={row.edgeSourceId}
            edgeTargetId={row.edgeTargetId}
            planSourceId={row.planSourceId}
            planTargetId={row.planTargetId}
            processSourceId={row.processSourceId}
            processTargetId={row.processTargetId}
            drawerVisible={false}
            setDrawerVisible={() => {}}
            buttonVisible={true}
          />
          <DeleteEdgeProcess
            projectId={projectId}
            modelId={modelId}
            edgeSourceId={row.edgeSourceId}
            edgeTargetId={row.edgeTargetId}
            planSourceId={row.planSourceId}
            planTargetId={row.planTargetId}
            processSourceId={row.processSourceId}
            processTargetId={row.processTargetId}
            actionRef={actionRef}
          />
        </Space>,
      ],
    },
  ];
  const callbackDrawerVisible = useCallback(() => {
    setDrawerVisible(false);
  }, [setDrawerVisible]);

  return (
    <Drawer
      visible={drawerVisible}
      maskClosable={false}
      title="Edit"
      width="100%"
      closable={false}
      extra={
        <Button icon={<CloseOutlined />} style={{ border: 0 }} onClick={callbackDrawerVisible} />
      }
      onClose={callbackDrawerVisible}
    >
      <ProTable
        headerTitle="Processes"
        actionRef={actionRef}
        search={false}
        pagination={false}
        columns={columns}
        toolBarRender={() => [
          <CreateEdgeProcess
            projectId={projectId}
            modelId={modelId}
            sourceId={sourceId}
            sourceType={sourceType}
            targetId={targetId}
            targetType={targetType}
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
          return getPlanModelProcessGrid(params, sort, projectId, modelId, sourceId, targetId);
        }}
      />
    </Drawer>
  );
};
export default EditEdge;
