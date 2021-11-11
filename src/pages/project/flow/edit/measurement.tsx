import type { FC } from 'react';
import { useRef, useState } from 'react';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { Button, Descriptions, Drawer, message, Modal, Space, Tooltip } from 'antd';
import {
  deleteMeasurementFlow,
  getMeasurementFlow,
  getMeasurementFlowGrid,
  updateMeasurementFlow,
} from '@/services/measurementflow/api';
import type {
  MeasurementFlow,
  MeasurementFlowListPagination,
} from '@/services/measurementflow/data';
import {
  DeleteOutlined,
  ExclamationCircleOutlined,
  FormOutlined,
  PlusOutlined,
  ProfileOutlined,
} from '@ant-design/icons';
import type { ProFormInstance } from '@ant-design/pro-form';
import ProForm, { ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import styles from './style.less';

type Props = {
  project: number;
  process: string;
};

const MeasurementList: FC<Props> = ({ project }) => {
  const actionRef = useRef<ActionType>();
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const formRefEdit = useRef<ProFormInstance>();
  const [viewDescriptions, setViewDescriptions] = useState<JSX.Element>();
  const [editDescriptions, setEditDescriptions] = useState<JSX.Element>();
  const [editPkid, setEditPkid] = useState<number>(0);
  const columns: ProColumns<MeasurementFlow>[] = [
    {
      title: 'ID',
      dataIndex: 'pkid',
      sorter: true,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: true,
    },
    {
      title: 'Comment',
      dataIndex: 'comment',
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
      // render: (_, record: MeasurementFlow, _index, action) => [
      //   <a
      //     key="edit"
      //     onClick={() => {

      //     }}
      //   >
      //     Edit
      //   </a>,
      //   <a
      //     key="delete"
      //     onClick={() => {
      //       deleteMeasurementFlow(record.pkid).then(async (result) => {
      //         if (result === 'ok') {
      //           message.success('Delete successfully!');
      //         } else {
      //           message.error(result);
      //         }
      //         actionRef.current?.reload();
      //       });
      //     }}
      //   >
      //     Delete
      //   </a>,
      // ],
    },
  ];
  const handleDrawerAddCancel = () => {
    setIsDrawerVisible(false);
  };
  const addMeasurementBase = () => {};
  const [drawerViewVisible, handleDrawerViewVisible] = useState<boolean>(false);
  const handleDrawerViewCancel = () => {
    handleDrawerViewVisible(false);
  };
  const [drawerEditVisible, handleDrawerEditVisible] = useState<boolean>(false);
  const handleDrawerEditCancel = () => {
    handleDrawerEditVisible(false);
  };
  function onView(pkid: number) {
    handleDrawerViewVisible(true);
    getMeasurementFlow(pkid).then(async (result) => {
      setViewDescriptions(
        <Descriptions column={1}>
          <Descriptions.Item label="Name">{result?.name}</Descriptions.Item>
          <Descriptions.Item label="Comment">{result?.comment}</Descriptions.Item>
        </Descriptions>,
      );
    });
  }
  function onEdit(pkid: number) {
    handleDrawerEditVisible(true);
    setEditPkid(pkid);
    getMeasurementFlow(pkid).then(async (pi) => {
      setEditDescriptions(
        <ProForm
          formRef={formRefEdit}
          submitter={{
            render: () => {
              return [];
            },
          }}
          onFinish={async (values) => {
            updateMeasurementFlow({ ...values, pkid: pi.pkid }).then(async (result) => {
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
          <ProFormTextArea width="md" name="comment" label="Comment" />
        </ProForm>,
      );
      formRefEdit.current?.setFieldsValue(pi);
    });
  }
  function onDelete(pkid: number) {
    Modal.confirm({
      title: 'Do you Want to delete this measurement?',
      icon: <ExclamationCircleOutlined />,
      content: '',
      onOk() {
        deleteMeasurementFlow(pkid).then(async (result) => {
          if (result === 'ok') {
            message.success('Delete successfully!');
            actionRef.current?.reload();
          } else {
            message.error(result);
          }
          actionRef.current?.reload();
        });
      },
      onCancel() {},
    });
  }
  function onReset(pkid: number) {
    getMeasurementFlow(pkid).then(async (pi) => {
      formRefEdit.current?.setFieldsValue(pi);
    });
  }
  const onSubmitEdit = () => {
    formRefEdit.current?.submit();
  };
  return (
    <>
      <ProTable<MeasurementFlow, MeasurementFlowListPagination>
        headerTitle="Measurements"
        actionRef={actionRef}
        search={false}
        pagination={false}
        columns={columns}
        toolBarRender={() => [
          <Tooltip title="Add">
            <Button
              type="text"
              icon={<PlusOutlined />}
              onClick={() => {
                setIsDrawerVisible(true);
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
          return getMeasurementFlowGrid(params, sort, project);
        }}
      />
      <Drawer visible={isDrawerVisible} title="Add" onClose={handleDrawerAddCancel}>
        <Button onClick={addMeasurementBase}>Add</Button>
      </Drawer>
      <Drawer
        title="View Measurement"
        width="400px"
        maskClosable={true}
        visible={drawerViewVisible}
        onClose={handleDrawerViewCancel}
      >
        {viewDescriptions}
      </Drawer>
      <Drawer
        title="Edit Measurement"
        width="400px"
        maskClosable={false}
        visible={drawerEditVisible}
        onClose={handleDrawerEditCancel}
        footer={
          <Space size={'middle'} className={styles.footer_right}>
            <Button onClick={handleDrawerEditCancel}>Cancel</Button>
            <Button onClick={() => onReset(editPkid)}>Reset</Button>
            <Button onClick={onSubmitEdit} type="primary">
              Submit
            </Button>
          </Space>
        }
      >
        {editDescriptions}
      </Drawer>
    </>
  );
};
export default MeasurementList;
