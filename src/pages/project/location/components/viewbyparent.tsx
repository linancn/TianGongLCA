import type { FC } from 'react';
import { useState } from 'react';
import { Button, Descriptions, Drawer, Space, Spin, Tooltip } from 'antd';
import { CloseOutlined, ProfileOutlined } from '@ant-design/icons';
import moment from 'moment';
import { getLocationById } from '@/services/location/api';
import styles from '@/style/custom.less';
import LocationSelect from './select';
import type { ActionType } from '@ant-design/pro-table';
import LocationEditByParent from './editbyparent';
import LocationDeleteByParent from './deletebyparent';

type Props = {
  projectId: number;
  id: string;
  parentId: string;
  parentType: string;
  actionRef: React.MutableRefObject<ActionType | undefined>;
};
const LocationViewByParent: FC<Props> = ({ projectId, id, parentId, parentType, actionRef }) => {
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
          <Descriptions.Item label="Data Name"> </Descriptions.Item>
          <Descriptions.Item label="Last Change"> </Descriptions.Item>
          <Descriptions.Item label="Description"> </Descriptions.Item>
          <Descriptions.Item label="Version"> </Descriptions.Item>
        </Descriptions>,
      );
      setFooterButtons(
        <LocationSelect
          projectId={projectId}
          parentId={parentId}
          parentType={parentType}
          parentActionRef={actionRef}
          setViewDrawerVisible={setDrawerVisible}
        />,
      );
    } else {
      getLocationById(projectId, id).then(async (result) => {
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
            <LocationDeleteByParent
              projectId={projectId}
              parentId={parentId}
              parentType={parentType}
              parentActionRef={actionRef}
              setViewDrawerVisible={setDrawerVisible}
            />
            <LocationEditByParent
              pkid={result.pkid}
              parentActionRef={actionRef}
              setViewDrawerVisible={setDrawerVisible}
            />
            <LocationSelect
              projectId={projectId}
              parentId={parentId}
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

export default LocationViewByParent;
