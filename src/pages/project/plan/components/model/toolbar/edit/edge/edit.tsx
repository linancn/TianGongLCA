import { Button, Drawer, Input, Tooltip } from 'antd';
import type { Dispatch, FC } from 'react';
import { useEffect, useState, useCallback } from 'react';
import { CloseOutlined, FormOutlined } from '@ant-design/icons';
import ProCard from '@ant-design/pro-card';
import EditEdgeFlow from './flow';
import { getProcessById } from '@/services/process/api';

type Props = {
  projectId: number;
  modelId: string;
  edgeSourceId: string;
  edgeTargetId: string;
  planSourceId: string;
  planTargetId: string;
  processSourceId: string;
  processTargetId: string;
  drawerVisible: boolean;
  setDrawerVisible: Dispatch<React.SetStateAction<boolean>>;
  buttonVisible: boolean;
};

const EditEdgeProcess: FC<Props> = ({
  projectId,
  modelId,
  edgeSourceId,
  edgeTargetId,
  planSourceId,
  planTargetId,
  processSourceId,
  processTargetId,
  drawerVisible,
  setDrawerVisible,
  buttonVisible,
}) => {
  const [thisDrawerVisible, setThisDrawerVisible] = useState(false);
  const [sourceData, setSourceData] = useState<any>(undefined);
  const [targetData, setTargetData] = useState<any>(undefined);

  const callbackDrawerVisible = useCallback(
    (visible) => {
      setDrawerVisible(visible);
      setThisDrawerVisible(visible);
    },
    [setDrawerVisible],
  );

  useEffect(() => {
    getProcessById(projectId, processSourceId).then((result) => {
      setSourceData(result);
    });
    getProcessById(projectId, processTargetId).then((result) => {
      setTargetData(result);
    });
  }, [processSourceId, processTargetId, projectId]);

  return (
    <>
      {buttonVisible ? (
        <Tooltip title="Edit">
          <Button
            size={'middle'}
            type="text"
            icon={<FormOutlined />}
            onClick={() => {
              callbackDrawerVisible(true);
            }}
          />
        </Tooltip>
      ) : (
        <></>
      )}
      <Drawer
        visible={drawerVisible || thisDrawerVisible}
        maskClosable={false}
        title="Edit"
        width="100%"
        closable={false}
        extra={
          <Button
            icon={<CloseOutlined />}
            style={{ border: 0 }}
            onClick={() => callbackDrawerVisible(false)}
          />
        }
        onClose={() => callbackDrawerVisible(false)}
      >
        <ProCard ghost gutter={[0, 8]} aria-disabled={false}>
          <ProCard colSpan={12} title="Source Process" layout="center" bordered>
            <Input value={sourceData ? sourceData.dataName : ''} disabled={true} />
          </ProCard>
          <ProCard colSpan={12} title="Target Process" layout="center" bordered>
            <Input value={targetData ? targetData.dataName : ''} disabled={true} />
          </ProCard>
        </ProCard>
        <EditEdgeFlow
          projectId={projectId}
          modelId={modelId}
          edgeSourceId={edgeSourceId}
          edgeTargetId={edgeTargetId}
          planSourceId={planSourceId}
          planTargetId={planTargetId}
          processSourceId={processSourceId}
          processTargetId={processTargetId}
        />
      </Drawer>
    </>
  );
};
export default EditEdgeProcess;
