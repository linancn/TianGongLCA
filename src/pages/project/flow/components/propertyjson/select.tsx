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
import { FormattedMessage } from 'umi';

type Props = {
  projectId: number;
  formRef: MutableRefObject<ProFormInstance<Record<string, any>> | undefined>;
};
const FlowPropertyJsonSelect: FC<Props> = ({ projectId, formRef }) => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectRow, setSelectRow] = useState<FlowProperty>();
  const actionRef = useRef<ActionType>();
  const flowPropertyColumns: ProColumns<FlowProperty>[] = [
    {
      title: <FormattedMessage id="flowproperty.index" defaultMessage="Index" />,
      dataIndex: 'index',
      valueType: 'index',
      search: false,
    },
    {
      title: <FormattedMessage id="flowproperty.dataName" defaultMessage="Data Name" />,
      dataIndex: 'dataName',
      sorter: true,
    },
    {
      title: <FormattedMessage id="flowproperty.lastChange" defaultMessage="Last Change" />,
      dataIndex: 'lastChange',
      valueType: 'dateTime',
      sorter: true,
      search: false,
    },
    {
      title: <FormattedMessage id="flowproperty.release" defaultMessage="Release" />,
      dataIndex: 'release',
      sorter: true,
      search: false,
    },
    {
      title: <FormattedMessage id="options.option" defaultMessage="Option" />,
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
      setDrawerVisible(false);
    } else {
      message.error('Select nothing');
    }
  }, [formRef, selectRow]);
  return (
    <>
      <Tooltip title={<FormattedMessage id="options.select" defaultMessage="Select" />}>
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
        title={<FormattedMessage id="options.select" defaultMessage="Select" />}
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
            <Button onClick={() => setDrawerVisible(false)}>
              <FormattedMessage id="options.cancel" defaultMessage="Cancel" />
            </Button>
            <Button
              onClick={() => {
                setFormValue();
              }}
              type="primary"
            >
              <FormattedMessage id="options.selectfromdatabase" defaultMessage="Select" />
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
            <FlowPropertyCreate key={0} projectId={projectId} actionRef={actionRef} />,
            <Tooltip
              key={0}
              title={
                <FormattedMessage
                  id="options.selectfromdatabase"
                  defaultMessage="Select From Database"
                />
              }
            >
              <Button
                size={'middle'}
                type="text"
                icon={<DatabaseOutlined />}
                onClick={() => {
                  // setDrawerVisible(true);
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
            return getFlowPropertyGrid(params, sort, projectId, false);
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
