import type { FC } from 'react';
import { useState } from 'react';
import { Button, Descriptions, Divider, Drawer, Spin, Tooltip } from 'antd';
import { CloseOutlined, ProfileOutlined } from '@ant-design/icons';
import { getExchangeJson } from '@/services/process/api';
import { FormattedMessage } from 'umi';
import styles from '@/style/custom.less';

type Props = {
  projectId: number;
  processId: string;
  internalId: number;
  input: boolean;
};
const ProcessFlowView: FC<Props> = ({ projectId, processId, internalId, input }) => {
  const [viewDescriptions, setViewDescriptions] = useState<JSX.Element>();
  const [drawerVisible, setDrawerVisible] = useState(false);

  const onView = () => {
    setDrawerVisible(true);
    setViewDescriptions(
      <div className={styles.loading_spin_div}>
        <Spin />
      </div>,
    );
    getExchangeJson(projectId, processId, internalId, input).then(async (result) => {
      setViewDescriptions(
        <Descriptions column={1}>
          <Descriptions.Item
            label={<FormattedMessage id="process.amount" defaultMessage="Amount" />}
          >
            {result?.amount}
          </Descriptions.Item>
          <Descriptions.Item
            label={<FormattedMessage id="process.amountFormula" defaultMessage="Amount Formula" />}
          >
            {result?.amountFormula}
          </Descriptions.Item>
          <Descriptions.Item
            label={<FormattedMessage id="process.description" defaultMessage="Description" />}
          >
            {result.description}
          </Descriptions.Item>
          <Divider>
            <FormattedMessage id="flow.flowinfo" defaultMessage="Flow Info" />
          </Divider>
          <Descriptions.Item label={<FormattedMessage id="flow.dataName" defaultMessage="Name" />}>
            {result?.flowName}
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
        title={
          input ? (
            <FormattedMessage id="process.viewInputFlow" defaultMessage="View Input Flow" />
          ) : (
            <FormattedMessage id="process.viewOutputFlow" defaultMessage="View Output Flow" />
          )
        }
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
