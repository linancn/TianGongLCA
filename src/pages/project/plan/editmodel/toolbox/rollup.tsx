import type { FC } from 'react';
import { useState } from 'react';
import styles from '../index.less';
import { Button, Drawer, Space } from 'antd';
import { getPlanParentGrid } from '@/services/plan/api';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { PlanInfo, PlanListPagination } from '@/services/plan/data';

type rollUpProps = {
  projectId: number;
  planId: string;
  parentCount: number;
};

const RollUp: FC<rollUpProps> = ({ projectId, planId, parentCount }) => {
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [selectParent, setSelectParent] = useState<PlanInfo>();

  const columns: ProColumns<PlanInfo>[] = [
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

  const onRollUpSingleParent = () => {
    getPlanParentGrid({}, {}, projectId, planId).then((result) => {
      window.location.replace(
        `/project/plan/editmodel?projectid=${projectId}&id=${result.data[0].id}`,
      );
    });
  };

  const onOpen = () => {
    if (selectParent) {
      window.location.replace(
        `/project/plan/editmodel?projectid=${projectId}&id=${selectParent.id}`,
      );
    }
  };

  if (parentCount === 1) {
    return (
      <Button key="RollUp" onClick={onRollUpSingleParent} block>
        Roll Up
      </Button>
    );
  }
  if (parentCount > 1) {
    return (
      <>
        <Button key="RollUp" onClick={() => setIsDrawerVisible(true)} block>
          Roll Up
        </Button>
        <Drawer
          visible={isDrawerVisible}
          title="Roll Up"
          width="800px"
          onClose={() => setIsDrawerVisible(false)}
          footer={
            <Space size={'middle'} className={styles.footer_space}>
              <Button onClick={() => setIsDrawerVisible(false)}>Cancel</Button>
              <Button onClick={onOpen} type="primary">
                Open
              </Button>
            </Space>
          }
        >
          <ProTable<PlanInfo, PlanListPagination>
            search={false}
            request={(
              params: {
                pageSize: number;
                current: number;
              },
              sort,
            ) => {
              return getPlanParentGrid(params, sort, projectId, planId);
            }}
            columns={columns}
            rowClassName={(record) => {
              return record.name === selectParent?.name ? styles['split-row-select-active'] : '';
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
      </>
    );
  }
  return (
    <Button key="RollUp" block disabled={true}>
      Roll Up
    </Button>
  );
};
export default RollUp;
