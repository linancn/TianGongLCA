import type { FC } from 'react';
import { useState, useRef } from 'react';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import {
  createFlowBase,
  deleteFlowBase,
  getFlowBaseByPkid,
  getFlowBaseGrid,
  updateFlowBase,
} from '@/services/flowbase/api';
import type { FlowBase } from '@/services/flowbase/data';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Descriptions, Divider, Drawer, message, Modal, Space, Tooltip } from 'antd';
import type { ProFormInstance } from '@ant-design/pro-form';
import ProForm, { ProFormSelect, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import {
  DeleteOutlined,
  ExclamationCircleOutlined,
  FormOutlined,
  OrderedListOutlined,
  PlusOutlined,
  ProfileOutlined,
  SelectOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import styles from './style.less';
import moment from 'moment';
import type { MeasurementFlowBase } from '@/services/measurementflowbase/data';
import { getMeasurementFlowBaseGrid } from '@/services/measurementflowbase/api';
import { createMeasurementFlow, deleteMeasurementFlow } from '@/services/measurementflow/api';
import type { MeasurementBase } from '@/services/measurementbase/data';
import { getMeasurementBaseGrid } from '@/services/measurementbase/api';
import { ListPagination } from '@/services/home/data';

type ListProps = {
  location: {
    query: {
      projectid: number;
    };
  };
};

const TableList: FC<ListProps> = (porps) => {
  const { projectid } = porps.location.query;
  const actionRef = useRef<ActionType>();
  const actionRefMeasurement = useRef<ActionType>();
  const formRefCreate = useRef<ProFormInstance>();
  const formRefCreateMeasurement = useRef<ProFormInstance>();
  const formRefCreateMeasurementBase = useRef<ProFormInstance>();
  const formRefEdit = useRef<ProFormInstance>();
  const [viewDescriptions, setViewDescriptions] = useState<JSX.Element>();
  const [editForm, setEditForm] = useState<JSX.Element>();
  const [settingTable, setSettingTable] = useState<JSX.Element>();
  // const [measurementBaseTable, setMeasurementBaseTable] = useState<JSX.Element>();
  const [drawerCreateVisible, handleDrawerCreateVisible] = useState(false);
  const [drawerViewVisible, handleDrawerViewVisible] = useState(false);
  const [drawerEditVisible, handleDrawerEditVisible] = useState(false);
  const [drawerSettingVisible, handleDrawerSettingVisible] = useState(false);
  const [drawerCreateMeasurementVisible, handleDrawerCreateMeasurementVisible] = useState(false);
  const [drawerSelectMeasurementVisible, handleDrawerSelectMeasurementVisible] = useState(false);
  const [editPkid, setEditPkid] = useState<number>(0);
  const [settingFlowBaseId, setSettingFlowBaseId] = useState<string>();
  const [selectRowMeasurementBase, setSelectRowMeasurementBase] = useState<MeasurementBase>();
  const flowBaseColumns: ProColumns<FlowBase>[] = [
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
      title: 'Nation',
      dataIndex: 'nation',
      sorter: true,
    },
    {
      title: 'Source',
      dataIndex: 'source',
      sorter: true,
    },
    {
      title: 'Type',
      dataIndex: 'type',
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
      title: 'Measurements',
      dataIndex: 'measurements',
      search: false,
      render: (_, row) => [
        <Space size={'small'}>
          <Tooltip title="List">
            <Button
              shape="circle"
              icon={<OrderedListOutlined />}
              size="small"
              // onClick={() => onViewFlowProcess(row.sourceProcessId, row.sourceFlowId)}
            />
          </Tooltip>
          <Tooltip title="Setting">
            <Button
              shape="circle"
              icon={<SettingOutlined />}
              size="small"
              onClick={() => onSetting(row.projectId, row.id)}
            />
          </Tooltip>
        </Space>,
      ],
    },
    {
      title: 'Option',
      render: (_, row) => [
        <Tooltip title="View">
          <Button
            shape="circle"
            icon={<ProfileOutlined />}
            size="small"
            onClick={() => onView(row.pkid)}
          />
        </Tooltip>,
        <Tooltip title="Edit">
          <Button
            shape="circle"
            icon={<FormOutlined />}
            size="small"
            onClick={() => onEdit(row.pkid)}
          />
        </Tooltip>,
        <Tooltip title="Delete">
          <Button
            shape="circle"
            icon={<DeleteOutlined />}
            size="small"
            onClick={() => onDelete(row.pkid)}
          />
        </Tooltip>,
      ],
    },
  ];
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
        <Tooltip title="View">
          <Button
            shape="circle"
            icon={<ProfileOutlined />}
            size="small"
            // onClick={() => onView(row.pkid)}
          />
        </Tooltip>,
        <Tooltip title="Edit">
          <Button
            shape="circle"
            icon={<FormOutlined />}
            size="small"
            // onClick={() => onEdit(row.pkid)}
          />
        </Tooltip>,
        <Tooltip title="Delete">
          <Button
            shape="circle"
            icon={<DeleteOutlined />}
            size="small"
            onClick={() => onDeleteMeasurementFlow(row.pkid)}
          />
        </Tooltip>,
      ],
    },
  ];
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
  function onView(pkid: number) {
    handleDrawerViewVisible(true);
    getFlowBaseByPkid(pkid).then(async (result) => {
      setViewDescriptions(
        <Descriptions column={1}>
          <Descriptions.Item label="Name">{result?.name}</Descriptions.Item>
          <Descriptions.Item label="Nation">{result?.nation}</Descriptions.Item>
          <Descriptions.Item label="Source">{result?.source}</Descriptions.Item>
          <Descriptions.Item label="Type">{result?.type}</Descriptions.Item>
          <Descriptions.Item label="Creator">{result?.creator}</Descriptions.Item>
          <Descriptions.Item label="Create Time">
            {moment(result?.createTime).format('YYYY-MM-DD HH:mm:ss')}
          </Descriptions.Item>
          <Descriptions.Item label="Last Update Time">
            {moment(result?.lastUpdateTime).format('YYYY-MM-DD HH:mm:ss')}
          </Descriptions.Item>
          <Descriptions.Item label="Comment">{result?.comment}</Descriptions.Item>
          <Descriptions.Item label="Version">{result?.version}</Descriptions.Item>
        </Descriptions>,
      );
    });
  }
  function onEdit(pkid: number) {
    handleDrawerEditVisible(true);
    setEditPkid(pkid);
    getFlowBaseByPkid(pkid).then(async (pi) => {
      setEditForm(
        <ProForm
          formRef={formRefEdit}
          submitter={{
            render: () => {
              return [];
            },
          }}
          onFinish={async (values) => {
            updateFlowBase({ ...values, pkid: pi.pkid }).then(async (result) => {
              if (result === 'ok') {
                message.success('Edit successfully!');
                handleDrawerEditVisible(false);
                if (actionRef.current) {
                  actionRef.current.reload();
                }
              } else {
                message.error(result);
              }
            });
            return true;
          }}
        >
          <ProFormText width="md" name="name" label="Name" />
          <ProFormText width="md" name="nation" label="Nation" />
          <ProFormText width="md" name="source" label="Source" />
          <ProFormText width="md" name="type" label="Type" />
          <ProFormTextArea width="md" name="comment" label="Comment" />
        </ProForm>,
      );
      formRefEdit.current?.setFieldsValue(pi);
    });
  }
  function onReset(pkid: number) {
    getFlowBaseByPkid(pkid).then(async (result) => {
      formRefEdit.current?.setFieldsValue(result);
    });
  }
  function onDelete(pkid: number) {
    Modal.confirm({
      title: 'Do you Want to delete this flow?',
      icon: <ExclamationCircleOutlined />,
      content: '',
      onOk() {
        deleteFlowBase(pkid).then(async (result) => {
          if (result === 'ok') {
            message.success('Delete successfully!');
            if (actionRef.current) {
              actionRef.current.reload();
            }
          } else {
            message.error(result);
          }
        });
      },
      onCancel() {},
    });
  }
  function onSetting(projectId: number, flowBaseId: string) {
    handleDrawerSettingVisible(true);
    setSettingFlowBaseId(flowBaseId);
    setSettingTable(
      <ProTable<MeasurementFlowBase, ListPagination>
        actionRef={actionRefMeasurement}
        search={{
          defaultCollapsed: false,
        }}
        toolBarRender={() => [
          <Tooltip title="Create">
            <Button
              size={'middle'}
              type="text"
              icon={<PlusOutlined />}
              onClick={() => {
                handleDrawerCreateMeasurementVisible(true);
                // setMeasurementBaseTable(
                //   <ProForm
                //     submitter={{
                //       render: () => {
                //         return [];
                //       },
                //     }}
                //   >
                //     <ProFormText width='md' name='name' label='Name' disabled={true} />
                //     <ProFormText width='md' name='unit' label='Unit' disabled={true} />
                //     <ProFormTextArea width='md' name='comment' label='Comment' disabled={true} />
                //   </ProForm>
                // );
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
          return getMeasurementFlowBaseGrid(params, sort, projectId, flowBaseId);
        }}
        columns={measurementFlowBaseColumns}
      />,
    );
  }
  function onDeleteMeasurementFlow(pkid: number) {
    Modal.confirm({
      title: 'Do you Want to delete this measurement?',
      icon: <ExclamationCircleOutlined />,
      content: '',
      onOk() {
        deleteMeasurementFlow(pkid).then(async (result) => {
          if (result === 'ok') {
            message.success('Delete successfully!');
            actionRefMeasurement.current?.reload();
          } else {
            message.error(result);
          }
        });
      },
      onCancel() {},
    });
  }
  return (
    <PageContainer>
      <ProTable<FlowBase, ListPagination>
        actionRef={actionRef}
        search={{
          defaultCollapsed: false,
        }}
        toolBarRender={() => [
          <Tooltip title="Create">
            <Button
              size={'middle'}
              type="text"
              icon={<PlusOutlined />}
              onClick={() => {
                handleDrawerCreateVisible(true);
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
          return getFlowBaseGrid(params, sort, projectid);
        }}
        columns={flowBaseColumns}
      />
      <Drawer
        title="Create"
        width="400px"
        maskClosable={false}
        visible={drawerCreateVisible}
        onClose={() => handleDrawerCreateVisible(false)}
        footer={
          <Space size={'middle'} className={styles.footer_right}>
            <Button onClick={() => handleDrawerCreateVisible(false)}>Cancel</Button>
            <Button onClick={() => formRefCreate.current?.submit()} type="primary">
              Submit
            </Button>
          </Space>
        }
      >
        <ProForm
          formRef={formRefCreate}
          submitter={{
            render: () => {
              return [];
            },
          }}
          onFinish={async (values) => {
            createFlowBase({ ...values, projectId: projectid }).then(async (result) => {
              if (result === 'ok') {
                message.success('Create successfully!');
                handleDrawerCreateVisible(false);
                if (actionRef.current) {
                  actionRef.current.reload();
                }
              } else {
                message.error(result);
              }
            });
            return true;
          }}
        >
          <ProFormText width="md" name="name" label="Name" />
          <ProFormText width="md" name="nation" label="Nation" />
          <ProFormText width="md" name="source" label="Source" />
          <ProFormText width="md" name="type" label="Type" />
          <ProFormTextArea width="md" name="comment" label="Comment" />
        </ProForm>
      </Drawer>
      <Drawer
        title="View"
        width="400px"
        maskClosable={true}
        visible={drawerViewVisible}
        onClose={() => handleDrawerViewVisible(false)}
      >
        {viewDescriptions}
      </Drawer>
      <Drawer
        title="Edit"
        width="400px"
        maskClosable={false}
        visible={drawerEditVisible}
        onClose={() => handleDrawerEditVisible(false)}
        footer={
          <Space size={'middle'} className={styles.footer_right}>
            <Button onClick={() => handleDrawerEditVisible(false)}>Cancel</Button>
            <Button onClick={() => onReset(editPkid)}>Reset</Button>
            <Button onClick={() => formRefEdit.current?.submit()} type="primary">
              Submit
            </Button>
          </Space>
        }
      >
        {editForm}
      </Drawer>
      <Drawer
        title="Setting"
        width="100%"
        maskClosable={false}
        visible={drawerSettingVisible}
        onClose={() => handleDrawerSettingVisible(false)}
        footer={
          <Space size={'middle'} className={styles.footer_right}>
            <Button onClick={() => handleDrawerSettingVisible(false)} type="primary">
              Finish
            </Button>
          </Space>
        }
      >
        {settingTable}
      </Drawer>
      <Drawer
        title="Create Measurement"
        width="400px"
        maskClosable={false}
        visible={drawerCreateMeasurementVisible}
        onClose={() => handleDrawerCreateMeasurementVisible(false)}
        footer={
          <Space size={'middle'} className={styles.footer_right}>
            <Button onClick={() => handleDrawerCreateMeasurementVisible(false)}>Cancel</Button>
            <Button onClick={() => formRefCreateMeasurement.current?.submit()} type="primary">
              Submit
            </Button>
          </Space>
        }
      >
        <ProForm
          formRef={formRefCreateMeasurement}
          submitter={{
            render: () => {
              return [];
            },
          }}
          onFinish={async (values) => {
            createMeasurementFlow({
              ...values,
              projectId: projectid,
              flowBaseId: settingFlowBaseId,
            }).then(async (result) => {
              if (result === 'ok') {
                message.success('Create successfully!');
                handleDrawerCreateMeasurementVisible(false);
                actionRefMeasurement.current?.reload();
              } else {
                message.error(result);
              }
            });
            return true;
          }}
        >
          <ProFormSelect
            options={[
              {
                value: 'true',
                label: 'true',
              },
              {
                value: 'false',
                label: 'false',
              },
            ]}
            width="md"
            name="asRef"
            label="As Ref"
          />
          <ProFormText width="md" name="conversionRef" label="Conversion Ref" />
          <ProFormText
            width="md"
            name="measurementBaseId"
            label="measurementBaseId"
            hidden={true}
          />
        </ProForm>
        <Divider>
          Measurement Base Info{' '}
          <Tooltip title="Select">
            <Button
              shape="circle"
              size="small"
              icon={<SelectOutlined />}
              onClick={() => {
                handleDrawerSelectMeasurementVisible(true);
              }}
            />
          </Tooltip>
        </Divider>
        {/* {measurementBaseTable} */}
        <ProForm
          formRef={formRefCreateMeasurementBase}
          submitter={{
            render: () => {
              return [];
            },
          }}
        >
          {/* <ProFormText width='md' name='id' label='ID' disabled={true} /> */}
          <ProFormText width="md" name="name" label="Name" disabled={true} />
          <ProFormText width="md" name="unit" label="Unit" disabled={true} />
          <ProFormTextArea width="md" name="comment" label="Comment" disabled={true} />
        </ProForm>
      </Drawer>
      <Drawer
        title="Select Measurement Base Info"
        width="100%"
        maskClosable={true}
        visible={drawerSelectMeasurementVisible}
        onClose={() => handleDrawerSelectMeasurementVisible(false)}
        footer={
          <Space size={'middle'} className={styles.footer_right}>
            <Button onClick={() => handleDrawerSelectMeasurementVisible(false)}>Cancel</Button>
            <Button
              onClick={() => {
                if (selectRowMeasurementBase) {
                  formRefCreateMeasurementBase.current?.setFieldsValue(selectRowMeasurementBase);
                  formRefCreateMeasurement.current?.setFieldsValue({
                    measurementBaseId: selectRowMeasurementBase.id,
                  });
                  handleDrawerSelectMeasurementVisible(false);
                } else {
                  message.error('Select nothing');
                }
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
            return getMeasurementBaseGrid(params, sort, projectid);
          }}
          columns={measurementBaseColumns}
          rowClassName={(record) => {
            return record.pkid === selectRowMeasurementBase?.pkid
              ? styles['split-row-select-active']
              : '';
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
    </PageContainer>
  );
};

export default TableList;
