import type { FC } from 'react';
import { useRef, useState } from 'react';
import ProCard from '@ant-design/pro-card';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import { EditableProTable } from '@ant-design/pro-table';
import { Button, Drawer, message } from 'antd';
import type { FlowProcess } from '@/services/flowprocess/data';
import {
  createFlowProcess,
  deleteFlowProcess,
  getFlowProcessGrid,
  updateFlowProcess,
} from '@/services/flowprocess/api';
import type { ListPagination } from '@/services/home/data';

type OutputProps = {
  projectId: number;
  processId: string;
};

const OutputCard: FC<OutputProps> = ({ projectId, processId }) => {
  const actionRef = useRef<ActionType>();
  const [editableKeys, setEditableKeys] = useState<React.Key[]>([]);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);

  const columns: ProColumns<FlowProcess>[] = [
    {
      title: 'ID',
      dataIndex: 'pkid',
      sorter: true,
      editable: false,
    },
    {
      title: 'Comment',
      dataIndex: 'comment',
    },
    {
      title: 'Option',
      valueType: 'option',
      width: 200,
      render: (_, record: FlowProcess, index, action) => [
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
            deleteFlowProcess(record.pkid).then(async (result) => {
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
  const handleDrawerAddCancel = () => {
    setIsDrawerVisible(false);
  };
  return (
    <ProCard title="Outputs" bordered={false} collapsible>
      <Drawer visible={isDrawerVisible} title="Add" onClose={handleDrawerAddCancel}>
        <Button key="plan">Plan</Button> Or <Button key="process">Process</Button>
      </Drawer>
      <EditableProTable<FlowProcess, ListPagination>
        actionRef={actionRef}
        recordCreatorProps={{
          record: () => {
            return {
              pkid: -1,
              ioType: 'output',
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
          return getFlowProcessGrid(params, sort, projectId, processId, 'output');
        }}
        editable={{
          editableKeys,
          onSave: async (key, record) => {
            if (key === -1) {
              createFlowProcess(record).then(async (result) => {
                if (result === 'ok') {
                  message.success('Create successfully!');
                } else {
                  message.error(result);
                }
                actionRef.current?.reload();
              });
            } else {
              updateFlowProcess(record).then(async (result) => {
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
export default OutputCard;
