import type { FC } from 'react';
import { useState } from 'react';
import { Button, Drawer, Space, Tooltip } from 'antd';
import { CloseOutlined, SettingOutlined } from '@ant-design/icons';
import styles from '@/style/custom.less';
import FlowCard from './flow';
import ParameterJsonCard from './parameter';

type Props = {
  projectId: number;
  processPkid: number;
  processId: string;
};
const ProcessFlowSetting: FC<Props> = ({ projectId, processPkid, processId }) => {
  const [setting, setSetting] = useState<JSX.Element>();
  const [drawerVisible, setDrawerVisible] = useState(false);

  const onSetting = () => {
    setDrawerVisible(true);
    setSetting(
      <>
        <ParameterJsonCard processPkid={processPkid} />
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
            onClick={() => setDrawerVisible(false)}
          />
        }
        maskClosable={false}
        visible={drawerVisible}
        onClose={() => setDrawerVisible(false)}
        footer={
          <Space size={'middle'} className={styles.footer_right}>
            <Button onClick={() => setDrawerVisible(false)} type="primary">
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
