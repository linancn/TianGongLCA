import type { FC } from 'react';
import { useRef, useEffect, useState } from 'react';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { PageContainer } from '@ant-design/pro-layout';
import type { ListPagination } from '@/services/home/data';
import { FormattedMessage } from 'umi';
import { getProject } from '@/services/project/api';
import { Button, Space, Tooltip } from 'antd';
import CategoryView from './components/view';
import CategoryDelete from './components/delete';
import CategoryEdit from './components/edit';
import type { Category } from '@/services/category/data';
import CategoryCreate from './components/create';
import { DatabaseOutlined } from '@ant-design/icons';
import { getCategoryGrid } from '@/services/category/api';

type ListProps = {
  location: {
    query: {
      projectid: number;
    };
  };
};
const CategoryIndex: FC<ListProps> = (props) => {
  const actionRef = useRef<ActionType>();
  const { projectid } = props.location.query;
  const [projectName, setProjectName] = useState('');
  const categoryColumns: ProColumns<Category>[] = [
    {
      title: 'ID',
      dataIndex: 'index',
      valueType: 'index',
      search: false,
    },
    {
      title: 'Data Name',
      dataIndex: 'dataName',
      sorter: true,
    },
    {
      title: 'Last Change',
      dataIndex: 'lastChange',
      valueType: 'dateTime',
      sorter: true,
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
      search: false,
      render: (_, row) => [
        <Space size={'small'}>
          <CategoryView pkid={row.pkid} actionRef={actionRef} />
          <CategoryEdit
            pkid={row.pkid}
            buttonType={'icon'}
            actionRef={actionRef}
            setViewDrawerVisible={() => {}}
          />
          <CategoryDelete
            pkid={row.pkid}
            buttonType={'icon'}
            actionRef={actionRef}
            setViewDrawerVisible={() => {}}
          />
        </Space>,
      ],
    },
  ];

  useEffect(() => {
    getProject(projectid).then((result) => setProjectName(result.name + ' - '));
  }, [projectid]);

  return (
    <PageContainer
      header={{
        title: (
          <>
            {projectName}
            <FormattedMessage id="menu.measurements" defaultMessage="Measurements" />
          </>
        ),
      }}
    >
      <ProTable<Category, ListPagination>
        actionRef={actionRef}
        search={{
          defaultCollapsed: false,
        }}
        toolBarRender={() => [
          <CategoryCreate projectId={projectid} actionRef={actionRef} />,
          <Tooltip
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
                // handleDrawerVisible(true);
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
          return getCategoryGrid(params, sort, projectid);
        }}
        columns={categoryColumns}
      />
    </PageContainer>
  );
};

export default CategoryIndex;
