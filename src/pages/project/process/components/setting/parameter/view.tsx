import type { FC } from 'react';
import { useState } from 'react';
import { Button, Descriptions, Drawer, Spin, Tooltip } from 'antd';
import { CloseOutlined, ProfileOutlined } from '@ant-design/icons';
import { getParameterJson } from '@/services/process/api';
import styles from '@/style/custom.less';
import { FormattedMessage } from 'umi';

type Props = {
  projectId: number;
  processId: string;
  id: string;
};
const ParameterJsonView: FC<Props> = ({ projectId, processId, id }) => {
  const [viewDescriptions, setViewDescriptions] = useState<JSX.Element>();
  const [drawerVisible, setDrawerVisible] = useState(false);

  const onView = () => {
    setDrawerVisible(true);
    setViewDescriptions(
      <div className={styles.loading_spin_div}>
        <Spin />
      </div>,
    );
    getParameterJson(projectId, processId, id).then(async (result) => {
      setViewDescriptions(
        <Descriptions column={1}>
          <Descriptions.Item
            label={<FormattedMessage id="parameter.dataName" defaultMessage="Data Name" />}
          >
            {result.name}
          </Descriptions.Item>
          <Descriptions.Item
            label={<FormattedMessage id="parameter.formula" defaultMessage="Formula" />}
          >
            {result.formula}
          </Descriptions.Item>
          <Descriptions.Item
            label={<FormattedMessage id="parameter.value" defaultMessage="Value" />}
          >
            {result.value}
          </Descriptions.Item>
          <Descriptions.Item
            label={<FormattedMessage id="parameter.uncertaintyGeomSd" defaultMessage="SD" />}
          >
            {result.uncertaintyGeomSd}
          </Descriptions.Item>
          <Descriptions.Item
            label={<FormattedMessage id="parameter.uncertaintyGeomMean" defaultMessage="Mean" />}
          >
            {result.uncertaintyGeomMean}
          </Descriptions.Item>
          <Descriptions.Item
            label={<FormattedMessage id="parameter.version" defaultMessage="Version" />}
          >
            {result.version}
          </Descriptions.Item>
          <Descriptions.Item
            label={<FormattedMessage id="parameter.description" defaultMessage="Description" />}
          >
            {result.description}
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
