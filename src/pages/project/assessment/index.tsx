import type { S2Options } from '@antv/s2';
import { PivotSheet } from '@antv/s2';
import type { FC } from 'react';
import { getResultData2 } from '@/services/result/api';
import { PageContainer } from '@ant-design/pro-layout';
import { FormattedMessage } from 'umi';

const PivotSheetTable: FC = () => {
  const createPivotSheet = () => {
    // getResultData().then(async (result: S2DataConfig) => {
    const result = getResultData2();
    const pivotSheet = document.getElementById('pivotsheet');
    if (pivotSheet !== null) {
      const pivotSheetWidth =
        pivotSheet.clientWidth || pivotSheet.offsetWidth || pivotSheet.scrollWidth;
      const pivotSheetHeight =
        pivotSheet.clientHeight || pivotSheet.offsetHeight || pivotSheet.scrollHeight;
      const s2Options: S2Options<Element> = {
        width: pivotSheetWidth,
        height: pivotSheetHeight,
        // hierarchyType: 'tree',
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
      pivotSheet.innerHTML = '';
      const s2 = new PivotSheet(pivotSheet, result, s2Options);

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
    const pivotsheetdiv = document.getElementById('pivotsheet');
    if (pivotsheetdiv) {
      if (!timer) {
        clearTimeout(timer);
      }
      createPivotSheet();
    } else {
      timer = setTimeout(check, 500);
    }
  }
  check();

  return (
    <PageContainer
      header={{
        title: (
          <>
            <FormattedMessage id="pages.plan" defaultMessage="Plan: " />
            test
          </>
        ),
      }}
    >
      <div id="pivotsheet" style={{ width: '100%', height: '100%', position: 'absolute' }} />
    </PageContainer>
  );
};
export default PivotSheetTable;
