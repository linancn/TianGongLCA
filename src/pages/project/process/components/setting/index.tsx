import type { FC } from 'react';
import { useState } from 'react';
import { Button, Drawer, Space, Tooltip } from 'antd';
import { CloseOutlined, SettingOutlined } from '@ant-design/icons';
import styles from '@/style/custom.less';
import ParameterCard from './parameter';
import FlowCard from './flow';

type Props = {
  projectId: number;
  processId: string;
};
const ProcessFlowSetting: FC<Props> = ({ projectId, processId }) => {
  const [setting, setSetting] = useState<JSX.Element>();
  const [drawerVisible, handleDrawerVisible] = useState(false);

  const onSetting = () => {
    handleDrawerVisible(true);
    setSetting(
      <>
        <ParameterCard projectId={projectId} processId={processId} />
        <FlowCard projectId={projectId} processId={processId} ioType="input" />
        <FlowCard projectId={projectId} processId={processId} ioType="output" />
      </>,
    );
  };
  return (
    <>
      <Tooltip title="Setting">
        <Button shape="circle" icon={<SettingOutlined />} size="small" onClick={onSetting} />
      </Tooltip>
      <Drawer
        title="Setting"
        width="100%"
        closable={false}
        extra={
          <Button
            icon={<CloseOutlined />}
            style={{ border: 0 }}
            onClick={() => handleDrawerVisible(false)}
          />
        }
        maskClosable={false}
        visible={drawerVisible}
        onClose={() => handleDrawerVisible(false)}
        footer={
          <Space size={'middle'} className={styles.footer_right}>
            <Button onClick={() => handleDrawerVisible(false)} type="primary">
              Finish
            </Button>
          </Space>
        }
      >
        {setting}
      </Drawer>
    </>
  );
};

export default ProcessFlowSetting;
