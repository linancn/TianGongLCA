import type { FC } from 'react';
import { useState } from 'react';
import { getMeasurementBaseByPkid } from '@/services/measurementbase/api';
import { Button, Descriptions, Drawer, Tooltip } from 'antd';
import { CloseOutlined, ProfileOutlined } from '@ant-design/icons';
import moment from 'moment';

type Props = {
  pkid: number;
};
const MeasurementView: FC<Props> = ({ pkid }) => {
  const [viewDescriptions, setViewDescriptions] = useState<JSX.Element>();
  const [drawerVisible, handleDrawerVisible] = useState(false);

  const onView = () => {
    handleDrawerVisible(true);
    getMeasurementBaseByPkid(pkid).then(async (result) => {
      setViewDescriptions(
        <Descriptions column={1}>
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

export default MeasurementView;
