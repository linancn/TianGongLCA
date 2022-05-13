import { Modal, Space, Spin, message, Button } from 'antd';
import type { FC } from 'react';
import { useState, useEffect } from 'react';
import isElectron from 'is-electron';
import { CloseCircleOutlined } from '@ant-design/icons';

const ElectronMessage: FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [modelTitle, setModelTitle] = useState<JSX.Element>();
  const [modelMessage, setModelMessage] = useState<JSX.Element>();
  const [modelFooter, setModelFooter] = useState<JSX.Element | null>(null);
  let allMessage = <></>;
  let openModel = false;

  useEffect(() => {
    if (isElectron()) {
      window.ipcRenderer.send('code');
      window.ipcRenderer.on('data', (_e: any, msg: any) => {
        allMessage = (
          // eslint-disable-next-line react-hooks/exhaustive-deps
          <>
            {msg}
            <br />
            {allMessage}
          </>
        );
        setModelMessage(allMessage);
      });
      window.ipcRenderer.on('close', (_e: any, code: any) => {
        console.log(code);
        if (code == -1) {
          console.log(code);
          setModelTitle(
            <Space size={'middle'}>
              <Spin />
              Loading...
            </Space>,
          );
          setIsVisible(true);
          // eslint-disable-next-line react-hooks/exhaustive-deps
          openModel = true;
        } else if (code == 0) {
          setIsVisible(false);
          if (openModel) {
            message.success('Loaded Successfully!');
          }
          openModel = false;
        } else {
          if (!openModel) {
            setIsVisible(true);
            window.ipcRenderer.send('err');
          }
          setModelTitle(
            <Space size={'middle'}>
              <CloseCircleOutlined />
              Failed To Load!
            </Space>,
          );
          setModelFooter(
            <Button
              onClick={() => {
                window.close();
              }}
            >
              Exit
            </Button>,
          );
        }
      });
    }
  }, []);
  if (isElectron()) {
    return (
      <Modal
        title={modelTitle}
        closable={false}
        footer={modelFooter}
        visible={isVisible}
        width={400}
      >
        <div style={{ height: '200px', width: '350px', overflowY: 'auto' }}>{modelMessage}</div>
      </Modal>
    );
  }
  return <></>;
};
export default ElectronMessage;
