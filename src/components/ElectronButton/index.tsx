import { Button } from 'antd';
import {
  CloseOutlined,
  LineOutlined,
  BorderOutlined,
  FullscreenExitOutlined,
} from '@ant-design/icons';
import type { FC } from 'react';
import { useState } from 'react';
import isElectron from 'is-electron';

const ElectronButton: FC = () => {
  const [maxIcon, setMaxIcon] = useState<JSX.Element>();

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
          icon={maxIcon || <BorderOutlined />}
          onClick={() => {
            window.ipcRenderer.send('max');
            window.ipcRenderer.on('window-max', () => {
              setMaxIcon(<FullscreenExitOutlined />);
            });
            window.ipcRenderer.on('window-unmax', () => {
              setMaxIcon(<BorderOutlined />);
            });
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
