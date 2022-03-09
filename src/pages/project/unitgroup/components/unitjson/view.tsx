import type { FC } from 'react';
import { useState } from 'react';
import { Button, Descriptions, Drawer, Tooltip } from 'antd';
import { CloseOutlined, ProfileOutlined } from '@ant-design/icons';
import { getUnitJson } from '@/services/unitgroup/api';

type Props = {
  unitGroupPkid: number;
  id: string;
};
const UnitJsonView: FC<Props> = ({ unitGroupPkid, id }) => {
  const [viewDescriptions, setViewDescriptions] = useState<JSX.Element>();
  const [drawerVisible, setDrawerVisible] = useState(false);

  const onView = () => {
    setDrawerVisible(true);
    getUnitJson(unitGroupPkid, id).then(async (result) => {
      setViewDescriptions(
        <Descriptions column={1}>
          <Descriptions.Item label="Name">{result.name}</Descriptions.Item>
          <Descriptions.Item label="Conversion Factor">{result.conversionFactor}</Descriptions.Item>
          <Descriptions.Item label="Reference Unit">
            {result.referenceUnit === true ? 'true' : 'false'}
          </Descriptions.Item>
          <Descriptions.Item label="Description">{result.description}</Descriptions.Item>
          <Descriptions.Item label="Version">{result.version}</Descriptions.Item>
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

export default UnitJsonView;
