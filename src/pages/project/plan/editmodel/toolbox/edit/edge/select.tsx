import { Button, Drawer, message, Space, Tooltip } from 'antd';
import type { FC } from 'react';
import { useCallback } from 'react';
import { useState } from 'react';
import styles from '@/style/custom.less';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { updateEdgeProcess } from '@/services/edgeprocess/api';
import type { ListPagination } from '@/services/home/data';
import type { FlowProcessBase } from '@/services/flowprocessbase/data';
import { getFlowProcessBaseGrid } from '@/services/flowprocessbase/api';
import { SelectOutlined } from '@ant-design/icons';

type Props = {
  pkid: number;
  projectId: number;
  processId: string;
  st: string;
  actionRef: React.MutableRefObject<ActionType | undefined>;
};

const EdgeProcessSelect: FC<Props> = ({ pkid, projectId, processId, st, actionRef }) => {
  const [drawerSourceVisible, handleDrawerSourceVisible] = useState(false);
  const [drawerTargetVisible, handleDrawerTargetVisible] = useState(false);
  const [selectRow, setSelectRow] = useState<FlowProcessBase>();
  const flowProcessBaseColumns: ProColumns<FlowProcessBase>[] = [
    {
      title: 'ID',
      dataIndex: 'index',
      valueType: 'index',
      search: false,
    },
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Comment',
      dataIndex: 'comment',
    },
  ];
  const reload = useCallback(() => {
    actionRef.current?.reload();
  }, [actionRef]);

  const onSelect = () => {
    if (st === 'source') {
      handleDrawerSourceVisible(true);
    } else if (st === 'target') {
      handleDrawerTargetVisible(true);
    }
  };

  const onSelectFlowProcessToEdgeProcess = () => {
    if (st === 'source') {
      updateEdgeProcess({ pkid, sourceFlowId: selectRow?.id }).then((result) => {
        if (result === 'ok') {
          handleDrawerSourceVisible(false);
          reload();
        } else {
          message.error(result);
        }
      });
      return true;
    }
    if (st === 'target') {
      updateEdgeProcess({ pkid, targetFlowId: selectRow?.id }).then((result) => {
        if (result === 'ok') {
          handleDrawerTargetVisible(false);
          reload();
        } else {
          message.error(result);
        }
      });
      return true;
    }
    return true;
  };

  return (
    <>
      <Tooltip title="Select">
        <Button shape="circle" icon={<SelectOutlined />} size="small" onClick={onSelect} />
      </Tooltip>
      <Drawer
        title="Select Source Flow"
        width="750px"
        maskClosable={true}
        visible={drawerSourceVisible}
        onClose={() => handleDrawerSourceVisible(false)}
        footer={
          <Space size={'middle'} className={styles.footer_right}>
            <Button onClick={() => handleDrawerSourceVisible(false)}>Cancel</Button>
            <Button onClick={onSelectFlowProcessToEdgeProcess} type="primary">
              Select
            </Button>
          </Space>
        }
      >
        <ProTable<FlowProcessBase, ListPagination>
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
            return getFlowProcessBaseGrid(params, sort, projectId, processId, 'output');
          }}
          columns={flowProcessBaseColumns}
          rowClassName={(record) => {
            return record.pkid === selectRow?.pkid ? styles.split_row_select_active : '';
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
      </Drawer>
      <Drawer
        title="Select Target Flow"
        width="750px"
        maskClosable={true}
        visible={drawerTargetVisible}
        onClose={() => handleDrawerTargetVisible(false)}
        footer={
          <Space size={'middle'} className={styles.footer_right}>
            <Button onClick={() => handleDrawerTargetVisible(false)}>Cancel</Button>
            <Button onClick={onSelectFlowProcessToEdgeProcess} type="primary">
              Select
            </Button>
          </Space>
        }
      >
        <ProTable<FlowProcessBase, ListPagination>
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
            return getFlowProcessBaseGrid(params, sort, projectId, processId, 'input');
          }}
          columns={flowProcessBaseColumns}
          rowClassName={(record) => {
            return record.pkid === selectRow?.pkid ? styles.split_row_select_active : '';
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
      </Drawer>
    </>
  );
};
export default EdgeProcessSelect;
