import type { FC } from 'react';
import { useState } from 'react';
import { Button, Descriptions, Drawer, Space, Tooltip } from 'antd';
import { CloseOutlined, ProfileOutlined } from '@ant-design/icons';
import moment from 'moment';
import { getLocationById } from '@/services/location/api';
import styles from '@/style/custom.less';
import LocationSelect from './select';
import type { ActionType } from '@ant-design/pro-table';
import LocationRemove from './remove';
import LocationEditByParent from './editbyparent';

type Props = {
  projectId: number;
  id: string;
  parentPkid: number;
  parentType: string;
  actionRef: React.MutableRefObject<ActionType | undefined>;
};
const LocationViewByParent: FC<Props> = ({ projectId, id, parentPkid, parentType, actionRef }) => {
  const [viewDescriptions, setViewDescriptions] = useState<JSX.Element>();
  const [footerButtons, setFooterButtons] = useState<JSX.Element>();
  const [drawerVisible, setDrawerVisible] = useState(false);

  const onView = () => {
    setDrawerVisible(true);
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
        <LocationSelect
          projectId={projectId}
          parentPkid={parentPkid}
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
            <LocationRemove
              projectId={projectId}
              parentPkid={parentPkid}
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

export default LocationViewByParent;
