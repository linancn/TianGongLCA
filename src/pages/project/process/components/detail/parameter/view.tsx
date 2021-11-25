import type { FC } from 'react';
import { useState } from 'react';
import { Button, Descriptions, Drawer, Tooltip } from 'antd';
import { ProfileOutlined } from '@ant-design/icons';
import { getParameterByPkid } from '@/services/parameter/api';

type Props = {
  pkid: number;
};
const ProcessParameterView: FC<Props> = ({ pkid }) => {
  const [viewDescriptions, setViewDescriptions] = useState<JSX.Element>();
  const [drawerVisible, handleDrawerVisible] = useState(false);

  const onView = () => {
    handleDrawerVisible(true);
    getParameterByPkid(pkid).then(async (result) => {
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
        title="View"
        width="400px"
        maskClosable={true}
        visible={drawerVisible}
        onClose={() => handleDrawerVisible(false)}
      >
        {viewDescriptions}
      </Drawer>
    </>
  );
};

export default ProcessParameterView;
