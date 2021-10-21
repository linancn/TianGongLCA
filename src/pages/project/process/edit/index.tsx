import { Col, Row, message } from 'antd';
import type { FC } from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import type { ProFormInstance } from '@ant-design/pro-form';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import { PageContainer } from '@ant-design/pro-layout';
import { getProcess, updateProcess } from '@/services/process/api';
import type { Process } from '@/services/process/api.d';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import { EditableProTable } from '@ant-design/pro-table';
import type { Parameter, ParameterListPagination } from '@/services/parameter/api.d';
import {
  createParameter,
  deleteParameter,
  getParameterGrid,
  updateParameter,
} from '@/services/parameter/api';
import ProCard from '@ant-design/pro-card';

type EditProps = {
  location: {
    query: {
      project: number;
      id: string;
    };
  };
};

const AdvancedForm: FC<EditProps> = (porps) => {
  const { project, id } = porps.location.query;
  const [editProcess, setEditProcess] = useState<Process>();
  const [editableKeys, setEditableKeys] = useState<React.Key[]>([]);
  const formRef = useRef<ProFormInstance>();
  const actionRef = useRef<ActionType>();

  const columns: ProColumns<Parameter>[] = [
    {
      title: 'ID',
      dataIndex: 'pkid',
      sorter: true,
      editable: false,
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
      valueType: 'option',
      width: 200,
      render: (_, record: Parameter, index, action) => [
        <a
          key="edit"
          onClick={() => {
            action?.startEditable?.(record.pkid);
          }}
        >
          Edit
        </a>,
        <a
          key="delete"
          onClick={() => {
            deleteParameter(record.pkid).then(async (result) => {
              if (result === 'ok') {
                message.success('Delete successfully!');
              } else {
                message.error(result);
              }
              actionRef.current?.reload();
            });
          }}
        >
          Delete
        </a>,
      ],
    },
  ];
  if (!editProcess) {
    getProcess(project, id).then(async (result) => {
      setEditProcess(result);
      formRef?.current?.setFieldsValue(result);
    });
  }
  return (
    <PageContainer>
      <ProCard bordered={false}>
        <ProForm
          formRef={formRef}
          // submitter={{
          //   render: () => {
          //     return [];
          //   },
          // }}
          onFinish={async (values) => {
            if (editProcess) {
              updateProcess({ ...values, pkid: editProcess.pkid }).then(async (result) => {
                if (result === 'ok') {
                  message.success('Edit successfully!');
                } else {
                  message.error(result);
                }
              });
              return true;
            }
            return false;
          }}
          onReset={() => {
            getProcess(project, id).then(async (result) => {
              setEditProcess(result);
              formRef?.current?.setFieldsValue(result);
            });
          }}
        >
          <Row gutter={16}>
            <Col lg={6} md={12} sm={24}>
              <ProFormText width="md" name="name" label="Name" />
            </Col>
            <Col lg={6} md={12} sm={24}>
              <ProFormText width="md" name="type" label="Type" />
            </Col>
            <Col lg={6} md={12} sm={24}>
              <ProFormText width="md" name="nation" label="Nation" />
            </Col>
            <Col lg={6} md={12} sm={24}>
              <ProFormText width="md" name="comment" label="Comment" />
            </Col>
          </Row>
        </ProForm>
      </ProCard>

      <ProCard title="Parameters" bordered={false} collapsible>
        <EditableProTable<Parameter, ParameterListPagination>
          // recordCreatorProps={{
          //   position: 'bottom',
          //   newRecordType: 'dataSource',
          //   // record: () => ({

          //   // })
          // }}
          actionRef={actionRef}
          recordCreatorProps={{
            record: () => {
              return {
                pkid: -1,
                name: '',
                comment: '',
                projectId: project,
                processId: id,
              };
            },
          }}
          columns={columns}
          rowKey="pkid"
          request={(
            params: {
              pageSize: number;
              current: number;
            },
            sort,
          ) => {
            return getParameterGrid(params, sort, project, id);
          }}
          editable={{
            editableKeys,
            onSave: async (key, record) => {
              if (key === -1) {
                createParameter(record).then(async (result) => {
                  if (result === 'ok') {
                    message.success('Create successfully!');
                  } else {
                    message.error(result);
                  }
                  actionRef.current?.reload();
                });
              } else {
                updateParameter(record).then(async (result) => {
                  if (result === 'ok') {
                    message.success('Edit successfully!');
                  } else {
                    message.error(result);
                  }
                  actionRef.current?.reload();
                });
              }
            },
            onChange: (keys) => {
              setEditableKeys(keys);
            },
          }}
        />
      </ProCard>
    </PageContainer>
  );
};

export default AdvancedForm;
