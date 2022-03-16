import type { FC } from 'react';
import { useState } from 'react';
import { Button, Descriptions, Drawer, Tooltip } from 'antd';
import { CloseOutlined, ProfileOutlined } from '@ant-design/icons';
import { getParameterJson } from '@/services/process/api';

type Props = {
  processPkid: number;
  id: string;
};
const ParameterJsonView: FC<Props> = ({ processPkid, id }) => {
  const [viewDescriptions, setViewDescriptions] = useState<JSX.Element>();
  const [drawerVisible, setDrawerVisible] = useState(false);

  const onView = () => {
    setDrawerVisible(true);
    getParameterJson(processPkid, id).then(async (result) => {
      setViewDescriptions(
        <Descriptions column={1}>
          <Descriptions.Item label="Name">{result.name}</Descriptions.Item>
          <Descriptions.Item label="Formula">{result.formula}</Descriptions.Item>
          <Descriptions.Item label="Value">{result.value}</Descriptions.Item>
          <Descriptions.Item label="SD">{result.uncertaintyGeomSd}</Descriptions.Item>
          <Descriptions.Item label="Mean">{result.uncertaintyGeomMean}</Descriptions.Item>
          <Descriptions.Item label="Version">{result.version}</Descriptions.Item>
          <Descriptions.Item label="Description">{result.description}</Descriptions.Item>
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
        title="View"
        width="400px"
        closable={false}
        extra={
          <Button
            icon={<CloseOutlined />}
            style={{ border: 0 }}
            onClick={() => setDrawerVisible(false)}
          />
        }
        maskClosable={true}
        visible={drawerVisible}
        onClose={() => setDrawerVisible(false)}
      >
        {viewDescriptions}
      </Drawer>
    </>
  );
};

export default ParameterJsonView;
