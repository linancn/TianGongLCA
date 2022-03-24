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
import UnitJsonEdit from './edit';
import UnitJsonDelete from './delete';

type Props = {
  unitGroupPkid: number;
  parentActionRef: React.MutableRefObject<ActionType | undefined>;
};
const UnitJsonList: FC<Props> = ({ unitGroupPkid, parentActionRef }) => {
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
          <UnitJsonEdit unitGroupPkid={unitGroupPkid} id={row.id} actionRef={actionRef} />
          <UnitJsonDelete unitGroupPkid={unitGroupPkid} id={row.id} actionRef={actionRef} />
        </Space>,
      ],
    },
  ];

  const reload = useCallback(() => {
    parentActionRef.current?.reload();
  }, [parentActionRef]);
  if (unitGroupPkid) {
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
              return getUnitJsonGrid(params, sort, unitGroupPkid);
            }}
            columns={unitJsonColumns}
          />
        </Drawer>
      </>
    );
  } else {
    return <></>;
  }
};

export default UnitJsonList;
