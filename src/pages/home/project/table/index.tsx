import type { FC } from 'react';
import { useRef } from 'react';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { getProjectList } from '@/services/project/list';
import type { ProjectListItem, ProjectListPagination } from 'mock/project/list.d';
import styles from './style.less';
/**
 * 更新节点
 *
 * @param fields
 */

type ProjectListProps = {
  location: {
    query: {
      searchValue: string;
    };
  };
};
let oldSearchValue = '';
const TableList: FC<ProjectListProps> = (porps) => {
  const actionRef = useRef<ActionType>();
  const { searchValue } = porps.location.query;
  const columns: ProColumns<ProjectListItem>[] = [
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: true,
    },
    {
      title: 'Created At',
      dataIndex: 'createAt',
      valueType: 'dateTime',
      sorter: true,
    },
    {
      title: 'Last Update',
      dataIndex: 'lastUpdate',
      valueType: 'dateTime',
      sorter: true,
    },
    {
      title: 'Comment',
      dataIndex: 'comment',
      valueType: 'textarea',
    },
    {
      title: 'Flag',
      dataIndex: 'flag',
      sorter: true,
    },
  ];
  if (oldSearchValue !== searchValue) {
    oldSearchValue = searchValue;
    actionRef.current?.reload();
  }
  return (
    <div className={styles.filterCardList}>
      <ProTable<ProjectListItem, ProjectListPagination>
        actionRef={actionRef}
        search={false}
        request={(
          params: {
            pageSize: number;
            current: number;
          },
          sort,
        ) => {
          return getProjectList(params, sort, searchValue);
        }}
        columns={columns}
      />
    </div>
  );
};

export default TableList;
