import type { Dispatch, FC } from 'react';
import { useState } from 'react';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { ListPagination } from '@/services/home/data';

import styles from '@/style/custom.less';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Space } from 'antd';
import { FormattedMessage } from 'umi';
import type { PlanInfo } from '@/services/plan/data';
import { getPlanGrid } from '@/services/plan/api';
import { NodeAttrs, NodePorts } from '../config/node';
import type { IApplication, NsNodeCmd } from '@antv/xflow';
import { XFlowNodeCommands } from '@antv/xflow';

type Props = {
  projectId: number;
  xflowApp: IApplication | undefined;
  drawerVisible: boolean;
  setDrawerVisible: Dispatch<React.SetStateAction<boolean>>;
};

const AddPlan: FC<Props> = ({ xflowApp, projectId, drawerVisible, setDrawerVisible }) => {
  const [selectRow, setSelectRow] = useState<PlanInfo>();
  // const [selectRow, setSelectRow] = useState<PlanInfo>();
  const columns: ProColumns<PlanInfo>[] = [
    {
      title: <FormattedMessage id="plan.index" defaultMessage="Index" />,
      dataIndex: 'index',
      valueType: 'index',
      search: false,
    },
    {
      title: <FormattedMessage id="plan.dataName" defaultMessage="Index" />,
      dataIndex: 'dataName',
      sorter: true,
    },
    {
      title: <FormattedMessage id="plan.planType" defaultMessage="Plan Type" />,
      dataIndex: 'planType',
      sorter: true,
    },
    {
      title: <FormattedMessage id="plan.description" defaultMessage="Description" />,
      dataIndex: 'description',
      valueType: 'textarea',
      search: false,
    },
    {
      title: <FormattedMessage id="plan.lastChange" defaultMessage="Last Change" />,
      dataIndex: 'lastChange',
      valueType: 'dateTime',
      sorter: true,
      search: false,
    },
    {
      title: <FormattedMessage id="plan.version" defaultMessage="Version" />,
      dataIndex: 'version',
      search: false,
    },
  ];

  const onAddToModel = () => {
    if (selectRow) {
      if (xflowApp) {
        xflowApp.getGraphInstance().then(async (graph) => {
          const area = graph.getGraphArea();
          const newNode = {
            id: selectRow.id,
            x: (area.x + area.width) / 2 - 50,
            y: (area.y + area.height) / 2 - 15,
            width: 100,
            height: 30,
            attrs: NodeAttrs(selectRow.dataName),
            ports: NodePorts(selectRow.id),
            info: {
              type: 'plan',
            },
          };
          xflowApp.commandService.executeCommand<NsNodeCmd.AddNode.IArgs>(
            XFlowNodeCommands.ADD_NODE.id,
            {
              nodeConfig: newNode,
            },
          );
          setDrawerVisible(false);
        });
      }
    }
  };

  return (
    <PageContainer
      className={drawerVisible ? styles.disabled : styles.hidden}
      header={{ title: '', subTitle: '' }}
      footer={[
        <Space size={'middle'} className={styles.footer_right}>
          <Button onClick={() => setDrawerVisible(false)}>Cancel</Button>
          <Button onClick={onAddToModel} type="primary">
            Add
          </Button>
        </Space>,
      ]}
    >
      <ProTable<PlanInfo, ListPagination>
        search={{
          defaultCollapsed: false,
        }}
        request={(
          params: {
            pageSize: number;
            current: number;
          },
          sort,
        ) => {
          return getPlanGrid(params, sort, projectId);
        }}
        columns={columns}
        rowClassName={(record) => {
          return record.dataName === selectRow?.dataName ? styles.split_row_select_active : '';
        }}
        onRow={(record) => {
          return {
            onClick: () => {
              if (record) {
                setSelectRow(record);
              }
            },
          };
        }}
      />
    </PageContainer>
  );
};

export default AddPlan;
