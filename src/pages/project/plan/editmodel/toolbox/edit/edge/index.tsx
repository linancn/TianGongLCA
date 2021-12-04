import { Button, Drawer, Space } from 'antd';
import type { FC } from 'react';
import { useState, useRef } from 'react';
import styles from '@/style/custom.less';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { getEdgeProcessFlowGrid } from '@/services/edgeprocessflow/api';
import type { EdgeProcessFlow } from '@/services/edgeprocessflow/data';
import EdgeProcessCreate from './create';
import EdgeProcessView from './view';
import EdgeProcessSelect from './select';
import EdgeProcessDelete from './delete';

type Props = {
  projectId: number;
  planId: string;
  sourceId: string;
  targetId: string;
};

const EditEdge: FC<Props> = ({ projectId, planId, sourceId, targetId }) => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const actionRef = useRef<ActionType>();
  const edgeColumns: ProColumns<EdgeProcessFlow>[] = [
    {
      title: '',
      render: (_, row) => [<EdgeProcessDelete pkid={row.pkid} actionRef={actionRef} />],
    },
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
          <EdgeProcessSelect
            pkid={row.pkid}
            projectId={projectId}
            processId={sourceId}
            st={'source'}
            actionRef={actionRef}
          />
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
          <EdgeProcessSelect
            pkid={row.pkid}
            projectId={projectId}
            processId={targetId}
            st={'target'}
            actionRef={actionRef}
          />
        </Space>,
      ],
    },
  ];
  return (
    <>
      <Button key="Edit" onClick={() => setDrawerVisible(true)} block>
        Edit
      </Button>
      <Drawer
        visible={drawerVisible}
        maskClosable={false}
        title="Edit"
        width="750px"
        onClose={() => setDrawerVisible(false)}
      >
        <ProTable
          actionRef={actionRef}
          search={false}
          pagination={false}
          columns={edgeColumns}
          toolBarRender={() => [
            <EdgeProcessCreate
              projectId={projectId}
              planId={planId}
              sourceId={sourceId}
              targetId={targetId}
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
            return getEdgeProcessFlowGrid(params, sort, projectId, planId, sourceId, targetId);
          }}
        />
      </Drawer>
    </>
  );
};
export default EditEdge;
