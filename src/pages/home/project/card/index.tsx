// import { FolderOpenOutlined, DeleteOutlined } from '@ant-design/icons';
// import { Avatar, Card, List, Tooltip } from 'antd';
// import numeral from 'numeral';
import type { FC } from 'react';
import { useRef } from 'react';
// import React from 'react';
// import { useRequest } from 'umi';
import { getProjectList, starProject, deleteProject } from '@/services/project/list';
import type { ProjectListItem } from '@/services/project/list.d';
import styles from './style.less';
import ProList from '@ant-design/pro-list';
import type { ActionType } from '@ant-design/pro-table';
import { FolderOpenOutlined, DeleteOutlined, StarFilled, StarOutlined } from '@ant-design/icons';
import { Popconfirm } from 'antd';
import moment from 'moment';

type ProjectListProps = {
  location: {
    query: {
      searchValue: string;
    };
  };
};
let oldSearchValue = '';
const ListSearchApplications: FC<ProjectListProps> = (porps) => {
  const actionRef = useRef<ActionType>();
  const { searchValue } = porps.location.query;
  const setstar = (id: number) => {
    starProject(id);
    actionRef.current?.reload();
  };
  if (oldSearchValue !== searchValue) {
    oldSearchValue = searchValue;
    actionRef.current?.reload();
  }
  return (
    <div className={styles.filterCardList}>
      <ProList<ProjectListItem>
        actionRef={actionRef}
        request={(params) => {
          return getProjectList(params, { lastUpdateTime: 'descend' }, searchValue);
        }}
        grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 3,
          lg: 3,
          xl: 4,
          xxl: 4,
        }}
        metas={{
          title: {
            dataIndex: 'name',
            title: 'Name',
          },
          content: {
            render: (_, row) => {
              return (
                <div>
                  <span
                    onClick={() => {
                      setstar(row.id);
                    }}
                    hidden={row.star}
                  >
                    <StarOutlined />
                  </span>
                  <span
                    onClick={() => {
                      setstar(row.id);
                    }}
                    hidden={!row.star}
                  >
                    <StarFilled />
                  </span>
                  <p>
                    Created At: {moment(row.createTime).format('YYYY-MM-DD HH:mm:ss')}
                    <br />
                    Last Update: {moment(row.lastUpdateTime).format('YYYY-MM-DD HH:mm:ss')}
                    <br />
                    Comment: {row.comment}
                    <br />
                    {/* <a href={`/project/model?projectid=${row.id}`} target='_blank'> */}
                    <a href={`/project/plan/list?project=${row.id}`}>
                      <FolderOpenOutlined /> Open
                    </a>
                    <Popconfirm
                      title="Are you sure to delete this task?"
                      onConfirm={() => {
                        deleteProject(row.id);
                        actionRef.current?.reload();
                      }}
                      onCancel={() => {}}
                      okText="Yes"
                      cancelText="No"
                    >
                      <a href="#">
                        <DeleteOutlined /> Delete
                      </a>
                    </Popconfirm>
                  </p>
                </div>
              );
            },
          },
        }}

        // renderItem={(item) => (
        //   <List.Item key={item.id}>
        // <Card
        //   hoverable
        //   actions={[
        //     <Tooltip key="open" title="Open">
        //       <a href="/project/information" target="_blank">
        //         <FolderOpenOutlined />
        //       </a>
        //     </Tooltip>,
        //     <Tooltip key="delete" title="Delete">
        //       <DeleteOutlined onClick={() => alert('delete')} />
        //     </Tooltip>,
        //   ]}
        // >
        //   <Card.Meta avatar={<Avatar size="small" src={''} />} title={item.name} />
        //   <div className={styles.cardItemContent}>
        //     <CardInfo
        //       createdAt={item.createdAt}
        //       lastUpdate={item.lastUpdate}
        //       comment={item.comment}
        //     />
        //   </div>
        // </Card>
        // </List.Item>
        // )}
      />
    </div>
  );
};

export default ListSearchApplications;
