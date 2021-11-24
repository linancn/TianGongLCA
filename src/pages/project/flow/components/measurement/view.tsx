import type { FC } from 'react';
import { useState } from 'react';
import { Button, Descriptions, Divider, Drawer, Tooltip } from 'antd';
import { ProfileOutlined } from '@ant-design/icons';
import moment from 'moment';
import { getMeasurementFlowBaseByPkid } from '@/services/measurementflowbase/api';

type Props = {
  pkid: number;
};
const FlowMeasurementView: FC<Props> = ({ pkid }) => {
  const [viewDescriptions, setViewDescriptions] = useState<JSX.Element>();
  const [drawerVisible, handleDrawerVisible] = useState(false);

  const onView = () => {
    handleDrawerVisible(true);
    getMeasurementFlowBaseByPkid(pkid).then(async (result) => {
      setViewDescriptions(
        <Descriptions column={1}>
          <Descriptions.Item label="As Ref">
            {result?.asRef === true ? 'true' : 'false'}
          </Descriptions.Item>
          <Descriptions.Item label="Conversion Ref">{result?.conversionRef}</Descriptions.Item>
          <Divider>Measurement Base Info</Divider>
          <Descriptions.Item label="Name">{result?.name}</Descriptions.Item>
          <Descriptions.Item label="Unit">{result?.unit}</Descriptions.Item>
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

export default FlowMeasurementView;
