import type { FC } from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import { EditableProTable } from '@ant-design/pro-table';
import { creatProject, deleteProject, getProjectList, updateProject } from '@/services/project/api';
import type { ProjectListItem, ProjectListPagination } from '@/services/project/data';
import ProCard from '@ant-design/pro-card';
import { message } from 'antd';
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
  const [editableKeys, setEditableKeys] = useState<React.Key[]>([]);
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
    {
      title: 'Option',
      valueType: 'option',
      render: (_, record: ProjectListItem, _index, action) => [
        <a
          key="edit"
          onClick={() => {
            action?.startEditable?.(record.id);
          }}
        >
          Edit
        </a>,
        <a
          key="delete"
          onClick={() => {
            deleteProject(record.id).then(async (result) => {
              if (result === 'ok') {
                message.success('Delete successfully!');
              } else {
                message.error(result);
              }
              actionRef.current?.reload();
            });
          }}
        >
          Delete
        </a>,
      ],
    },
  ];
  if (oldSearchValue !== searchValue) {
    oldSearchValue = searchValue;
    actionRef.current?.reload();
  }
  return (
    <ProCard title="Project" bordered={false} collapsible>
      <EditableProTable<ProjectListItem, ProjectListPagination>
        actionRef={actionRef}
        recordCreatorProps={{
          record: () => {
            return {
              id: -1,
            };
          },
        }}
        columns={columns}
        rowKey="id"
        request={(
          params: {
            pageSize: number;
            current: number;
          },
          sort,
        ) => {
          return getProjectList(params, sort, searchValue);
        }}
        editable={{
          editableKeys,
          onSave: async (key, record) => {
            if (key === -1) {
              creatProject(record).then(async (result) => {
                if (result === 'ok') {
                  message.success('Create successfully!');
                } else {
                  message.error(result);
                }
                actionRef.current?.reload();
              });
            } else {
              updateProject(record).then(async (result) => {
                if (result === 'ok') {
                  message.success('Edit successfully!');
                } else {
                  message.error(result);
                }
                actionRef.current?.reload();
              });
            }
          },
          onChange: (keys) => {
            setEditableKeys(keys);
          },
          onDelete: async (key, record) => {
            if (key === -1) {
              message.success('Nothing to Delete!');
            } else {
              deleteProject(record.id).then(async (result) => {
                if (result === 'ok') {
                  message.success('Delete successfully!');
                } else {
                  message.error(result);
                }
                actionRef.current?.reload();
              });
            }
          },
        }}
      />
    </ProCard>
    // <div className={styles.filterCardList}>
    //   <ProTable<ProjectListItem, ProjectListPagination>
    //     actionRef={actionRef}
    //     search={false}
    //     request={(
    //       params: {
    //         pageSize: number;
    //         current: number;
    //       },
    //       sort,
    //     ) => {
    //       return getProjectList(params, sort, searchValue);
    //     }}
    //     columns={columns}
    //   />

    // </div>
  );
};

export default TableList;
