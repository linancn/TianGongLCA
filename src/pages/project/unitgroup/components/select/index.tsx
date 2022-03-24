import type { FC } from 'react';
import { useState } from 'react';
import { Button, Drawer, Tooltip } from 'antd';
import { CloseOutlined, DatabaseOutlined } from '@ant-design/icons';
import PubDatabase from './pubdatabase';
import ProCard from '@ant-design/pro-card';
import type { ActionType } from '@ant-design/pro-table';

type Props = {
  projectId: number;
  parentActionRef: React.MutableRefObject<ActionType | undefined>;
};

const UnitGroupSelect: FC<Props> = ({ projectId, parentActionRef }) => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  // const formRefCreate = useRef<ProFormInstance>();

  return (
    <>
      <Tooltip title="Select From Database">
        <Button
          size={'middle'}
          type="text"
          icon={<DatabaseOutlined />}
          onClick={() => {
            setDrawerVisible(true);
          }}
        />
      </Tooltip>
      <Drawer
        title="Select From Database"
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
      >
        <ProCard
          tabs={{
            type: 'card',
          }}
        >
          <ProCard.TabPane key="thisProject" tab="This Project">
            内容一
          </ProCard.TabPane>
          <ProCard.TabPane key="otherProjects" tab="Other Projects">
            内容二
          </ProCard.TabPane>
          <ProCard.TabPane key="publicDatabase" tab="Public Database">
            <PubDatabase
              projectId={projectId}
              parentActionRef={parentActionRef}
              setDrawerVisible={setDrawerVisible}
            />
          </ProCard.TabPane>
        </ProCard>
      </Drawer>
    </>
  );
};

export default UnitGroupSelect;
