import type { FC } from 'react';
import { useState } from 'react';
import { Button, Drawer, Space, Tooltip } from 'antd';
import { CloseOutlined, SettingOutlined } from '@ant-design/icons';
import styles from '@/style/custom.less';
import FlowCard from './flow';
import ParameterCard from './parameter';
import { FormattedMessage } from 'umi';

type Props = {
  projectId: number;
  processId: string;
};
const ProcessSetting: FC<Props> = ({ projectId, processId }) => {
  const [setting, setSetting] = useState<JSX.Element>();
  const [drawerVisible, setDrawerVisible] = useState(false);

  const onSetting = () => {
    setDrawerVisible(true);
    setSetting(
      <>
        <ParameterCard projectId={projectId} processId={processId} />
        <FlowCard projectId={projectId} processId={processId} input={true} />
        <FlowCard projectId={projectId} processId={processId} input={false} />
      </>,
    );
  };
  return (
    <>
      <Tooltip title={<FormattedMessage id="options.setting" defaultMessage="Setting" />}>
        <Button shape="circle" icon={<SettingOutlined />} size="small" onClick={onSetting} />
      </Tooltip>
      <Drawer
        title={<FormattedMessage id="options.setting" defaultMessage="Setting" />}
        width="100%"
        closable={false}
        extra={
          <Button
            icon={<CloseOutlined />}
            style={{ border: 0 }}
            onClick={() => setDrawerVisible(false)}
          />
        }
        maskClosable={false}
        visible={drawerVisible}
        onClose={() => setDrawerVisible(false)}
        footer={
          <Space size={'middle'} className={styles.footer_right}>
            <Button onClick={() => setDrawerVisible(false)} type="primary">
              <FormattedMessage id="options.finish" defaultMessage="Finish" />
            </Button>
          </Space>
        }
      >
        {setting}
      </Drawer>
    </>
  );
};

export default ProcessSetting;
