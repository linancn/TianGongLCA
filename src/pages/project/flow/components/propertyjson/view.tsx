import type { FC } from 'react';
import { useState } from 'react';
import { Button, Descriptions, Divider, Drawer, Tooltip } from 'antd';
import { CloseOutlined, ProfileOutlined } from '@ant-design/icons';
import moment from 'moment';
import { getFlowPropertyJsonView } from '@/services/flow/api';

type Props = {
  flowPkid: number;
  propertyId: string;
};
const FlowPropertyJsonView: FC<Props> = ({ flowPkid, propertyId }) => {
  const [viewDescriptions, setViewDescriptions] = useState<JSX.Element>();
  const [drawerVisible, handleDrawerVisible] = useState(false);

  const onView = () => {
    handleDrawerVisible(true);
    getFlowPropertyJsonView(flowPkid, propertyId).then(async (result) => {
      setViewDescriptions(
        <Descriptions column={1}>
          <Descriptions.Item label="Conversion Factor">
            {result?.conversionFactor}
          </Descriptions.Item>
          <Descriptions.Item label="Reference Flow Property">
            {result?.referenceFlowProperty === true ? 'true' : 'false'}
          </Descriptions.Item>
          <Divider>Measurement Base Info</Divider>
          <Descriptions.Item label="Data Name">{result?.dataName}</Descriptions.Item>
          <Descriptions.Item label="Last Change">
            {moment(result?.lastChange).format('YYYY-MM-DD HH:mm:ss')}
          </Descriptions.Item>
          <Descriptions.Item label="Description">{result?.description}</Descriptions.Item>
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

export default FlowPropertyJsonView;
