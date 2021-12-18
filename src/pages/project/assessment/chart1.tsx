import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { AutoChart } from '@antv/auto-chart';
import { PageContainer } from '@ant-design/pro-layout';
import { Typography } from 'antd';
import { FormattedMessage } from 'umi';
import { getProject } from '@/services/project/api';
import '@/style/custom.less';

const { Title } = Typography;
type Props = {
  location: {
    query: {
      projectid: number;
    };
  };
};
const Chart1: FC<Props> = (props) => {
  const { projectid } = props.location.query;
  const [projectName, setProjectName] = useState('');
  const data = [
    {
      name: 'Acidification',
      process: 'Tutorial End of Life Model <LC>',
      value: 2.37741e-8,
    },
    {
      name: 'Acidification',
      process: 'DE: BF Steel billet / slab / bloom ts <p-agg>',
      value: 1.72693e-8,
    },
    {
      name: 'Acidification',
      process: 'DE: Diesel mix at refinery ts',
      value: 0,
    },
    {
      name: 'Acidification',
      process: 'DE: Electricity grid mix ts',
      value: 1.76143e-9,
    },
    {
      name: 'Acidification',
      process: 'DE: Paper Clip Bending <u-so>',
      value: 0,
    },
    {
      name: 'Acidification',
      process: 'DE: Steel wire rod ts <p-agg>',
      value: 5.2716e-9,
    },
    {
      name: 'Acidification',
      process: 'DE: Use Phase Steel Paper Clip <u-so>',
      value: 0,
    },
    {
      name: 'Acidification',
      process: 'GLO: Truck ts <u-so>',
      value: 0,
    },
    {
      name: 'Ecotoxicity (recommended)',
      process: 'Tutorial End of Life Model <LC>',
      value: 7.11729e-9,
    },
    {
      name: 'Ecotoxicity (recommended)',
      process: 'DE: BF Steel billet / slab / bloom ts <p-agg>',
      value: 3.00955e-9,
    },
    {
      name: 'Ecotoxicity (recommended)',
      process: 'DE: Diesel mix at refinery ts',
      value: 0,
    },
    {
      name: 'Ecotoxicity (recommended)',
      process: 'DE: Electricity grid mix ts',
      value: 1.44955e-10,
    },
    {
      name: 'Ecotoxicity (recommended)',
      process: 'DE: Paper Clip Bending <u-so>',
      value: 0,
    },
    {
      name: 'Ecotoxicity (recommended)',
      process: 'DE: Steel wire rod ts <p-agg>',
      value: 7.89991e-10,
    },
    {
      name: 'Ecotoxicity (recommended)',
      process: 'DE: Use Phase Steel Paper Clip <u-so>',
      value: 0,
    },
    {
      name: 'Ecotoxicity (recommended)',
      process: 'GLO: Truck ts <u-so>',
      value: 0,
    },
    {
      name: 'Eutrophication',
      process: 'Tutorial End of Life Model <LC>',
      value: 8.09909e-9,
    },
    {
      name: 'Eutrophication',
      process: 'DE: BF Steel billet / slab / bloom ts <p-agg>',
      value: 4.12043e-9,
    },
    {
      name: 'Eutrophication',
      process: 'DE: Diesel mix at refinery ts',
      value: 0,
    },
    {
      name: 'Eutrophication',
      process: 'DE: Electricity grid mix ts',
      value: 1.16155e-9,
    },
    {
      name: 'Eutrophication',
      process: 'DE: Paper Clip Bending <u-so>',
      value: 0,
    },
    {
      name: 'Eutrophication',
      process: 'DE: Steel wire rod ts <p-agg>',
      value: 3.48289e-9,
    },
    {
      name: 'Eutrophication',
      process: 'DE: Use Phase Steel Paper Clip <u-so>',
      value: 0,
    },
    {
      name: 'Eutrophication',
      process: 'GLO: Truck ts <u-so>',
      value: 0,
    },
    {
      name: 'Global Warming Air, incl. biogenic carbon',
      process: 'Tutorial End of Life Model <LC>',
      value: 6.73327e-8,
    },
    {
      name: 'Global Warming Air, incl. biogenic carbon',
      process: 'DE: BF Steel billet / slab / bloom ts <p-agg>',
      value: 2.8149e-8,
    },
    {
      name: 'Global Warming Air, incl. biogenic carbon',
      process: 'DE: Diesel mix at refinery ts',
      value: 0,
    },
    {
      name: 'Global Warming Air, incl. biogenic carbon',
      process: 'DE: Electricity grid mix ts',
      value: 8.81934e-9,
    },
    {
      name: 'Global Warming Air, incl. biogenic carbon',
      process: 'DE: Paper Clip Bending <u-so>',
      value: 0,
    },
    {
      name: 'Global Warming Air, incl. biogenic carbon',
      process: 'DE: Steel wire rod ts <p-agg>',
      value: 2.92806e-8,
    },
    {
      name: 'Global Warming Air, incl. biogenic carbon',
      process: 'DE: Use Phase Steel Paper Clip <u-so>',
      value: 0,
    },
    {
      name: 'Global Warming Air, incl. biogenic carbon',
      process: 'GLO: Truck ts <u-so>',
      value: 0,
    },
    {
      name: 'Human Health Particulate Air',
      process: 'Tutorial End of Life Model <LC>',
      value: 1.22767e-8,
    },
    {
      name: 'Human Health Particulate Air',
      process: 'DE: BF Steel billet / slab / bloom ts <p-agg>',
      value: 1.58934e-8,
    },
    {
      name: 'Human Health Particulate Air',
      process: 'DE: Diesel mix at refinery ts',
      value: 0,
    },
    {
      name: 'Human Health Particulate Air',
      process: 'DE: Electricity grid mix ts',
      value: 5.30237e-10,
    },
    {
      name: 'Human Health Particulate Air',
      process: 'DE: Paper Clip Bending <u-so>',
      value: 0,
    },
    {
      name: 'Human Health Particulate Air',
      process: 'DE: Steel wire rod ts <p-agg>',
      value: 6.54073e-9,
    },
    {
      name: 'Human Health Particulate Air',
      process: 'DE: Use Phase Steel Paper Clip <u-so>',
      value: 0,
    },
    {
      name: 'Human Health Particulate Air',
      process: 'GLO: Truck ts <u-so>',
      value: 0,
    },
    {
      name: 'Human toxicity, cancer (recommended)',
      process: 'Tutorial End of Life Model <LC>',
      value: 4.07867e-9,
    },
    {
      name: 'Human toxicity, cancer (recommended)',
      process: 'DE: BF Steel billet / slab / bloom ts <p-agg>',
      value: 9.61423e-9,
    },
    {
      name: 'Human toxicity, cancer (recommended)',
      process: 'DE: Diesel mix at refinery ts',
      value: 0,
    },
    {
      name: 'Human toxicity, cancer (recommended)',
      process: 'DE: Electricity grid mix ts',
      value: 6.00485e-10,
    },
    {
      name: 'Human toxicity, cancer (recommended)',
      process: 'DE: Paper Clip Bending <u-so>',
      value: 0,
    },
    {
      name: 'Human toxicity, cancer (recommended)',
      process: 'DE: Steel wire rod ts <p-agg>',
      value: 3.57771e-9,
    },
    {
      name: 'Human toxicity, cancer (recommended)',
      process: 'DE: Use Phase Steel Paper Clip <u-so>',
      value: 0,
    },
    {
      name: 'Human toxicity, cancer (recommended)',
      process: 'GLO: Truck ts <u-so>',
      value: 0,
    },
    {
      name: 'Human toxicity, non-canc. (recommended)',
      process: 'Tutorial End of Life Model <LC>',
      value: 6.99975e-8,
    },
    {
      name: 'Human toxicity, non-canc. (recommended)',
      process: 'DE: BF Steel billet / slab / bloom ts <p-agg>',
      value: 1.30773e-7,
    },
    {
      name: 'Human toxicity, non-canc. (recommended)',
      process: 'DE: Diesel mix at refinery ts',
      value: 0,
    },
    {
      name: 'Human toxicity, non-canc. (recommended)',
      process: 'DE: Electricity grid mix ts',
      value: 1.49762e-9,
    },
    {
      name: 'Human toxicity, non-canc. (recommended)',
      process: 'DE: Paper Clip Bending <u-so>',
      value: 0,
    },
    {
      name: 'Human toxicity, non-canc. (recommended)',
      process: 'DE: Steel wire rod ts <p-agg>',
      value: 5.28846e-9,
    },
    {
      name: 'Human toxicity, non-canc. (recommended)',
      process: 'DE: Use Phase Steel Paper Clip <u-so>',
      value: 0,
    },
    {
      name: 'Human toxicity, non-canc. (recommended)',
      process: 'GLO: Truck ts <u-so>',
      value: 0,
    },
    {
      name: 'Ozone Depletion Air',
      process: 'Tutorial End of Life Model <LC>',
      value: 2.49532e-13,
    },
    {
      name: 'Ozone Depletion Air',
      process: 'DE: BF Steel billet / slab / bloom ts <p-agg>',
      value: 1.72773e-14,
    },
    {
      name: 'Ozone Depletion Air',
      process: 'DE: Diesel mix at refinery ts',
      value: 0,
    },
    {
      name: 'Ozone Depletion Air',
      process: 'DE: Electricity grid mix ts',
      value: 4.1215e-14,
    },
    {
      name: 'Ozone Depletion Air',
      process: 'DE: Paper Clip Bending <u-so>',
      value: 0,
    },
    {
      name: 'Ozone Depletion Air',
      process: 'DE: Steel wire rod ts <p-agg>',
      value: 7.87222e-14,
    },
    {
      name: 'Ozone Depletion Air',
      process: 'DE: Use Phase Steel Paper Clip <u-so>',
      value: 0,
    },
    {
      name: 'Ozone Depletion Air',
      process: 'GLO: Truck ts <u-so>',
      value: 0,
    },
    {
      name: 'Resources, Fossil fuels',
      process: 'Tutorial End of Life Model <LC>',
      value: 4.20565e-8,
    },
    {
      name: 'Resources, Fossil fuels',
      process: 'DE: BF Steel billet / slab / bloom ts <p-agg>',
      value: 1.61393e-9,
    },
    {
      name: 'Resources, Fossil fuels',
      process: 'DE: Diesel mix at refinery ts',
      value: 0,
    },
    {
      name: 'Resources, Fossil fuels',
      process: 'DE: Electricity grid mix ts',
      value: 2.5379e-9,
    },
    {
      name: 'Resources, Fossil fuels',
      process: 'DE: Paper Clip Bending <u-so>',
      value: 0,
    },
    {
      name: 'Resources, Fossil fuels',
      process: 'DE: Steel wire rod ts <p-agg>',
      value: 3.41945e-8,
    },
    {
      name: 'Resources, Fossil fuels',
      process: 'DE: Use Phase Steel Paper Clip <u-so>',
      value: 0,
    },
    {
      name: 'Resources, Fossil fuels',
      process: 'GLO: Truck ts <u-so>',
      value: 0,
    },
    {
      name: 'Smog Air',
      process: 'Tutorial End of Life Model <LC>',
      value: 2.12371e-8,
    },
    {
      name: 'Smog Air',
      process: 'DE: BF Steel billet / slab / bloom ts <p-agg>',
      value: 1.66892e-8,
    },
    {
      name: 'Smog Air',
      process: 'DE: Diesel mix at refinery ts',
      value: 0,
    },
    {
      name: 'Smog Air',
      process: 'DE: Electricity grid mix ts',
      value: 2e-9,
    },
    {
      name: 'Smog Air',
      process: 'DE: Paper Clip Bending <u-so>',
      value: 0,
    },
    {
      name: 'Smog Air',
      process: 'DE: Steel wire rod ts <p-agg>',
      value: 6.71299e-9,
    },
    {
      name: 'Smog Air',
      process: 'DE: Use Phase Steel Paper Clip <u-so>',
      value: 0,
    },
    {
      name: 'Smog Air',
      process: 'GLO: Truck ts <u-so>',
      value: 0,
    },
  ];
  // const config = {
  //   data,
  //   xField: 'process',
  //   yField: 'value',
  //   isStack: true,
  //   seriesField: 'name',
  //   xAxis: {
  //     title: {
  //       text: 'Processes',
  //     },
  //   },
  //   yAxis: {
  //     title: {
  //       text: 'Mass',
  //     },
  //   },
  //   theme: 'dark',
  // };
  useEffect(() => {
    getProject(projectid).then((result) => setProjectName(result.name + ' - '));
  }, [projectid]);
  return (
    <PageContainer
      header={{
        title: (
          <>
            {projectName}
            <FormattedMessage id="menu.assessment" defaultMessage="Assessment" />
          </>
        ),
      }}
    >
      <Title level={5} style={{ textAlign: 'center' }}>
        Non renewable energy resources
      </Title>
      <AutoChart data={data} language={'en-US'} />
    </PageContainer>
  );
};

export default Chart1;
