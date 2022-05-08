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
import { FormattedMessage } from 'umi';

type Props = {
  projectId: number;
  unitGroupId: string;
  parentActionRef: React.MutableRefObject<ActionType | undefined>;
};
const UnitJsonList: FC<Props> = ({ projectId, unitGroupId, parentActionRef }) => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const actionRef = useRef<ActionType>();

  const unitJsonColumns: ProColumns<UnitJson>[] = [
    {
      title: <FormattedMessage id="unitgroup.index" defaultMessage="Index" />,
      dataIndex: 'index',
      valueType: 'index',
      search: false,
    },
    {
      title: <FormattedMessage id="unitgroup.dataName" defaultMessage="Data Name" />,
      dataIndex: 'name',
      sorter: true,
    },
    {
      title: (
        <FormattedMessage id="unitgroup.conversionFactor" defaultMessage="Conversion Factor" />
      ),
      dataIndex: 'conversionFactor',
      search: false,
    },
    {
      title: <FormattedMessage id="unitgroup.referenceUnit" defaultMessage="Reference Unit" />,
      dataIndex: 'referenceUnit',
      search: false,
      render: (_, row) => [<>{row.referenceUnit === true ? 'true' : 'false'}</>],
    },
    {
      title: <FormattedMessage id="options.option" defaultMessage="Option" />,
      dataIndex: 'option',
      search: false,
      render: (_, row) => [
        <Space size={'small'}>
          <UnitJsonView projectId={projectId} unitGroupId={unitGroupId} id={row.id} />
          <UnitJsonEdit
            projectId={projectId}
            unitGroupId={unitGroupId}
            id={row.id}
            actionRef={actionRef}
          />
          <UnitJsonDelete
            projectId={projectId}
            unitGroupId={unitGroupId}
            id={row.id}
            actionRef={actionRef}
          />
        </Space>,
      ],
    },
  ];

  const reload = useCallback(() => {
    parentActionRef.current?.reload();
  }, [parentActionRef]);
  if (projectId && unitGroupId) {
    return (
      <>
        <Tooltip title={<FormattedMessage id="options.list" defaultMessage="List" />}>
          <Button
            shape="circle"
            icon={<ProfileOutlined />}
            size="small"
            onClick={() => setDrawerVisible(true)}
          />
        </Tooltip>
        <Drawer
          title={<FormattedMessage id="options.list" defaultMessage="List" />}
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
              <UnitJsonCreate
                projectId={projectId}
                unitGroupId={unitGroupId}
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
              return getUnitJsonGrid(params, sort, projectId, unitGroupId);
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
