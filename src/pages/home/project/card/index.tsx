import type { FC } from 'react';
import { useRef } from 'react';
import { getProjectList, starProject, deleteProject } from '@/services/project/api';
import type { Project } from '@/services/project/data';
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
      nl: string;
      r: number;
    };
  };
};
let nameLike = '';
let reload = 0;
const ListSearchApplications: FC<ProjectListProps> = (porps) => {
  const actionRef = useRef<ActionType>();
  const { nl, r } = porps.location.query;
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
  if (nameLike !== nl) {
    nameLike = nl;
    actionRef.current?.reload();
  }
  if (reload < r) {
    reload = r;
    actionRef.current?.reload();
  }
  return (
    <ProList<Project>
      actionRef={actionRef}
      request={(params) => {
        return getProjectList(params, { lastUpdateTime: 'descend' }, nl);
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
              <Tooltip title={row.star === true ? 'Starred' : 'No star'}>
                <Button
                  shape="circle"
                  icon={row.star === true ? <StarFilled /> : <StarOutlined />}
                  size="small"
                  onClick={() => {
                    setstar(row.id);
                  }}
                />
              </Tooltip>,
              <Tooltip title="Open">
                <Button
                  href={`/project/plan/list?projectid=${row.id}`}
                  // target='_blank'
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
    />
  );
};

export default ListSearchApplications;
