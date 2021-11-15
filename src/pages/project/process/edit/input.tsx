import type { FC } from 'react';
import { useRef, useState } from 'react';
import ProCard from '@ant-design/pro-card';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import { EditableProTable } from '@ant-design/pro-table';
import { Button, Drawer, message } from 'antd';
import type { FlowProcess, FlowProcessListPagination } from '@/services/flowprocess/data';
import {
  createFlowProcess,
  deleteFlowProcess,
  getFlowProcessGrid,
  updateFlowProcess,
} from '@/services/flowprocess/api';

type InputProps = {
  projectId: number;
  processId: string;
};

const InputCard: FC<InputProps> = ({ projectId, processId }) => {
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
      title: 'Base Flow',
      dataIndex: 'flowBaseId',
      editable: false,
      render: (_, record: FlowProcess) => [
        <span>{record.flowBaseId ? record.flowBaseId : '  -  '}</span>,
        <a
          key="detail"
          onClick={() => {
            setIsDrawerVisible(true);
          }}
        >
          Detail
        </a>,
      ],
    },
    {
      title: 'Option',
      valueType: 'option',
      render: (_, record: FlowProcess, _index, action) => [
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
    <ProCard title="Inputs" bordered={false} collapsible>
      <Drawer visible={isDrawerVisible} title="Add" onClose={handleDrawerAddCancel}>
        <Button key="plan">Plan</Button> Or <Button key="process">Process</Button>
      </Drawer>
      <EditableProTable<FlowProcess, FlowProcessListPagination>
        actionRef={actionRef}
        recordCreatorProps={{
          record: () => {
            return {
              pkid: -1,
              ioType: 'input',
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
          return getFlowProcessGrid(params, sort, projectId, processId, 'input');
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
export default InputCard;
