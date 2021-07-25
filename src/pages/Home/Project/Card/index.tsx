import { FolderOpenOutlined, DeleteOutlined } from '@ant-design/icons';
import { Avatar, Card, List, Tooltip } from 'antd';
import numeral from 'numeral';
import type { FC } from 'react';
import React from 'react';
import { useRequest } from 'umi';
import type { ListItemDataType } from 'mock/project/card.d';
import { queryFakeList } from '@/services/project/card';
import styles from './style.less';

export function formatWan(val: number) {
  const v = val * 1;
  if (!v || Number.isNaN(v)) return '';

  let result: React.ReactNode = val;
  if (val > 10000) {
    result = (
      <span>
        {Math.floor(val / 10000)}
        <span
          style={{
            position: 'relative',
            top: -2,
            fontSize: 14,
            fontStyle: 'normal',
            marginLeft: 2,
          }}
        >
          万
        </span>
      </span>
    );
  }
  return result;
}

const CardInfo: React.FC<{
  activeUser: React.ReactNode;
  newUser: React.ReactNode;
}> = () => (
  <div className={styles.cardInfo}>
    <div>
      <p>Created At</p>
      {/* <p>{activeUser}</p> */}
    </div>
    <div>
      <p>Last Update</p>
      {/* <p>{newUser}</p> */}
    </div>
  </div>
);

export const ListSearchApplications: FC<Record<string, any>> = () => {
  const { data, loading } = useRequest((values: any) => {
    console.log('form data', values);
    return queryFakeList({
      count: 1,
    });
  });

  const list = data?.list || [];
  return (
    <div className={styles.filterCardList}>
      <List<ListItemDataType>
        rowKey="id"
        grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 3,
          lg: 3,
          xl: 4,
          xxl: 4,
        }}
        loading={loading}
        dataSource={list}
        renderItem={(item) => (
          <List.Item key={item.id}>
            <Card
              hoverable
              bodyStyle={{ paddingBottom: 20 }}
              actions={[
                <Tooltip key="open" title="Open">
                  <a href="/project/information" target="_blank">
                    <FolderOpenOutlined />
                  </a>
                </Tooltip>,
                <Tooltip key="delete" title="Delete">
                  <DeleteOutlined onClick={() => alert('delete')} />
                </Tooltip>,
              ]}
            >
              <Card.Meta avatar={<Avatar size="small" src={item.avatar} />} title={item.title} />
              <div className={styles.cardItemContent}>
                <CardInfo
                  activeUser={formatWan(item.activeUser)}
                  newUser={numeral(item.newUser).format('0,0')}
                />
              </div>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default ListSearchApplications;
