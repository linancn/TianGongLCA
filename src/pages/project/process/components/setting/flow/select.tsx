import { Button, Drawer, message, Space, Tooltip } from 'antd';
import { CloseOutlined, SelectOutlined } from '@ant-design/icons';
import type { ProFormInstance } from '@ant-design/pro-form';
import styles from '@/style/custom.less';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { ListPagination } from '@/services/home/data';
import type { FC, MutableRefObject } from 'react';
import { useCallback, useState } from 'react';
import type { Flow } from '@/services/flow/data';
import { getFlowGrid } from '@/services/flow/api';
import { FormattedMessage } from 'umi';

type Props = {
  projectId: number;
  formRef: MutableRefObject<ProFormInstance<Record<string, any>> | undefined>;
};
const ProcessFlowSelect: FC<Props> = ({ projectId, formRef }) => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectRow, setSelectRow] = useState<Flow>();
  const flowColumns: ProColumns<Flow>[] = [
    {
      title: <FormattedMessage id="flow.index" defaultMessage="Index" />,
      dataIndex: 'index',
      valueType: 'index',
      search: false,
    },
    {
      title: <FormattedMessage id="flow.dataName" defaultMessage="Data Name" />,
      dataIndex: 'dataName',
      sorter: true,
    },
    {
      title: <FormattedMessage id="flow.flowType" defaultMessage="Flow Type" />,
      dataIndex: 'flowType',
      sorter: true,
      search: false,
    },
    {
      title: <FormattedMessage id="flow.locationName" defaultMessage="Location Name" />,
      dataIndex: 'locationName',
      search: false,
      render: (_, row) => [
        <Space key={0} size={'small'}>
          {row.locationId == null ? '-' : row.locationName}
          {/* <LocationViewByParent
            projectId={row.projectId}
            id={row.locationId}
            parentType={'flow'}
            parentPkid={row.pkid}
            actionRef={actionRef}
          /> */}
        </Space>,
      ],
    },
    {
      title: <FormattedMessage id="flow.categoryName" defaultMessage="Category" />,
      dataIndex: 'categoryName',
      search: false,
      render: (_, row) => [
        <Space key={0} size={'small'}>
          {row.categoryId == null ? '-' : row.categoryName}
          {/* <CategoryViewByParent
            projectId={row.projectId}
            id={row.categoryId}
            parentType={'flow'}
            parentPkid={row.pkid}
            actionRef={actionRef}
          /> */}
        </Space>,
      ],
    },
    {
      title: <FormattedMessage id="flow.flowPropertyCount" defaultMessage="Measurement Count" />,
      dataIndex: 'flowPropertyCount',
      search: false,
      render: (_, row) => [
        <Space key={0} size={'small'}>
          {row.flowPropertyCount}
          {/* <Tooltip title="List">
            <Button
              shape="circle"
              icon={<OrderedListOutlined />}
              size="small"
              // onClick={() => onViewFlowProcess(row.sourceProcessId, row.sourceFlowId)}
            />
          </Tooltip> */}
          {/* <FlowPropertyJsonList
            projectId={row.projectId}
            flowPkid={row.pkid}
            parentActionRef={actionRef}
          /> */}
        </Space>,
      ],
    },
    {
      title: <FormattedMessage id="flow.lastChange" defaultMessage="Last Change" />,
      dataIndex: 'lastChange',
      valueType: 'dateTime',
      sorter: true,
      search: false,
    },
    {
      title: <FormattedMessage id="flow.database" defaultMessage="Database" />,
      dataIndex: 'database',
      sorter: true,
      search: false,
    },
    {
      title: <FormattedMessage id="flow.release" defaultMessage="Release" />,
      dataIndex: 'release',
      sorter: true,
      search: false,
    },
  ];

  const setFormValue = useCallback(() => {
    if (selectRow) {
      formRef.current?.setFieldsValue({
        flowId: selectRow.id,
        flowName: selectRow.dataName,
      });
      setDrawerVisible(false);
    } else {
      message.error(
        <FormattedMessage id="options.selectnothing" defaultMessage="Select nothing" />,
      );
    }
  }, [formRef, selectRow]);
  return (
    <>
      <Tooltip title={<FormattedMessage id="options.select" defaultMessage="Import" />}>
        <Button
          shape="circle"
          size="small"
          icon={<SelectOutlined />}
          onClick={() => {
            setDrawerVisible(true);
          }}
        />
      </Tooltip>
      <Drawer
        title={
          <FormattedMessage
            id="process.selectFlowBaseinfo"
            defaultMessage="Select Flow Base Info"
          />
        }
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
            <Button onClick={() => setDrawerVisible(false)}>Cancel</Button>
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
        <ProTable<Flow, ListPagination>
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
            return getFlowGrid(params, sort, projectId, false);
          }}
          columns={flowColumns}
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

export default ProcessFlowSelect;
