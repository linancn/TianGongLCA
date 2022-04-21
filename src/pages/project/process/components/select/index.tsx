import type { FC } from 'react';
import { useState } from 'react';
import { Button, Drawer, Tooltip } from 'antd';
import { CloseOutlined, DatabaseOutlined } from '@ant-design/icons';
import ProCard from '@ant-design/pro-card';
import type { ActionType } from '@ant-design/pro-table';
import { FormattedMessage } from 'umi';
import ProcessPubDatabase from './pubdatabase';
import ProcessOtherProject from './otherproject';

type Props = {
  projectId: number;
  parentActionRef: React.MutableRefObject<ActionType | undefined>;
};

const ProcessSelect: FC<Props> = ({ projectId, parentActionRef }) => {
  const [drawerVisible, setDrawerVisible] = useState(false);

  return (
    <>
      <Tooltip
        title={
          <FormattedMessage id="options.selectfromdatabase" defaultMessage="Select From Database" />
        }
      >
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
        title={
          <FormattedMessage id="options.selectfromdatabase" defaultMessage="Select From Database" />
        }
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
          <ProCard.TabPane key="otherProjects" tab="Other Projects">
            <ProcessOtherProject
              projectId={projectId}
              parentActionRef={parentActionRef}
              drawerVisible={drawerVisible}
              setDrawerVisible={setDrawerVisible}
            />
          </ProCard.TabPane>
          <ProCard.TabPane key="publicDatabase" tab="Public Database">
            <ProcessPubDatabase
              projectId={projectId}
              parentActionRef={parentActionRef}
              drawerVisible={drawerVisible}
              setDrawerVisible={setDrawerVisible}
            />
          </ProCard.TabPane>
        </ProCard>
      </Drawer>
    </>
  );
};

export default ProcessSelect;
