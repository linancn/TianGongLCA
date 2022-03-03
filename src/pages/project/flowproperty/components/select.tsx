import { Button, Drawer, Space, Tooltip } from 'antd';
import { CloseOutlined, DatabaseOutlined, SelectOutlined } from '@ant-design/icons';
import styles from '@/style/custom.less';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { ListPagination } from '@/services/home/data';
import type { FC } from 'react';
import { useState, useRef, useCallback } from 'react';
import type { FlowProperty } from '@/services/flowproperty/data';
import { getFlowPropertyGrid } from '@/services/flowproperty/api';
import FlowPropertyCreate from './create';

type Props = {
  projectId: number;
  parentPkid: number;
  parentType: string;
  parentActionRef: React.MutableRefObject<ActionType | undefined>;
};

const FlowPropertySelect: FC<Props> = ({
  projectId,
  // parentPkid,
  // parentType,
  parentActionRef,
}) => {
  const [drawerVisible, setDrawerVisible] = useState(false);
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
      title: 'Flow Type',
      dataIndex: 'flowType',
      sorter: true,
      search: false,
    },
    {
      title: 'Location Name',
      dataIndex: 'locationName',
      search: false,
      // render: (_, row) => [
      //   <Space size={'small'}>
      //     {row.locationId == null ? '-' : row.locationName}
      //     <LocationViewByParent
      //       projectId={row.projectId}
      //       id={row.locationId}
      //       parentType={'flow'}
      //       parentPkid={row.pkid}
      //       actionRef={actionRef}
      //     />
      //   </Space>,
      // ],
    },
    {
      title: 'Category',
      dataIndex: 'categoryName',
      search: false,
      // render: (_, row) => [
      //   <Space size={'small'}>
      //     {row.categoryId == null ? '-' : row.categoryName}
      //     <CategoryViewByParent
      //       projectId={row.projectId}
      //       id={row.categoryId}
      //       parentType={'flow'}
      //       parentPkid={row.pkid}
      //       actionRef={actionRef}
      //     />
      //   </Space>,
      // ],
    },
    {
      title: 'Last Change',
      dataIndex: 'lastChange',
      valueType: 'dateTime',
      sorter: true,
      search: false,
    },
    {
      title: 'Database',
      dataIndex: 'database',
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

  const reload = useCallback(() => {
    parentActionRef.current?.reload();
  }, [parentActionRef]);

  const updateSelectId = () => {
    // if (selectRow) {
    //   updateParentFlowProperty(parentType, parentPkid, selectRow.id).then(async (result) => {
    //     if (result === 'ok') {
    //       message.success('Successfully Selected!');
    //       setDrawerVisible(false);
    //       reload();
    //     } else {
    //       message.error(result);
    //     }
    //   });
    // } else {
    //   message.error('Select nothing');
    // }
  };
  return (
    <>
      <Tooltip title="Select">
        <Button
          size={'middle'}
          type="text"
          icon={<SelectOutlined />}
          onClick={() => {
            setDrawerVisible(true);
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
            onClick={() => setDrawerVisible(false)}
          />
        }
        maskClosable={true}
        visible={drawerVisible}
        onClose={() => setDrawerVisible(false)}
        footer={
          <Space size={'middle'} className={styles.footer_right}>
            <Button
              onClick={() => {
                setDrawerVisible(false);
                reload();
              }}
            >
              Cancel
            </Button>
            <Button onClick={() => updateSelectId()} type="primary">
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

export default FlowPropertySelect;
