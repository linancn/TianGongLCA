import { Button, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import type { FC } from 'react';
import { useEffect } from 'react';
import isElectron from 'is-electron';

const ElectronUpgrade: FC = () => {
  // equivalent to componentDidMount
  useEffect(() => {
    if (isElectron()) {
    }
  }, []);
  if (isElectron()) {
    return (
      <Button
        id="electron_upgrade"
        onClick={() => {
          Modal.confirm({
            title: 'Are you sure to upgrade?',
            icon: <ExclamationCircleOutlined />,
            content: '',
            onOk() {},
            onCancel() {},
          });
        }}
      >
        Upgrade
      </Button>
    );
  }
  return <></>;
};
export default ElectronUpgrade;
