import type { S2Options } from '@antv/s2';
import { PivotSheet } from '@antv/s2';
import type { FC } from 'react';
import { getResultData } from '@/services/result/api';
import { PageContainer } from '@ant-design/pro-layout';
import { FormattedMessage } from 'umi';

const PivotSheetTable: FC = () => {
  const createPivotSheet = () => {
    // getResultData().then(async (result: S2DataConfig) => {
    const result = getResultData();
    const pivotsheet = document.getElementById('pivotsheet');
    if (pivotsheet !== null) {
      const pivotsheetwidth =
        pivotsheet.clientWidth || pivotsheet.offsetWidth || pivotsheet.scrollWidth;
      const pivotsheetheight =
        pivotsheet.clientHeight || pivotsheet.offsetHeight || pivotsheet.scrollHeight;
      const s2Options: S2Options<Element> = {
        width: pivotsheetwidth,
        height: pivotsheetheight,
        hierarchyType: 'tree',
        totals: {
          row: {
            showGrandTotals: true,
            showSubTotals: true,
            reverseLayout: true,
            reverseSubLayout: true,
            subTotalsDimensions: ['f1', 'f2', 'f3', 'f4', 'f5'],
          },
          col: {
            showGrandTotals: true,
            showSubTotals: true,
            reverseLayout: true,
            reverseSubLayout: true,
            subTotalsDimensions: ['p1', 'p2', 'p3'],
          },
        },
      };
      const s2 = new PivotSheet(pivotsheet, result, s2Options);
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
