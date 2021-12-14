import { getPlanInfo } from '@/services/plan/api';
import { Descriptions, Drawer } from 'antd';
import type { Dispatch, FC } from 'react';
import { useState, useCallback } from 'react';
import moment from 'moment';
import { getProcessById } from '@/services/process/api';
import type { PlanModelState } from '@/services/plan/data';

type Props = {
  projectId: number;
  drawerVisible: boolean;
  setDrawerVisible: Dispatch<React.SetStateAction<boolean>>;
  planModelState: PlanModelState;
};

let preid = '';

const View: FC<Props> = ({ projectId, drawerVisible, setDrawerVisible, planModelState }) => {
  const [viewDescriptions, setViewDescriptions] = useState<JSX.Element>();
  const callbackDrawerVisible = useCallback(() => {
    setDrawerVisible(false);
  }, [setDrawerVisible]);

  if (!planModelState.isSelected) {
    return <></>;
  }
  if (drawerVisible) {
    if (preid !== planModelState.cellID) {
      preid = planModelState.cellID;
      if (planModelState.cellType === 'node') {
        if (planModelState.cellConfig.info.type === 'plan') {
          getPlanInfo(projectId, preid).then(async (result) => {
            setViewDescriptions(
              <Descriptions column={1}>
                <Descriptions.Item label="Name">{result?.name}</Descriptions.Item>
                <Descriptions.Item label="Nation">{result?.nation}</Descriptions.Item>
                <Descriptions.Item label="Type">{result?.type}</Descriptions.Item>
                <Descriptions.Item label="Creator">{result?.creator}</Descriptions.Item>
                <Descriptions.Item label="Create Time">
                  {moment(result?.createTime).format('YYYY-MM-DD HH:mm:ss')}
                </Descriptions.Item>
                <Descriptions.Item label="Last Update Time">
                  {moment(result?.lastUpdateTime).format('YYYY-MM-DD HH:mm:ss')}
                </Descriptions.Item>
                <Descriptions.Item label="Comment">{result?.comment}</Descriptions.Item>
                <Descriptions.Item label="Version">{result?.version}</Descriptions.Item>
              </Descriptions>,
            );
          });
        } else if (planModelState.cellConfig.info.type === 'process') {
          getProcessById(projectId, preid).then(async (result) => {
            setViewDescriptions(
              <Descriptions column={1}>
                <Descriptions.Item label="Name">{result?.name}</Descriptions.Item>
                <Descriptions.Item label="Nation">{result?.nation}</Descriptions.Item>
                <Descriptions.Item label="Source">{result?.source}</Descriptions.Item>
                <Descriptions.Item label="Type">{result?.type}</Descriptions.Item>
                <Descriptions.Item label="Creator">{result?.creator}</Descriptions.Item>
                <Descriptions.Item label="Create Time">
                  {moment(result?.createTime).format('YYYY-MM-DD HH:mm:ss')}
                </Descriptions.Item>
                <Descriptions.Item label="Last Update Time">
                  {moment(result?.lastUpdateTime).format('YYYY-MM-DD HH:mm:ss')}
                </Descriptions.Item>
                <Descriptions.Item label="Comment">{result?.comment}</Descriptions.Item>
                <Descriptions.Item label="Version">{result?.version}</Descriptions.Item>
              </Descriptions>,
            );
          });
        }
      } else if (planModelState.cellType === 'edge') {
        // getPlanInfo(projectId, preid).then(async (result) => {
        //   setViewDescriptions(
        //     <Descriptions column={1}>
        //       <Descriptions.Item label="Name">{result?.name}</Descriptions.Item>
        //       <Descriptions.Item label="Nation">{result?.nation}</Descriptions.Item>
        //       <Descriptions.Item label="Type">{result?.type}</Descriptions.Item>
        //       <Descriptions.Item label="Creator">{result?.creator}</Descriptions.Item>
        //       <Descriptions.Item label="Create Time">
        //         {moment(result?.createTime).format('YYYY-MM-DD HH:mm:ss')}
        //       </Descriptions.Item>
        //       <Descriptions.Item label="Last Update Time">
        //         {moment(result?.lastUpdateTime).format('YYYY-MM-DD HH:mm:ss')}
        //       </Descriptions.Item>
        //       <Descriptions.Item label="Comment">{result?.comment}</Descriptions.Item>
        //       <Descriptions.Item label="Version">{result?.version}</Descriptions.Item>
        //     </Descriptions>,
        //   );
        // });
      }
    }
  } else {
    preid = '';
  }

  return (
    <Drawer
      visible={drawerVisible}
      mask={false}
      title="View"
      width="400px"
      onClose={callbackDrawerVisible}
    >
      {viewDescriptions}
    </Drawer>
  );
};
export default View;
