import type { Dispatch, FC } from 'react';
import { useCallback } from 'react';
import { Button, Drawer } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import ProCard from '@ant-design/pro-card';
import type { IApplication } from '@antv/xflow';
import AddPlan from './plan';
import AddProcess from './process';

type Props = {
  projectId: number;
  xflowApp: IApplication | undefined;
  drawerVisible: boolean;
  setDrawerVisible: Dispatch<React.SetStateAction<boolean>>;
};

const Add: FC<Props> = ({ xflowApp, projectId, drawerVisible, setDrawerVisible }) => {
  const callbackDrawerVisible = useCallback(() => {
    setDrawerVisible(false);
  }, [setDrawerVisible]);

  return (
    <>
      <Drawer
        closable={false}
        width="100%"
        extra={
          <Button icon={<CloseOutlined />} style={{ border: 0 }} onClick={callbackDrawerVisible} />
        }
        visible={drawerVisible}
        title="Add"
        onClose={callbackDrawerVisible}
      >
        <ProCard
          tabs={{
            type: 'card',
          }}
        >
          <ProCard.TabPane key="processes" tab="Processes">
            <AddProcess
              projectId={projectId}
              xflowApp={xflowApp}
              drawerVisible={drawerVisible}
              setDrawerVisible={setDrawerVisible}
            />
          </ProCard.TabPane>
          <ProCard.TabPane key="plans" tab="Plans">
            <AddPlan
              projectId={projectId}
              xflowApp={xflowApp}
              drawerVisible={drawerVisible}
              setDrawerVisible={setDrawerVisible}
            />
          </ProCard.TabPane>
        </ProCard>
      </Drawer>
    </>
  );
};

export default Add;
