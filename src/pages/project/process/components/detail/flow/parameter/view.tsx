import type { FC } from 'react';
import { useState } from 'react';
import { Button, Descriptions, Drawer, Tooltip } from 'antd';
import { CloseOutlined, ProfileOutlined } from '@ant-design/icons';
import { getParameterById } from '@/services/parameter/api';

type Props = {
  projectId: number;
  processId: string;
  id: string;
};
const ProcessFlowParameterView: FC<Props> = ({ projectId, processId, id }) => {
  const [viewDescriptions, setViewDescriptions] = useState<JSX.Element>();
  const [drawerVisible, handleDrawerVisible] = useState(false);

  const onView = () => {
    handleDrawerVisible(true);
    getParameterById(projectId, processId, id).then(async (result) => {
      setViewDescriptions(
        <Descriptions column={1}>
          <Descriptions.Item label="Name">{result?.name}</Descriptions.Item>
          <Descriptions.Item label="Formula">{result?.formula}</Descriptions.Item>
          <Descriptions.Item label="Value">{result?.value}</Descriptions.Item>
          <Descriptions.Item label="Min">{result?.min}</Descriptions.Item>
          <Descriptions.Item label="Max">{result?.max}</Descriptions.Item>
          <Descriptions.Item label="SD">{result?.sd}</Descriptions.Item>
        </Descriptions>,
      );
    });
  };
  return (
    <>
      <Tooltip title="View">
        <Button shape="circle" icon={<ProfileOutlined />} size="small" onClick={onView} />
      </Tooltip>
      <Drawer
        title="Parameter View"
        width="400px"
        closable={false}
        extra={
          <Button
            icon={<CloseOutlined />}
            style={{ border: 0 }}
            onClick={() => handleDrawerVisible(false)}
          />
        }
        maskClosable={true}
        visible={drawerVisible}
        onClose={() => handleDrawerVisible(false)}
      >
        {viewDescriptions}
      </Drawer>
    </>
  );
};

export default ProcessFlowParameterView;
