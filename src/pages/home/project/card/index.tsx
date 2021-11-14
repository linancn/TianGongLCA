// import { FolderOpenOutlined, DeleteOutlined } from '@ant-design/icons';
// import { Avatar, Card, List, Tooltip } from 'antd';
// import numeral from 'numeral';
import type { FC } from 'react';
import { useRef } from 'react';
// import React from 'react';
// import { useRequest } from 'umi';
import { getProjectList, starProject, deleteProject } from '@/services/project/api';
import type { ProjectListItem } from '@/services/project/data';
import ProList from '@ant-design/pro-list';
import type { ActionType } from '@ant-design/pro-table';
import {
  FolderOpenOutlined,
  DeleteOutlined,
  StarFilled,
  StarOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { Button, message, Modal, Tooltip } from 'antd';
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
  function onDelete(pkid: number) {
    Modal.confirm({
      title: 'Do you Want to delete this plan?',
      icon: <ExclamationCircleOutlined />,
      content: '',
      onOk() {
        deleteProject(pkid).then(async (result) => {
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
  if (oldSearchValue !== searchValue) {
    oldSearchValue = searchValue;
    actionRef.current?.reload();
  }
  return (
    // <div className={styles.filterCardList}>
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
        subTitle: {
          dataIndex: 'name',
        },
        actions: {
          render: (_, row) => {
            return [
              <Tooltip title={row.star ? 'No star' : 'Starred'}>
                <Button
                  shape="circle"
                  icon={row.star ? <StarOutlined /> : <StarFilled />}
                  size="small"
                  onClick={() => {
                    setstar(row.id);
                  }}
                />
              </Tooltip>,
              <Tooltip title="Open">
                <Button
                  href={`/project/plan/list?projectid=${row.id}`}
                  target="_blank"
                  shape="circle"
                  icon={<FolderOpenOutlined />}
                  size="small"
                />
              </Tooltip>,
              <Tooltip title="Delete">
                <Button
                  shape="circle"
                  icon={<DeleteOutlined />}
                  size="small"
                  onClick={() => onDelete(row.id)}
                />
              </Tooltip>,
            ];
          },
        },
        content: {
          render: (_, row) => {
            return (
              <>
                Created At: {moment(row.createTime).format('YYYY-MM-DD HH:mm:ss')}
                <br />
                Last Update: {moment(row.lastUpdateTime).format('YYYY-MM-DD HH:mm:ss')}
                <br />
                Comment: {row.comment}
              </>
            );
          },
        },
      }}

      // renderItem={(item) => (
      //   <List.Item key={item.id}>
      // <Card
      //   hoverable
      //   actions={[
      //     <Tooltip key='open' title='Open'>
      //       <a href='/project/information' target='_blank'>
      //         <FolderOpenOutlined />
      //       </a>
      //     </Tooltip>,
      //     <Tooltip key='delete' title='Delete'>
      //       <DeleteOutlined onClick={() => alert('delete')} />
      //     </Tooltip>,
      //   ]}
      // >
      //   <Card.Meta avatar={<Avatar size='small' src={''} />} title={item.name} />
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
    // </div>
  );
};

export default ListSearchApplications;
