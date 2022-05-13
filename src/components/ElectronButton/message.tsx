import { Modal, Space, Spin } from 'antd';
import type { FC } from 'react';
import { useState, useEffect } from 'react';
import isElectron from 'is-electron';

const ElectronMessage: FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState<JSX.Element>();
  let allMessage = <></>;
  useEffect(() => {
    if (isElectron()) {
      setIsVisible(true);
      window.ipcRenderer.on('data', (_e: any, msg: any) => {
        allMessage = (
          // eslint-disable-next-line react-hooks/exhaustive-deps
          <>
            {msg}
            <br />${allMessage}
          </>
        );
        setMessage(allMessage);
      });
      window.ipcRenderer.on('close', () => {
        setIsVisible(false);
      });
    }
  }, []);
  if (isElectron()) {
    return (
      <Modal
        title={
          <Space size={'middle'}>
            <Spin />
            Loading...
          </Space>
        }
        closable={false}
        footer={null}
        visible={isVisible}
        width={400}
      >
        <div style={{ height: '200px', width: '350px', overflowY: 'auto' }}>{message}</div>
      </Modal>
    );
  }
  return <></>;
};
export default ElectronMessage;
