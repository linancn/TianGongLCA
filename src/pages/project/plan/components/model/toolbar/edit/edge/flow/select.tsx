import { Button, Drawer, message, Space, Tooltip } from 'antd';
import type { FC, MutableRefObject } from 'react';
import { useCallback } from 'react';
import { useState } from 'react';
import styles from '@/style/custom.less';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { ListPagination } from '@/services/home/data';
import { CloseOutlined, SelectOutlined } from '@ant-design/icons';
import type { ExchangeJson } from '@/services/process/data';
import { getExchangeJsonGrid } from '@/services/process/api';
import type { ProFormInstance } from '@ant-design/pro-form';

type Props = {
  projectId: number;
  processId: string;
  input: boolean;
  formRef: MutableRefObject<ProFormInstance<Record<string, any>> | undefined>;
};

const ModelFlowSelect: FC<Props> = ({ projectId, processId, input, formRef }) => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectRow, setSelectRow] = useState<ExchangeJson>();
  const columns: ProColumns<ExchangeJson>[] = [
    {
      title: 'ID',
      dataIndex: 'index',
      valueType: 'index',
      search: false,
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      search: false,
    },
    {
      title: 'Amount Formula',
      dataIndex: 'amountFormula',
      search: false,
    },
    {
      title: 'Flow Name',
      dataIndex: 'flowName',
      sorter: true,
    },
  ];

  const setFormValue = useCallback(() => {
    if (selectRow) {
      if (input) {
        formRef.current?.setFieldsValue({
          flowTargetId: selectRow.flowId,
          flowTargetName: selectRow.flowName,
        });
      } else {
        formRef.current?.setFieldsValue({
          flowSourceId: selectRow.flowId,
          flowSourceName: selectRow.flowName,
        });
      }
      setDrawerVisible(false);
    } else {
      message.error('Select nothing');
    }
  }, [formRef, input, selectRow]);

  return (
    <>
      <Tooltip title="Select">
        <Button
          shape="circle"
          icon={<SelectOutlined />}
          size="small"
          onClick={() => setDrawerVisible(true)}
        />
      </Tooltip>
      <Drawer
        title="Select Flow"
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
            <Button onClick={setFormValue} type="primary">
              Select
            </Button>
          </Space>
        }
      >
        <ProTable<ExchangeJson, ListPagination>
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
            return getExchangeJsonGrid(params, sort, projectId, processId, input);
          }}
          columns={columns}
          rowClassName={(record) => {
            return record.internalId === selectRow?.internalId
              ? styles.split_row_select_active
              : '';
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
export default ModelFlowSelect;
