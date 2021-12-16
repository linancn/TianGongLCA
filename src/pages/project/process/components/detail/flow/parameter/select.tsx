import { Button, Drawer, message, Space, Tooltip } from 'antd';
import { CloseOutlined, SelectOutlined } from '@ant-design/icons';
import styles from '@/style/custom.less';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { ListPagination } from '@/services/home/data';
import type { FC, MutableRefObject } from 'react';
import { useState } from 'react';
import type { Parameter } from '@/services/parameter/data';
import { getParameterGrid } from '@/services/parameter/api';
import { updateFlowProcess } from '@/services/flowprocess/api';

type Props = {
  projectId: number;
  processId: string;
  flowProcessPkid: number;
  actionRef: MutableRefObject<ActionType | undefined>;
};
const ProcessFlowParameterSelect: FC<Props> = ({
  projectId,
  processId,
  flowProcessPkid,
  actionRef,
}) => {
  const [drawerVisible, handleDrawerVisible] = useState(false);
  const [selectRow, setSelectRow] = useState<Parameter>();
  const parameterColumns: ProColumns<Parameter>[] = [
    {
      title: 'ID',
      dataIndex: 'index',
      valueType: 'index',
      search: false,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: true,
    },
    {
      title: 'Formula',
      dataIndex: 'formula',
      search: false,
    },
    {
      title: 'Value',
      dataIndex: 'value',
      search: false,
    },
    {
      title: 'Min',
      dataIndex: 'min',
      search: false,
    },
    {
      title: 'Max',
      dataIndex: 'max',
      search: false,
    },
    {
      title: 'SD',
      dataIndex: 'sd',
      search: false,
    },
    {
      title: 'Creator',
      dataIndex: 'creator',
      sorter: true,
      search: false,
    },
    {
      title: 'Create Time',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      sorter: true,
      search: false,
    },
    {
      title: 'Last Update Time',
      dataIndex: 'lastUpdateTime',
      valueType: 'dateTime',
      sorter: true,
      search: false,
    },
    {
      title: 'Comment',
      dataIndex: 'comment',
      valueType: 'textarea',
      search: false,
    },
    {
      title: 'Version',
      dataIndex: 'version',
      search: false,
    },
  ];

  const onSelectParameterToFlow = () => {
    updateFlowProcess({ pkid: flowProcessPkid, parameterId: selectRow?.id }).then((result) => {
      if (result === 'ok') {
        handleDrawerVisible(false);
        actionRef.current?.reload();
      } else {
        message.error(result);
      }
    });
    return true;
  };
  return (
    <>
      <Tooltip title="Select">
        <Button
          shape="circle"
          size="small"
          icon={<SelectOutlined />}
          onClick={() => {
            handleDrawerVisible(true);
          }}
        />
      </Tooltip>
      <Drawer
        title="Select Parameter"
        width="750px"
        closable={false}
        extra={
          <Button
            icon={<CloseOutlined />}
            style={{ border: 0 }}
            onClick={() => handleDrawerVisible(false)}
          />
        }
        maskClosable={true}
        visible={drawerVisible}
        onClose={() => handleDrawerVisible(false)}
        footer={
          <Space size={'middle'} className={styles.footer_right}>
            <Button onClick={() => handleDrawerVisible(false)}>Cancel</Button>
            <Button onClick={onSelectParameterToFlow} type="primary">
              Select
            </Button>
          </Space>
        }
      >
        <ProTable<Parameter, ListPagination>
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
            return getParameterGrid(params, sort, projectId, processId);
          }}
          columns={parameterColumns}
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

export default ProcessFlowParameterSelect;
