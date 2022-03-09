import type { FC } from 'react';
import { useState, useRef, useCallback } from 'react';
import { Button, Drawer, Space, Tooltip } from 'antd';
import { CloseOutlined, ProfileOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import type { ListPagination } from '@/services/home/data';
import ProTable from '@ant-design/pro-table';
import type { UnitJson } from '@/services/unitgroup/data';
import { getUnitJsonGrid } from '@/services/unitgroup/api';
import UnitJsonView from './view';
import UnitJsonCreate from './create';

type Props = {
  projectId: number;
  unitGroupPkid: number;
  parentActionRef: React.MutableRefObject<ActionType | undefined>;
};
const UnitJsonList: FC<Props> = ({ projectId, unitGroupPkid, parentActionRef }) => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const actionRef = useRef<ActionType>();

  const unitJsonColumns: ProColumns<UnitJson>[] = [
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
      title: 'Conversion Factor',
      dataIndex: 'conversionFactor',
      search: false,
    },
    {
      title: 'Reference Unit',
      dataIndex: 'referenceUnit',
      search: false,
      render: (_, row) => [<>{row.referenceUnit === true ? 'true' : 'false'}</>],
    },
    {
      title: 'Option',
      dataIndex: 'option',
      search: false,
      render: (_, row) => [
        <Space size={'small'}>
          <UnitJsonView unitGroupPkid={unitGroupPkid} id={row.id} />
          {/* <FlowPropertyJsonEdit
            projectId={projectId}
            flowPkid={flowPkid}
            propertyId={row.flowPropertyId}
            actionRef={actionRef}
          />
          <FlowPropertyJsonDelete
            flowPkid={flowPkid}
            propertyId={row.flowPropertyId}
            actionRef={actionRef}
          /> */}
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
        <ProTable<UnitJson, ListPagination>
          actionRef={actionRef}
          search={{
            defaultCollapsed: false,
          }}
          toolBarRender={() => [
            <UnitJsonCreate unitGroupPkid={unitGroupPkid} actionRef={actionRef} />,
          ]}
          request={(
            params: {
              pageSize: number;
              current: number;
            },
            sort,
          ) => {
            return getUnitJsonGrid(params, sort, projectId, unitGroupPkid);
          }}
          columns={unitJsonColumns}
        />
      </Drawer>
    </>
  );
};

export default UnitJsonList;
