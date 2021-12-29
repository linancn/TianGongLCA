import { getFlowProcessBaseById } from '@/services/flowprocessbase/api';
import { CloseOutlined, ProfileOutlined } from '@ant-design/icons';
import { Button, Descriptions, Divider, Drawer, Tooltip } from 'antd';
import moment from 'moment';
import type { FC } from 'react';
import { useState } from 'react';

type Props = {
  projectId: number;
  id: string;
};

const EdgeProcessView: FC<Props> = ({ projectId, id }) => {
  const [drawerVisible, handleDrawerVisible] = useState(false);
  const [viewDescriptions, setViewDescriptions] = useState<JSX.Element>();

  const onView = () => {
    handleDrawerVisible(true);
    getFlowProcessBaseById(projectId, id)
      .then(async (result) => {
        setViewDescriptions(
          <Descriptions column={1}>
            <Descriptions.Item label="Amount">{result?.amount}</Descriptions.Item>
            <Descriptions.Item label="SD">{result?.sd}</Descriptions.Item>
            <Descriptions.Item label="Factor">{result?.factor}</Descriptions.Item>
            <Divider>Flow Base Info</Divider>
            <Descriptions.Item label="Name">{result?.name}</Descriptions.Item>
            <Descriptions.Item label="Nation">{result?.nation}</Descriptions.Item>
            <Descriptions.Item label="Source">{result?.source}</Descriptions.Item>
            <Descriptions.Item label="Type">{result?.type}</Descriptions.Item>
            <Descriptions.Item label="Creator">{result?.creator}</Descriptions.Item>
            <Descriptions.Item label="Create Time">
              {moment(result?.createTime).format('YYYY-MM-DD HH:mm:ss')}
            </Descriptions.Item>
            <Descriptions.Item label="Last Update Time">
              {moment(result?.lastUpdateTime).format('YYYY-MM-DD HH:mm:ss')}
            </Descriptions.Item>
            <Descriptions.Item label="Comment">{result?.comment}</Descriptions.Item>
            <Descriptions.Item label="Version">{result?.version}</Descriptions.Item>
          </Descriptions>,
        );
      })
      .catch(() => {
        setViewDescriptions(<></>);
      });
  };
  return (
    <>
      <Tooltip title="View">
        <Button shape="circle" icon={<ProfileOutlined />} size="small" onClick={onView} />
      </Tooltip>
      <Drawer
        title="View Flow"
        width="400px"
        closable={false}
        extra={
          <Button
            icon={<CloseOutlined />}
            style={{ border: 0 }}
            onClick={() => handleDrawerVisible(false)}
          />
        }
        maskClosable={true}
        visible={drawerVisible}
        onClose={() => handleDrawerVisible(false)}
      >
        {viewDescriptions}
      </Drawer>
    </>
  );
};
export default EdgeProcessView;
