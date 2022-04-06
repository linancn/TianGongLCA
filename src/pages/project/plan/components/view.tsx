import type { FC } from 'react';
import { useState } from 'react';
import { Button, Descriptions, Drawer, Spin, Tooltip } from 'antd';
import { CloseOutlined, ProfileOutlined } from '@ant-design/icons';
import moment from 'moment';
import { getPlanByPkid } from '@/services/plan/api';

import styles from '@/style/custom.less';

type Props = {
  pkid: number;
};
const PlanView: FC<Props> = ({ pkid }) => {
  const [viewDescriptions, setViewDescriptions] = useState<JSX.Element>();
  const [drawerVisible, setDrawerVisible] = useState(false);

  const onView = () => {
    setDrawerVisible(true);
    setViewDescriptions(
      <div className={styles.loading_spin_div}>
        <Spin />
      </div>,
    );
    getPlanByPkid(pkid).then(async (result) => {
      setViewDescriptions(
        <Descriptions column={1}>
          <Descriptions.Item label="Data Name">{result?.dataName}</Descriptions.Item>
          <Descriptions.Item label="Plan Type">{result?.planType}</Descriptions.Item>
          <Descriptions.Item label="Last Change">
            {moment(result?.lastChange).format('YYYY-MM-DD HH:mm:ss')}
          </Descriptions.Item>
          <Descriptions.Item label="Description">{result?.description}</Descriptions.Item>
          <Descriptions.Item label="Version">{result?.version}</Descriptions.Item>
        </Descriptions>,
      );
    });
  };
  return (
    <>
      <Tooltip title="View Info">
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

export default PlanView;
