import type { FC } from 'react';
import { useState } from 'react';
import { Button, Descriptions, Divider, Drawer, Tooltip } from 'antd';
import { CloseOutlined, ProfileOutlined } from '@ant-design/icons';
import moment from 'moment';
import { getFlowPropertyJsonView } from '@/services/flow/api';
import { FormattedMessage } from 'umi';

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
          <Descriptions.Item
            label={
              <FormattedMessage
                id="flowproperty.conversionFactor"
                defaultMessage="Conversion Factor"
              />
            }
          >
            {result?.conversionFactor}
          </Descriptions.Item>
          <Descriptions.Item
            label={
              <FormattedMessage
                id="flowproperty.referenceFlowProperty"
                defaultMessage="Reference Flow Property"
              />
            }
          >
            {result?.referenceFlowProperty === true ? 'true' : 'false'}
          </Descriptions.Item>
          <Divider>
            <FormattedMessage id="flowproperty.baseinfo" defaultMessage="Flow Property Base Info" />
          </Divider>
          <Descriptions.Item
            label={<FormattedMessage id="flowproperty.dataName" defaultMessage="Data Name" />}
          >
            {result?.dataName}
          </Descriptions.Item>
          <Descriptions.Item
            label={<FormattedMessage id="flowproperty.lastChange" defaultMessage="Last Change" />}
          >
            {moment(result?.lastChange).format('YYYY-MM-DD HH:mm:ss')}
          </Descriptions.Item>
          <Descriptions.Item
            label={<FormattedMessage id="flowproperty.description" defaultMessage="Description" />}
          >
            {result?.description}
          </Descriptions.Item>
        </Descriptions>,
      );
    });
  };
  return (
    <>
      <Tooltip title={<FormattedMessage id="options.view" defaultMessage="View" />}>
        <Button shape="circle" icon={<ProfileOutlined />} size="small" onClick={onView} />
      </Tooltip>
      <Drawer
        title={<FormattedMessage id="options.view" defaultMessage="View" />}
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
