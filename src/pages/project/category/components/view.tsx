import type { FC } from 'react';
import { useState } from 'react';
import { Button, Descriptions, Drawer, Tooltip } from 'antd';
import { CloseOutlined, ProfileOutlined } from '@ant-design/icons';
import moment from 'moment';
import { getCategoryByPkid } from '@/services/category/api';

type Props = {
  pkid: number;
};
const CategoryView: FC<Props> = ({ pkid }) => {
  const [viewDescriptions, setViewDescriptions] = useState<JSX.Element>();
  const [drawerVisible, setDrawerVisible] = useState(false);

  const onView = () => {
    setDrawerVisible(true);
    getCategoryByPkid(pkid).then(async (result) => {
      setViewDescriptions(
        <Descriptions column={1}>
          <Descriptions.Item label="Data Name">{result?.dataName}</Descriptions.Item>
          <Descriptions.Item label="Last Change">
            {moment(result?.lastChange).format('YYYY-MM-DD HH:mm:ss')}
          </Descriptions.Item>
          {/* <Descriptions.Item label="Description">{result?.description}</Descriptions.Item> */}
          <Descriptions.Item label="Version">{result?.version}</Descriptions.Item>
        </Descriptions>,
      );
    });
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
        maskClosable={true}
        visible={drawerVisible}
        onClose={() => setDrawerVisible(false)}
      >
        {viewDescriptions}
      </Drawer>
    </>
  );
};

export default CategoryView;
