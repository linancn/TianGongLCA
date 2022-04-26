import type { FC } from 'react';
import { useState } from 'react';
import { Button, Descriptions, Drawer, Space, Spin, Tooltip } from 'antd';
import { CloseOutlined, ProfileOutlined } from '@ant-design/icons';
import moment from 'moment';
import styles from '@/style/custom.less';
import { getUnitGroupById } from '@/services/unitgroup/api';
import type { ActionType } from '@ant-design/pro-table';
import UnitGroupSelectByParent from './selectbyparent';
import UnitGroupEditByParent from './editbyparent';
import UnitGroupDeleteByParent from './deletebyparent';

type Props = {
  projectId: number;
  id: string;
  parentPkid: number;
  parentType: string;
  actionRef: React.MutableRefObject<ActionType | undefined>;
};
const UnitGroupViewByParent: FC<Props> = ({ projectId, id, parentPkid, parentType, actionRef }) => {
  const [viewDescriptions, setViewDescriptions] = useState<JSX.Element>();
  const [footerButtons, setFooterButtons] = useState<JSX.Element>();
  const [drawerVisible, setDrawerVisible] = useState(false);

  const onView = () => {
    setDrawerVisible(true);
    setViewDescriptions(
      <div className={styles.loading_spin_div}>
        <Spin />
      </div>,
    );
    if (id === null) {
      setViewDescriptions(
        <Descriptions column={1}>
          <Descriptions.Item label="Data Name" children />
          <Descriptions.Item label="Last Change" children />
          <Descriptions.Item label="Description" children />
          <Descriptions.Item label="Version" children />
        </Descriptions>,
      );
      setFooterButtons(
        <UnitGroupSelectByParent
          projectId={projectId}
          parentPkid={parentPkid}
          parentType={parentType}
          parentActionRef={actionRef}
          setViewDrawerVisible={setDrawerVisible}
        />,
      );
    } else {
      getUnitGroupById(projectId, id).then(async (result) => {
        setViewDescriptions(
          <Descriptions column={1}>
            <Descriptions.Item label="Data Name">{result?.dataName}</Descriptions.Item>
            <Descriptions.Item label="Last Change">
              {moment(result?.lastChange).format('YYYY-MM-DD HH:mm:ss')}
            </Descriptions.Item>
            <Descriptions.Item label="Description">{result?.description}</Descriptions.Item>
            <Descriptions.Item label="Version">{result?.version}</Descriptions.Item>
          </Descriptions>,
        );
        setFooterButtons(
          <>
            <UnitGroupDeleteByParent
              projectId={projectId}
              parentPkid={parentPkid}
              parentType={parentType}
              parentActionRef={actionRef}
              setViewDrawerVisible={setDrawerVisible}
            />
            <UnitGroupEditByParent
              pkid={result.pkid}
              parentActionRef={actionRef}
              setViewDrawerVisible={setDrawerVisible}
            />
            <UnitGroupSelectByParent
              projectId={projectId}
              parentPkid={parentPkid}
              parentType={parentType}
              parentActionRef={actionRef}
              setViewDrawerVisible={setDrawerVisible}
            />
          </>,
        );
      });
    }
  };

  return (
    <>
      <Tooltip title="View">
        <Button shape="circle" icon={<ProfileOutlined />} size="small" onClick={onView} />
      </Tooltip>
      <Drawer
        title="View"
        width="400px"
        closable={false}
        extra={
          <Button
            icon={<CloseOutlined />}
            style={{ border: 0 }}
            onClick={() => setDrawerVisible(false)}
          />
        }
        footer={
          <Space size={'middle'} className={styles.footer_right}>
            {footerButtons}
          </Space>
        }
        maskClosable={true}
        visible={drawerVisible}
        onClose={() => setDrawerVisible(false)}
      >
        {viewDescriptions}
      </Drawer>
    </>
  );
};

export default UnitGroupViewByParent;
