import type { FC } from 'react';
import { useState, useRef, useCallback } from 'react';
import { Button, Drawer, Space, Tooltip } from 'antd';
import { CloseOutlined, ProfileOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import type { ListPagination } from '@/services/home/data';
import ProTable from '@ant-design/pro-table';
import type { FlowPropertyJson } from '@/services/flowproperty/data';
import FlowPropertyJsonView from './view';
import FlowPropertyJsonEdit from './edit';
import FlowPropertyJsonCreate from './create';
import { getFlowPropertyJsonViewGrid } from '@/services/flow/api';
import FlowPropertyJsonDelete from './delete';

type Props = {
  projectId: number;
  flowPkid: number;
  parentActionRef: React.MutableRefObject<ActionType | undefined>;
};
const FlowPropertyJsonList: FC<Props> = ({ projectId, flowPkid, parentActionRef }) => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const actionRef = useRef<ActionType>();

  const flowPropertyJsonColumns: ProColumns<FlowPropertyJson>[] = [
    {
      title: 'ID',
      dataIndex: 'index',
      valueType: 'index',
      search: false,
    },
    {
      title: 'Conversion Factor',
      dataIndex: 'conversionFactor',
      search: false,
    },
    {
      title: 'Reference Flow Property',
      dataIndex: 'referenceFlowProperty',
      search: false,
      render: (_, row) => [<>{row.referenceFlowProperty === true ? 'true' : 'false'}</>],
    },
    {
      title: 'Data Name',
      dataIndex: 'dataName',
      sorter: true,
    },
    // {
    //   title: 'Category',
    //   dataIndex: 'categoryName',
    //   search: false,
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
    // },
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
      render: (_, row) => [
        <Space size={'small'}>
          <FlowPropertyJsonView flowPkid={flowPkid} propertyId={row.flowPropertyId} />
          <FlowPropertyJsonEdit
            projectId={projectId}
            flowPkid={flowPkid}
            propertyId={row.flowPropertyId}
            actionRef={actionRef}
          />
          <FlowPropertyJsonDelete
            flowPkid={flowPkid}
            propertyId={row.flowPropertyId}
            actionRef={actionRef}
          />
        </Space>,
      ],
    },
  ];

  const reload = useCallback(() => {
    parentActionRef.current?.reload();
  }, [parentActionRef]);

  return (
    <>
      <Tooltip title="List">
        <Button
          shape="circle"
          icon={<ProfileOutlined />}
          size="small"
          onClick={() => setDrawerVisible(true)}
        />
      </Tooltip>
      <Drawer
        title="List"
        width="100%"
        closable={false}
        extra={
          <Button
            icon={<CloseOutlined />}
            style={{ border: 0 }}
            onClick={() => {
              setDrawerVisible(false);
              reload();
            }}
          />
        }
        maskClosable={true}
        visible={drawerVisible}
        onClose={() => {
          setDrawerVisible(false);
          reload();
        }}
      >
        <ProTable<FlowPropertyJson, ListPagination>
          actionRef={actionRef}
          search={{
            defaultCollapsed: false,
          }}
          toolBarRender={() => [
            <FlowPropertyJsonCreate
              projectId={projectId}
              flowPkid={flowPkid}
              actionRef={actionRef}
            />,
          ]}
          request={(
            params: {
              pageSize: number;
              current: number;
            },
            sort,
          ) => {
            return getFlowPropertyJsonViewGrid(params, sort, projectId, flowPkid);
          }}
          columns={flowPropertyJsonColumns}
        />
      </Drawer>
    </>
  );
};

export default FlowPropertyJsonList;
