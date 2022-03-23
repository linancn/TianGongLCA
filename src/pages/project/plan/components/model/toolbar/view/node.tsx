import { getPlan } from '@/services/plan/api';
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
      getPlan(projectId, planModelState.cellId).then(async (result) => {
        setViewDescriptions(
          <Descriptions column={1}>
            <Descriptions.Item label="Data Name">{result?.dataName}</Descriptions.Item>
            <Descriptions.Item label="Plan Type">{result?.planType}</Descriptions.Item>
            <Descriptions.Item label="Last Change">
              {moment(result?.lastChange).format('YYYY-MM-DD HH:mm:ss')}
            </Descriptions.Item>
            <Descriptions.Item label="Description">{result?.description}</Descriptions.Item>
            <Descriptions.Item label="Version">{result?.version}</Descriptions.Item>
          </Descriptions>,
        );
      });
    } else if (planModelState.cellConfig.info.type === 'process') {
      getProcessById(projectId, planModelState.cellId).then(async (result) => {
        setViewDescriptions(
          <Descriptions column={1}>
            <Descriptions.Item label="Data Name">{result?.dataName}</Descriptions.Item>
            <Descriptions.Item label="Process Type">{result?.processType}</Descriptions.Item>
            <Descriptions.Item label="Last Change">
              {moment(result?.lastChange).format('YYYY-MM-DD HH:mm:ss')}
            </Descriptions.Item>
            <Descriptions.Item label="Description">{result?.description}</Descriptions.Item>
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
