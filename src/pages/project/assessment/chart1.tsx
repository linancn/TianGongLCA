import type { FC } from 'react';
import { Column } from '@ant-design/charts';
import { PageContainer } from '@ant-design/pro-layout';
import { Typography } from 'antd';
// import styles from '@/style/custom.less';

const { Title } = Typography;

const Chart1: FC = () => {
  const data = JSON.parse(`
  [
    {
      "name": "Crude oil",
      "process": "EAF Steel",
      "value": 9.6
    },
    {
      "name": "Hard coal",
      "process": "EAF Steel",
      "value": 12.8
    },
    {
      "name": "Lignite",
      "process": "EAF Steel",
      "value": 3.8
    },
    {
      "name": "Natural gas",
      "process": "EAF Steel",
      "value": 10.4
    },
    {
      "name": "Peat",
      "process": "EAF Steel",
      "value": 7.2
    },
    {
      "name": "Uranium",
      "process": "EAF Steel",
      "value": 6.9
    },
    {
      "name": "Crude oil",
      "process": "BF Steel",
      "value": 18.1
    },
    {
      "name": "Hard coal",
      "process": "BF Steel",
      "value": 11.5
    },
    {
      "name": "Lignite",
      "process": "BF Steel",
      "value": 8.4
    },
    {
      "name": "Natural gas",
      "process": "BF Steel",
      "value": 13.7
    },
    {
      "name": "Peat",
      "process": "BF Steel",
      "value": 6.9
    },
    {
      "name": "Uranium",
      "process": "BF Steel",
      "value": 5.2
    }
  ]
  `);
  const config = {
    data,
    xField: 'process',
    yField: 'value',
    isStack: true,
    seriesField: 'name',
    xAxis: {
      title: {
        text: 'Processes',
      },
    },
    yAxis: {
      title: {
        text: 'Mass',
      },
    },
    theme: 'dark',
  };

  return (
    <PageContainer title="Assessment">
      <Title level={5} style={{ textAlign: 'center' }}>
        Non renewable energy resources
      </Title>
      <Column {...config} />
    </PageContainer>
  );
};

export default Chart1;
