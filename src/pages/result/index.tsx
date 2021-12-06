import type { S2Options } from '@antv/s2';
import { PivotSheet } from '@antv/s2';
import type { FC } from 'react';
import { getResultData } from '@/services/result/api';

const PivotSheetTable: FC = () => {
  const createPivotSheet = () => {
    getResultData().then(async (result) => {
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
        };
        const s2 = new PivotSheet(pivotsheet, result, s2Options);
        s2.render();
      }
    });
    // fetch(
    //   'https://gw.alipayobjects.com/os/bmw-prod/2a5dbbc8-d0a7-4d02-b7c9-34f6ca63cff6.json',
    // )
    //   .then((res) => res.json())
    //   .then((dataCfg) => {
    //     const pivotsheet = document.getElementById('pivotsheet');
    //     if (pivotsheet !== null) {
    //       const pivotsheetwidth = (pivotsheet.clientWidth || pivotsheet.offsetWidth || pivotsheet.scrollWidth);
    //       const pivotsheetheight = (pivotsheet.clientHeight || pivotsheet.offsetHeight || pivotsheet.scrollHeight);
    //       const s2Options: S2Options<Element> = {
    //         width: pivotsheetwidth,
    //         height: pivotsheetheight,
    //         hierarchyType: "tree",
    //       };
    //       const s2 = new PivotSheet(pivotsheet, dataCfg, s2Options);
    //       s2.render();
    //     }
    //   });
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

  return <div id="pivotsheet" style={{ height: '100%' }} />;
};
export default PivotSheetTable;
