import type { Dispatch, FC } from 'react';
import { useState } from 'react';
import styles from '@/style/custom.less';
import { Button, Drawer, Space } from 'antd';
import { getPlanParentGrid } from '@/services/plan/api';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { PlanInfo } from '@/services/plan/data';
import type { ListPagination } from '@/services/home/data';

type Props = {
  projectId: number;
  planId: string;
  parentCount: number;
  drawerVisible: boolean;
  setDrawerVisible: Dispatch<React.SetStateAction<boolean>>;
};

const RollUp: FC<Props> = ({ projectId, planId, parentCount }) => {
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
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

  const onOpen = () => {
    if (selectParent) {
      window.location.replace(`/project/plan/model?projectid=${projectId}&id=${selectParent.id}`);
    }
  };

  if (parentCount > 1) {
    return (
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
        <ProTable<PlanInfo, ListPagination>
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
    );
  }
  return <></>;
};
export default RollUp;
