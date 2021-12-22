import { Button, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import type { FC } from 'react';
import { useState, useEffect } from 'react';
import isElectron from 'is-electron';

const ElectronUpgrade: FC = () => {
  const [updateButton, setUpdateButton] = useState(false);
  // equivalent to componentDidMount
  useEffect(() => {
    if (isElectron()) {
      window.ipcRenderer.on('software-update', () => {
        setUpdateButton(true);
      });
    }
  }, []);
  if (isElectron()) {
    if (updateButton) {
      return (
        <Button
          id="electron_upgrade"
          onClick={() => {
            Modal.confirm({
              title: 'Are you sure to upgrade?',
              icon: <ExclamationCircleOutlined />,
              content: '',
              onOk() {
                window.ipcRenderer.send('software-upgrade');
              },
              onCancel() {},
            });
          }}
        >
          Upgrade
        </Button>
      );
    }
  }
  return <></>;
};
export default ElectronUpgrade;
