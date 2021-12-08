import { Button } from 'antd';
import { CloseOutlined, LineOutlined, BorderOutlined, SwitcherOutlined } from '@ant-design/icons';
import type { FC } from 'react';
import { useState, useEffect } from 'react';
import isElectron from 'is-electron';

const ElectronButton: FC = () => {
  const [maxIcon, setMaxIcon] = useState<JSX.Element>();
  // equivalent to componentDidMount
  useEffect(() => {
    if (isElectron()) {
      // remain buttons status
      window.ipcRenderer.send('status');
      // listener to buttons
      window.ipcRenderer.on('window-max', () => {
        setMaxIcon(<SwitcherOutlined />);
      });
      window.ipcRenderer.on('window-unmax', () => {
        setMaxIcon(<BorderOutlined />);
      });
    }
  }, []);
  if (isElectron()) {
    return (
      <>
        <Button
          type="link"
          id="electron_minimize"
          icon={<LineOutlined />}
          onClick={() => {
            window.ipcRenderer.send('min');
          }}
        />
        <Button
          type="link"
          id="electron_maximize"
          icon={maxIcon}
          onClick={() => {
            window.ipcRenderer.send('max');
          }}
        />
        <Button
          type="link"
          icon={<CloseOutlined />}
          onClick={() => {
            window.close();
          }}
        />
      </>
    );
  }
  return <></>;
};
export default ElectronButton;
