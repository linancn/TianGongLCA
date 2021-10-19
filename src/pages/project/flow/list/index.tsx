import type { FC } from 'react';
import { useState, useRef } from 'react';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { createFlowBase, getFlowBaseGrid } from '@/services/flow/api';
import type { FlowBase, FlowBaseListPagination } from '@/services/flow/api.d';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, message } from 'antd';
import { ModalForm, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
// import { FolderOpenOutlined } from '@ant-design/icons';

type ListProps = {
  location: {
    query: {
      project: number;
    };
  };
};
const handleCreate = async (fields: FlowBase) => {
  const hide = message.loading('loading');
  try {
    await createFlowBase(fields);
    hide();
    message.success('success');
    return true;
  } catch (error) {
    hide();
    message.error('error');
    return false;
  }
};
const TableList: FC<ListProps> = (porps) => {
  const actionRef = useRef<ActionType>();
  const { project } = porps.location.query;
  const columns: ProColumns<FlowBase>[] = [
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: true,
    },
    {
      title: 'Comment',
      dataIndex: 'comment',
      valueType: 'textarea',
      search: false,
    },
    {
      title: 'Type',
      dataIndex: 'type',
      sorter: true,
    },
    {
      title: 'Nation',
      dataIndex: 'nation',
      sorter: true,
    },
    {
      title: 'Last Update',
      dataIndex: 'lastUpdateTime',
      valueType: 'dateTime',
      sorter: true,
      search: false,
    },
    {
      title: 'Option',
      dataIndex: 'option',
      valueType: 'option',
      // render: (_, row) => [
      //     <a href={`/project/plan/model?projectid=${row.projectId}&id=${row.id}`} target="_blank">
      //       <FolderOpenOutlined /> Open
      //     </a>,
      // ],
    },
  ];
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  return (
    <PageContainer>
      <ProTable<FlowBase, FlowBaseListPagination>
        actionRef={actionRef}
        search={{
          defaultCollapsed: false,
          optionRender: (searchConfig, formProps, dom) => [
            ...dom.reverse(),
            <Button
              key="create"
              onClick={() => {
                handleModalVisible(true);
              }}
            >
              Creat
            </Button>,
          ],
        }}
        request={(
          params: {
            pageSize: number;
            current: number;
          },
          sort,
        ) => {
          return getFlowBaseGrid(params, sort, project);
        }}
        columns={columns}
      />
      <ModalForm
        title="Creat Flow"
        width="400px"
        visible={createModalVisible}
        onVisibleChange={handleModalVisible}
        onFinish={async (value) => {
          const success = await handleCreate({ ...value, projectId: project } as FlowBase);
          if (success) {
            handleModalVisible(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
      >
        Name:
        <ProFormText
          rules={[
            {
              required: true,
              message: '',
            },
          ]}
          width="md"
          name="name"
        />
        Comment:
        <ProFormTextArea width="md" name="comment" />
      </ModalForm>
    </PageContainer>
  );
};

export default TableList;
