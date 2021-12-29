import { getPlanInfo } from '@/services/plan/api';
import { Button, Descriptions, Drawer } from 'antd';
import type { Dispatch, FC } from 'react';
import { useEffect } from 'react';
import { useState, useCallback } from 'react';
import moment from 'moment';
import { getProcessById } from '@/services/process/api';
import { CloseOutlined } from '@ant-design/icons';
import type { PlanModelState } from '@/services/plan/data';

type Props = {
  projectId: number;
  planModelState: PlanModelState;
  drawerVisible: boolean;
  setDrawerVisible: Dispatch<React.SetStateAction<boolean>>;
};

const ViewNode: FC<Props> = ({ projectId, planModelState, drawerVisible, setDrawerVisible }) => {
  const [viewDescriptions, setViewDescriptions] = useState<JSX.Element>();
  const callbackDrawerVisible = useCallback(() => {
    setDrawerVisible(false);
  }, [setDrawerVisible]);

  function getData() {
    if (planModelState.cellConfig.info.type === 'plan') {
      getPlanInfo(projectId, planModelState.cellId).then(async (result) => {
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
      getProcessById(projectId, planModelState.cellId).then(async (result) => {
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
  }
  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId, planModelState]);
  return (
    <Drawer
      visible={drawerVisible}
      mask={false}
      title={`View (${planModelState.cellConfig.attrs.label.text})`}
      width="400px"
      closable={false}
      extra={
        <Button icon={<CloseOutlined />} style={{ border: 0 }} onClick={callbackDrawerVisible} />
      }
      onClose={callbackDrawerVisible}
    >
      {viewDescriptions}
    </Drawer>
  );
};
export default ViewNode;
