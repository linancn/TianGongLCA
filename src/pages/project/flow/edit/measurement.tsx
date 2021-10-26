import type { FC } from 'react';
import { useRef, useState } from 'react';
import ProCard from '@ant-design/pro-card';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import { EditableProTable } from '@ant-design/pro-table';
import { Button, Drawer, message } from 'antd';
import {
  createMeasurementFlow,
  deleteMeasurementFlow,
  getMeasurementFlowGrid,
  updateMeasurementFlow,
} from '@/services/measurementflow/api';
import type {
  MeasurementFlow,
  MeasurementFlowListPagination,
} from '@/services/measurementflow/data';

type InputProps = {
  project: number;
  process: string;
};

const MeasurementCard: FC<InputProps> = ({ project }) => {
  const actionRef = useRef<ActionType>();
  const [editableKeys, setEditableKeys] = useState<React.Key[]>([]);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const columns: ProColumns<MeasurementFlow>[] = [
    {
      title: 'ID',
      dataIndex: 'pkid',
      sorter: true,
      editable: false,
    },
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Comment',
      dataIndex: 'comment',
    },
    {
      title: 'Option',
      valueType: 'option',
      render: (_, record: MeasurementFlow, _index, action) => [
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
            deleteMeasurementFlow(record.pkid).then(async (result) => {
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
  const addMeasurementBase = () => {
    // actionRef.current?.reload();
    // actionRef.current?.reset?.();
    // actionRef.current?.reload();
    // actionRef.current?.cancelEditable(-1);
    // actionRef.current?.startEditable(-1);
    // actionRef.current?.addEditRecord?.({
    //   pkid: -2,
    //   projectId: project,
    //   comment: '123123',
    // });
  };
  return (
    <ProCard
      title="Measurements"
      bordered={false}
      extra={
        <Button
          type="primary"
          key="add"
          onClick={() => {
            setIsDrawerVisible(true);
          }}
        >
          Add
        </Button>
      }
    >
      <EditableProTable<MeasurementFlow, MeasurementFlowListPagination>
        actionRef={actionRef}
        recordCreatorProps={false}
        columns={columns}
        rowKey="pkid"
        // toolBarRender={() => {
        //   return [
        //     <Button
        //       type="primary"
        //       key="add"
        //       onClick={() => {
        //         setIsDrawerVisible(true);
        //       }}
        //     >
        //       Add
        //     </Button>,
        //   ];
        // }}
        request={(
          params: {
            pageSize: number;
            current: number;
          },
          sort,
        ) => {
          return getMeasurementFlowGrid(params, sort, project);
        }}
        editable={{
          editableKeys,
          onSave: async (key, record) => {
            if (key === -1) {
              createMeasurementFlow(record).then(async (result) => {
                if (result === 'ok') {
                  message.success('Create successfully!');
                } else {
                  message.error(result);
                }
                actionRef.current?.reload();
              });
            } else {
              updateMeasurementFlow(record).then(async (result) => {
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
      <Drawer visible={isDrawerVisible} title="Select" onClose={handleDrawerAddCancel}>
        <Button key="select" onClick={addMeasurementBase}>
          Select
        </Button>
      </Drawer>
    </ProCard>
  );
};
export default MeasurementCard;
