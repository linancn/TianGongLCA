import type { FC } from 'react';
import { useRef, useState } from 'react';
import { Button, Drawer, Space, Tooltip } from 'antd';
import { CloseOutlined, SettingOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { MeasurementFlowBase } from '@/services/measurementflowbase/data';
import type { ListPagination } from '@/services/home/data';
import styles from '@/style/custom.less';
import { getMeasurementFlowBaseGrid } from '@/services/measurementflowbase/api';
import FlowMeasurementCreate from './create';
import FlowMeasurementDelete from './delete';
import FlowMeasurementEdit from './edit';
import FlowMeasurementView from './view';

type Props = {
  projectId: number;
  flowBaseId: string;
};
const FlowMeasurementSetting: FC<Props> = ({ projectId, flowBaseId }) => {
  const actionRef = useRef<ActionType>();
  const [settingTable, setSettingTable] = useState<JSX.Element>();
  const [drawerVisible, handleDrawerVisible] = useState(false);
  const measurementFlowBaseColumns: ProColumns<MeasurementFlowBase>[] = [
    {
      title: 'ID',
      dataIndex: 'index',
      valueType: 'index',
      search: false,
    },
    {
      title: 'As Ref',
      dataIndex: 'asRef',
      search: false,
      render: (_, row) => {
        return row.asRef ? 'true' : 'false';
      },
    },
    {
      title: 'Conversion Ref',
      dataIndex: 'conversionRef',
      search: false,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: true,
    },
    {
      title: 'Unit',
      dataIndex: 'unit',
      sorter: true,
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
      title: 'Last Update',
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
    {
      title: 'Option',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, row) => [
        <Space size={'small'}>
          <FlowMeasurementView pkid={row.pkid} />
          <FlowMeasurementEdit pkid={row.pkid} projectId={projectId} actionRef={actionRef} />
          <FlowMeasurementDelete pkid={row.pkid} actionRef={actionRef} />
        </Space>,
      ],
    },
  ];
  const onSetting = () => {
    handleDrawerVisible(true);
    setSettingTable(
      <ProTable<MeasurementFlowBase, ListPagination>
        actionRef={actionRef}
        search={{
          defaultCollapsed: false,
        }}
        toolBarRender={() => [
          <FlowMeasurementCreate
            projectId={projectId}
            flowBaseId={flowBaseId}
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
          return getMeasurementFlowBaseGrid(params, sort, projectId, flowBaseId);
        }}
        columns={measurementFlowBaseColumns}
      />,
    );
  };
  return (
    <>
      <Tooltip title="Setting">
        <Button shape="circle" icon={<SettingOutlined />} size="small" onClick={onSetting} />
      </Tooltip>
      <Drawer
        title="Setting"
        width="100%"
        closable={false}
        extra={
          <Button
            icon={<CloseOutlined />}
            style={{ border: 0 }}
            onClick={() => handleDrawerVisible(false)}
          />
        }
        maskClosable={false}
        visible={drawerVisible}
        onClose={() => handleDrawerVisible(false)}
        footer={
          <Space size={'middle'} className={styles.footer_right}>
            <Button onClick={() => handleDrawerVisible(false)} type="primary">
              Finish
            </Button>
          </Space>
        }
      >
        {settingTable}
      </Drawer>
    </>
  );
};

export default FlowMeasurementSetting;
