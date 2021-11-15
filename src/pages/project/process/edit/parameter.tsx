import type { FC } from 'react';
import { useRef, useState } from 'react';
import ProCard from '@ant-design/pro-card';
import type { Parameter, ParameterListPagination } from '@/services/parameter/data';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import { EditableProTable } from '@ant-design/pro-table';
import {
  createParameter,
  deleteParameter,
  getParameterGrid,
  updateParameter,
} from '@/services/parameter/api';
import { message } from 'antd';

type ParameterProps = {
  projectId: number;
  processId: string;
};

const ParameterCard: FC<ParameterProps> = ({ projectId, processId }) => {
  const actionRef = useRef<ActionType>();
  const [editableKeys, setEditableKeys] = useState<React.Key[]>([]);

  const columns: ProColumns<Parameter>[] = [
    {
      title: 'ID',
      dataIndex: 'pkid',
      sorter: true,
      editable: false,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: true,
    },
    {
      title: 'Comment',
      dataIndex: 'comment',
    },
    {
      title: 'Option',
      valueType: 'option',
      width: 200,
      render: (_, record: Parameter, index, action) => [
        <a
          key="edit"
          onClick={() => {
            action?.startEditable?.(record.pkid);
          }}
        >
          Edit
        </a>,
        <a
          key="delete"
          onClick={() => {
            deleteParameter(record.pkid).then(async (result) => {
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

  return (
    <ProCard title="Parameters" bordered={false} collapsible>
      <EditableProTable<Parameter, ParameterListPagination>
        actionRef={actionRef}
        recordCreatorProps={{
          record: () => {
            return {
              pkid: -1,
              name: '',
              comment: '',
              projectId,
              processId,
            };
          },
        }}
        columns={columns}
        rowKey="pkid"
        request={(
          params: {
            pageSize: number;
            current: number;
          },
          sort,
        ) => {
          return getParameterGrid(params, sort, projectId, processId);
        }}
        editable={{
          editableKeys,
          onSave: async (key, record) => {
            if (key === -1) {
              createParameter(record).then(async (result) => {
                if (result === 'ok') {
                  message.success('Create successfully!');
                } else {
                  message.error(result);
                }
                actionRef.current?.reload();
              });
            } else {
              updateParameter(record).then(async (result) => {
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
        }}
      />
    </ProCard>
  );
};
export default ParameterCard;
