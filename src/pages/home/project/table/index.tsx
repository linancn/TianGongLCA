import type { FC } from 'react';
import { useRef } from 'react';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { getProjectList } from '@/services/project/list';
import type { ProjectListItem, ProjectListPagination } from '@/services/project/list.d';
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
const TableList: FC<ProjectListProps> = (props) => {
  const actionRef = useRef<ActionType>();
  const { searchValue } = props.location.query;
  const columns: ProColumns<ProjectListItem>[] = [
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: true,
    },
    {
      title: 'Created At',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      sorter: true,
    },
    {
      title: 'Last Update',
      dataIndex: 'lastUpdateTime',
      valueType: 'dateTime',
      sorter: true,
    },
    {
      title: 'Comment',
      dataIndex: 'comment',
      valueType: 'textarea',
    },
    // {
    //   title: 'Nation',
    //   dataIndex: 'nation',
    //   sorter: true,
    // },
    // {
    //   title: 'Type',
    //   dataIndex: 'type',
    //   sorter: true,
    // },
    {
      title: 'Star',
      dataIndex: 'star',
      sorter: false,
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
