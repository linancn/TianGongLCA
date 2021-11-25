import { Button, Drawer, message, Space, Tooltip } from 'antd';
import { SelectOutlined } from '@ant-design/icons';
import type { ProFormInstance } from '@ant-design/pro-form';
import styles from '@/style/custom.less';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { ListPagination } from '@/services/home/data';
import type { FC, MutableRefObject } from 'react';
import { useCallback, useState } from 'react';
import { getFlowBaseGrid } from '@/services/flowbase/api';
import type { FlowBase } from '@/services/flowbase/data';

type Props = {
  projectId: number;
  formRef: MutableRefObject<ProFormInstance<Record<string, any>> | undefined>;
};
const ProcessFlowBaseSelect: FC<Props> = ({ projectId, formRef }) => {
  const [drawerVisible, handleDrawerVisible] = useState(false);
  const [selectRow, setSelectRow] = useState<FlowBase>();
  const flowBaseColumns: ProColumns<FlowBase>[] = [
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
      title: 'Nation',
      dataIndex: 'nation',
      search: false,
    },
    {
      title: 'Source',
      dataIndex: 'Source',
      search: false,
    },
    {
      title: 'Type',
      dataIndex: 'type',
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

  const setFormValue = useCallback(() => {
    if (selectRow) {
      formRef.current?.setFieldsValue({
        flowBaseId: selectRow.id,
        name: selectRow.name,
        nation: selectRow.nation,
        source: selectRow.source,
        type: selectRow.type,
        comment: selectRow.comment,
      });
      handleDrawerVisible(false);
    } else {
      message.error('Select nothing');
    }
  }, [formRef, selectRow]);
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
        title="Select Flow Base Info"
        width="100%"
        maskClosable={true}
        visible={drawerVisible}
        onClose={() => handleDrawerVisible(false)}
        footer={
          <Space size={'middle'} className={styles.footer_right}>
            <Button onClick={() => handleDrawerVisible(false)}>Cancel</Button>
            <Button
              onClick={() => {
                setFormValue();
              }}
              type="primary"
            >
              Select
            </Button>
          </Space>
        }
      >
        <ProTable<FlowBase, ListPagination>
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
            return getFlowBaseGrid(params, sort, projectId);
          }}
          columns={flowBaseColumns}
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

export default ProcessFlowBaseSelect;
