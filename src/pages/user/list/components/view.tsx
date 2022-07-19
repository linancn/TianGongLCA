import type { FC } from 'react';
import { useState } from 'react';
import { Button, Descriptions, Drawer, Space, Spin, Tooltip } from 'antd';
import { CloseOutlined, ProfileOutlined } from '@ant-design/icons';
import styles from '@/style/custom.less';
import type { ActionType } from '@ant-design/pro-table';
import { FormattedMessage } from 'umi';
import { getUserById } from '@/services/user/api';
import UserEdit from './edit';
import UserDelete from './delete';

type Props = {
  id: number;
  actionRef: React.MutableRefObject<ActionType | undefined>;
};
const UserView: FC<Props> = ({ id, actionRef }) => {
  const [viewDescriptions, setViewDescriptions] = useState<JSX.Element>();
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [footerButtons, setFooterButtons] = useState<JSX.Element>();

  const onView = () => {
    setDrawerVisible(true);
    setViewDescriptions(
      <div className={styles.loading_spin_div}>
        <Spin />
      </div>,
    );
    getUserById(id).then(async (result) => {
      setViewDescriptions(
        <Descriptions column={1}>
          <Descriptions.Item label="name">{result.name}</Descriptions.Item>
          <Descriptions.Item label="email">{result.email}</Descriptions.Item>
          <Descriptions.Item label="createTime">{result.createTime}</Descriptions.Item>
          <Descriptions.Item label="description">{result.description}</Descriptions.Item>
        </Descriptions>,
      );
      setFooterButtons(
        <>
          <UserEdit
            id={id}
            buttonType={'text'}
            actionRef={actionRef}
            setViewDrawerVisible={setDrawerVisible}
          />
          <UserDelete
            id={id}
            buttonType={'text'}
            actionRef={actionRef}
            setViewDrawerVisible={setDrawerVisible}
          />
        </>,
      );
    });
  };
  return (
    <>
      <Tooltip title={<FormattedMessage id="options.view" defaultMessage="View" />}>
        <Button shape="circle" icon={<ProfileOutlined />} size="small" onClick={onView} />
      </Tooltip>
      <Drawer
        title={<FormattedMessage id="options.view" defaultMessage="View" />}
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

export default UserView;
