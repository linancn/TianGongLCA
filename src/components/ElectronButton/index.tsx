import { Button } from 'antd';
import { CloseOutlined, LineOutlined, FullscreenOutlined } from '@ant-design/icons';
import React from 'react';
import isElectron from 'is-electron';

const ElectronButton: React.FC = () => {
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
          icon={<FullscreenOutlined />}
          onClick={() => {
            window.ipcRenderer.send('max');
          }}
        />
        {/* <Button type="link" id="electron_restore" icon={<ExpandAltOutlined />} /> */}
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
