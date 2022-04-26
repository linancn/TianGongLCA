import type { FC } from 'react';
import { useState } from 'react';
import { Button, Descriptions, Drawer, Spin, Tooltip } from 'antd';
import { CloseOutlined, ProfileOutlined } from '@ant-design/icons';
import { getUnitJson } from '@/services/unitgroup/api';
import { FormattedMessage } from 'umi';
import styles from '@/style/custom.less';

type Props = {
  unitGroupPkid: number;
  id: string;
};
const UnitJsonView: FC<Props> = ({ unitGroupPkid, id }) => {
  const [viewDescriptions, setViewDescriptions] = useState<JSX.Element>();
  const [drawerVisible, setDrawerVisible] = useState(false);

  const onView = () => {
    setDrawerVisible(true);
    setViewDescriptions(
      <div className={styles.loading_spin_div}>
        <Spin />
      </div>,
    );
    getUnitJson(unitGroupPkid, id).then(async (result) => {
      setViewDescriptions(
        <Descriptions column={1}>
          <Descriptions.Item
            label={<FormattedMessage id="unitgroup.dataName" defaultMessage="Data Name" />}
          >
            {result.name}
          </Descriptions.Item>
          <Descriptions.Item
            label={
              <FormattedMessage
                id="unitgroup.conversionFactor"
                defaultMessage="Conversion Factor"
              />
            }
          >
            {result.conversionFactor}
          </Descriptions.Item>
          <Descriptions.Item label="Reference Unit">
            {result.referenceUnit === true ? 'true' : 'false'}
          </Descriptions.Item>
          <Descriptions.Item
            label={<FormattedMessage id="unitgroup.description" defaultMessage="Description" />}
          >
            {result.description}
          </Descriptions.Item>
          <Descriptions.Item
            label={<FormattedMessage id="unitgroup.version" defaultMessage="Version" />}
          >
            {result.version}
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

export default UnitJsonView;
