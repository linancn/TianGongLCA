import { Button, Drawer, message, Space, Tooltip } from 'antd';
import { SelectOutlined } from '@ant-design/icons';
import type { ProFormInstance } from '@ant-design/pro-form';
import styles from '@/style/custom.less';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { MeasurementBase } from '@/services/measurementbase/data';
import type { ListPagination } from '@/services/home/data';
import { getMeasurementBaseGrid } from '@/services/measurementbase/api';
import type { FC, MutableRefObject } from 'react';
import { useCallback, useState } from 'react';

type Props = {
  projectId: number;
  formRef: MutableRefObject<ProFormInstance<Record<string, any>> | undefined>;
};
const FlowMeasurementSelect: FC<Props> = ({ projectId, formRef }) => {
  const [drawerVisible, handleDrawerVisible] = useState(false);
  const [selectRowBase, setSelectRowMeasurementBase] = useState<MeasurementBase>();
  const measurementBaseColumns: ProColumns<MeasurementBase>[] = [
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
      title: 'Last Update Time',
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
  ];
  const setFormValue = useCallback(() => {
    if (selectRowBase) {
      formRef.current?.setFieldsValue({
        measurementBaseId: selectRowBase.id,
        name: selectRowBase.name,
        unit: selectRowBase.unit,
        comment: selectRowBase.comment,
      });
      handleDrawerVisible(false);
    } else {
      message.error('Select nothing');
    }
  }, [formRef, selectRowBase]);
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
        title="Select Measurement Base Info"
        width="100%"
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
        <ProTable<MeasurementBase, ListPagination>
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
            return getMeasurementBaseGrid(params, sort, projectId);
          }}
          columns={measurementBaseColumns}
          rowClassName={(record) => {
            return record.pkid === selectRowBase?.pkid ? styles.split_row_select_active : '';
          }}
          onRow={(record) => {
            return {
              onClick: () => {
                if (record) {
                  setSelectRowMeasurementBase(record);
                }
              },
            };
          }}
        />
      </Drawer>
    </>
  );
};

export default FlowMeasurementSelect;
