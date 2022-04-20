import { Button, Drawer, Input, Tooltip } from 'antd';
import type { FC } from 'react';
import { useState } from 'react';
import { CloseOutlined, FormOutlined } from '@ant-design/icons';
import ProCard from '@ant-design/pro-card';
import EditEdgeFlow from '../flow';

type Props = {
  projectId: number;
  modelId: string;
  edgeSourceId: string;
  edgeTargetId: string;
  planSourceId: string;
  planTargetId: string;
  processSourceId: string;
  processTargetId: string;
  processSourceName: string;
  processTargetName: string;
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
  processSourceName,
  processTargetName,
}) => {
  const [drawerVisible, setDrawerVisible] = useState(false);

  const onClose = () => {
    setDrawerVisible(false);
  };

  return (
    <>
      <Tooltip title="Edit">
        <Button
          size={'middle'}
          type="text"
          icon={<FormOutlined />}
          onClick={() => {
            setDrawerVisible(true);
          }}
        />
      </Tooltip>
      <Drawer
        visible={drawerVisible}
        maskClosable={false}
        title="Edit"
        width="100%"
        closable={false}
        extra={<Button icon={<CloseOutlined />} style={{ border: 0 }} onClick={onClose} />}
        onClose={onClose}
      >
        <ProCard ghost gutter={[0, 8]} aria-disabled={false}>
          <ProCard colSpan={12} title="Source Process" layout="center" bordered>
            <Input value={processSourceName} disabled={true} />
          </ProCard>
          <ProCard colSpan={12} title="Target Process" layout="center" bordered>
            <Input value={processTargetName} disabled={true} />
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
