import { Button, Drawer, message, Space, Tooltip } from 'antd';
import { CloseOutlined, DatabaseOutlined, SelectOutlined } from '@ant-design/icons';
import type { ProFormInstance } from '@ant-design/pro-form';
import styles from '@/style/custom.less';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { ListPagination } from '@/services/home/data';
import type { FC, MutableRefObject } from 'react';
import { useCallback, useState, useRef } from 'react';
import type { FlowProperty } from '@/services/flowproperty/data';
import { getFlowPropertyGrid } from '@/services/flowproperty/api';
import FlowPropertyCreate from '@/pages/project/flowproperty/components/create';

type Props = {
  projectId: number;
  formRef: MutableRefObject<ProFormInstance<Record<string, any>> | undefined>;
};
const FlowPropertyJsonSelect: FC<Props> = ({ projectId, formRef }) => {
  const [drawerVisible, handleDrawerVisible] = useState(false);
  const [selectRow, setSelectRow] = useState<FlowProperty>();
  const actionRef = useRef<ActionType>();
  const flowPropertyColumns: ProColumns<FlowProperty>[] = [
    {
      title: 'ID',
      dataIndex: 'index',
      valueType: 'index',
      search: false,
    },
    {
      title: 'Data Name',
      dataIndex: 'dataName',
      sorter: true,
    },
    {
      title: 'Last Change',
      dataIndex: 'lastChange',
      valueType: 'dateTime',
      sorter: true,
      search: false,
    },
    {
      title: 'Release',
      dataIndex: 'release',
      sorter: true,
      search: false,
    },
    {
      title: 'Option',
      dataIndex: 'option',
      search: false,
      // render: (_, row) => [
      //   <Space size={'small'}>
      //     <FlowView pkid={row.pkid} />
      //     <FlowEdit pkid={row.pkid} actionRef={actionRef} />
      //     <FlowDelete pkid={row.pkid} actionRef={actionRef} />
      //   </Space>,
      // ],
    },
  ];
  const setFormValue = useCallback(() => {
    if (selectRow) {
      formRef.current?.setFieldsValue({
        flowPropertyId: selectRow.id,
        dataName: selectRow.dataName,
        description: selectRow.description,
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
        title="Select"
        width="100%"
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
        <ProTable<FlowProperty, ListPagination>
          actionRef={actionRef}
          search={{
            defaultCollapsed: false,
          }}
          toolBarRender={() => [
            <FlowPropertyCreate projectId={projectId} actionRef={actionRef} />,
            <Tooltip title="Select From Database">
              <Button
                size={'middle'}
                type="text"
                icon={<DatabaseOutlined />}
                onClick={() => {
                  // handleDrawerVisible(true);
                }}
              />
            </Tooltip>,
          ]}
          request={(
            params: {
              pageSize: number;
              current: number;
            },
            sort,
          ) => {
            return getFlowPropertyGrid(params, sort, projectId);
          }}
          columns={flowPropertyColumns}
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

export default FlowPropertyJsonSelect;
