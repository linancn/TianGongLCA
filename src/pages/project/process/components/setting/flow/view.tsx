import type { FC } from 'react';
import { useState } from 'react';
import { Button, Descriptions, Divider, Drawer, Tooltip } from 'antd';
import { CloseOutlined, ProfileOutlined } from '@ant-design/icons';
import { getExchangeJson } from '@/services/process/api';

type Props = {
  processPkid: number;
  flowId: string;
  input: boolean;
};
const ProcessFlowView: FC<Props> = ({ processPkid, flowId, input }) => {
  const [viewDescriptions, setViewDescriptions] = useState<JSX.Element>();
  const [drawerVisible, setDrawerVisible] = useState(false);

  const onView = () => {
    setDrawerVisible(true);
    getExchangeJson(processPkid, flowId, input).then(async (result) => {
      setViewDescriptions(
        <Descriptions column={1}>
          <Descriptions.Item label="Amount">{result?.amount}</Descriptions.Item>
          <Descriptions.Item label="Amount Formula">{result?.amountFormula}</Descriptions.Item>
          <Descriptions.Item label="Description">{result.description}</Descriptions.Item>
          <Divider>Flow Info</Divider>
          <Descriptions.Item label="Name">{result?.flowName}</Descriptions.Item>
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
        title={input ? 'View Input Flow' : 'View Output Flow'}
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

export default ProcessFlowView;
