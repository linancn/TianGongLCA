import type { S2Options } from '@antv/s2';
import { PivotSheet } from '@antv/s2';
import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { getResultData2 } from '@/services/assessment/api';
import { PageContainer } from '@ant-design/pro-layout';
import { Button } from 'antd';
import { BarChartOutlined, FileTextOutlined } from '@ant-design/icons';
import { getProject } from '@/services/project/api';
import { FormattedMessage } from 'umi';

type Props = {
  location: {
    query: {
      projectid: number;
    };
  };
};

const PivotSheetTable: FC<Props> = (prop) => {
  const { projectid } = prop.location.query;
  const [projectName, setProjectName] = useState('');
  const createPivotSheet = (containerDiv: HTMLElement) => {
    // getResultData().then(async (result: S2DataConfig) => {
    const result = getResultData2();
    if (containerDiv !== null) {
      const cWidth =
        containerDiv.clientWidth || containerDiv.offsetWidth || containerDiv.scrollWidth;
      const cHeight =
        containerDiv.clientHeight || containerDiv.offsetHeight || containerDiv.scrollHeight;
      const s2Options: S2Options<Element> = {
        width: cWidth,
        height: cHeight,
        hierarchyType: 'customTree',
        totals: {
          row: {
            showGrandTotals: true,
            showSubTotals: true,
            reverseLayout: true,
            reverseSubLayout: true,
            // subTotalsDimensions: ['f1', 'f2', 'f3', 'f4', 'f5'],
          },
          col: {
            // showGrandTotals: true,
            showSubTotals: true,
            reverseLayout: true,
            reverseSubLayout: true,
            subTotalsDimensions: ['p1', 'p2', 'p3'],
            subLabel: 'SUM',
          },
        },
        style: {
          treeRowsWidth: 280,
        },
      };
      // eslint-disable-next-line no-param-reassign
      containerDiv.innerHTML = '';
      const s2 = new PivotSheet(containerDiv, result, s2Options);

      const textTheme = {
        text: {
          fill: '#fff',
          opacity: 0.85,
        },
        bolderText: {
          fill: '#fff',
          opacity: 0.85,
        },
      };
      const headerCellTheme = {
        ...textTheme,
        cell: {
          padding: {},
          horizontalBorderWidth: 1,
          horizontalBorderColor: '#303030',
          verticalBorderWidth: 0,
          backgroundColor: '#1d1d1d',
          interactionState: {
            hover: {
              backgroundColor: '#383838',
            },
            selected: {
              backgroundColor: '#1765ad',
              borderWidth: 0,
              opacity: 0,
            },
          },
        },
      };
      const customTheme = {
        background: {
          opacity: 0,
        },
        splitLine: {
          showShadow: false,
          horizontalBorderWidth: 1,
          horizontalBorderColor: '#303030',
          horizontalBorderColorOpacity: 1,
          verticalBorderWidth: 0,
        },
        colCell: headerCellTheme,
        rowCell: headerCellTheme,
        cornerCell: {
          ...textTheme,
          cell: {
            padding: {},
            horizontalBorderWidth: 0,
            verticalBorderWidth: 0,
            backgroundColor: '#1d1d1d',
          },
        },
        dataCell: {
          ...textTheme,
          cell: {
            padding: {},
            horizontalBorderWidth: 1,
            horizontalBorderColor: '#303030',
            verticalBorderWidth: 0,
            backgroundColor: '#141414',
            crossBackgroundColor: '#141414',
            interactionState: {
              hover: {
                backgroundColor: '#383838',
              },
              hoverFocus: {
                backgroundColor: '#1765ad',
                borderWidth: 0,
                opacity: 0,
              },
              selected: {
                backgroundColor: '#1765ad',
                borderWidth: 0,
                opacity: 0,
              },
            },
          },
        },
      };
      s2.setThemeCfg({ theme: customTheme });
      s2.render();
    }
  };

  let timer: NodeJS.Timeout | undefined;
  function check() {
    const containerDiv = document.getElementById('container');
    if (containerDiv !== null) {
      if (!timer) {
        clearTimeout(timer);
      }
      createPivotSheet(containerDiv);
    } else {
      timer = setTimeout(check, 500);
    }
  }
  check();
  useEffect(() => {
    getProject(projectid).then((result) => setProjectName(result.name + ' - '));
  }, [projectid]);
  return (
    <PageContainer
      header={{
        title: (
          <>
            {projectName}
            <FormattedMessage id="menu.assessment" defaultMessage="Assessment" />{' '}
            <Button
              shape="circle"
              size="small"
              icon={<BarChartOutlined />}
              href={`/project/assessment/chart1?projectid=${projectid}`}
            />{' '}
            <Button
              shape="circle"
              size="small"
              icon={<FileTextOutlined />}
              href={`/file/report_paper_clip.docx`}
            />
          </>
        ),
      }}
    >
      <div id="container" style={{ width: '100%', height: '100%', position: 'absolute' }} />
    </PageContainer>
  );
};
export default PivotSheetTable;
