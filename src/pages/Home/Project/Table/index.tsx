import { Card } from 'antd';
import type { FC } from 'react';

const ListSearchArticles: FC = () => {
  return (
    <>
      <Card
        style={{ marginTop: 24 }}
        bordered={false}
        bodyStyle={{ padding: '8px 32px 32px 32px' }}
      ></Card>
    </>
  );
};

export default ListSearchArticles;
