import type { FC } from 'react';
import { useState } from 'react';
import { Button, Descriptions, Drawer, Space, Spin, Tooltip } from 'antd';
import { CloseOutlined, ProfileOutlined } from '@ant-design/icons';
import moment from 'moment';
import { getProcessByPkid } from '@/services/process/api';
import type { ActionType } from '@ant-design/pro-table';
import ProcessDelete from './delete';
import ProcessEdit from './edit';
import styles from '@/style/custom.less';
import { FormattedMessage } from 'umi';
import CategoryViewByParent from '../../category/components/viewbyparent';
import LocationViewByParent from '../../location/components/viewbyparent';

type Props = {
  pkid: number;
  actionRef: React.MutableRefObject<ActionType | undefined>;
};
const ProcessView: FC<Props> = ({ pkid, actionRef }) => {
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
    getProcessByPkid(pkid).then(async (result) => {
      setViewDescriptions(
        <Descriptions column={1}>
          <Descriptions.Item
            label={<FormattedMessage id="process.dataName" defaultMessage="Data Name" />}
          >
            {result?.dataName}
          </Descriptions.Item>
          <Descriptions.Item
            label={<FormattedMessage id="process.processType" defaultMessage="Process Type" />}
          >
            {result?.processType}
          </Descriptions.Item>
          <Descriptions.Item
            label={<FormattedMessage id="process.lastChange" defaultMessage="Last Change" />}
          >
            {moment(result?.lastChange).format('YYYY-MM-DD HH:mm:ss')}
          </Descriptions.Item>
          <Descriptions.Item
            label={<FormattedMessage id="process.description" defaultMessage="Description" />}
          >
            {result?.description}
          </Descriptions.Item>
          <Descriptions.Item
            label={<FormattedMessage id="process.version" defaultMessage="Version" />}
          >
            {result?.version}
          </Descriptions.Item>
          <Descriptions.Item
            label={<FormattedMessage id="process.database" defaultMessage="Database" />}
          >
            {result?.database}
          </Descriptions.Item>
          <Descriptions.Item
            label={<FormattedMessage id="process.release" defaultMessage="Release" />}
          >
            {result?.release}
          </Descriptions.Item>
          <Descriptions.Item
            label={<FormattedMessage id="process.categoryName" defaultMessage="Category" />}
          >
            {result?.categoryName}
            <CategoryViewByParent
              projectId={result.projectId}
              id={result.categoryId}
              parentType={'process'}
              parentId={result.id}
              actionRef={actionRef}
            />
          </Descriptions.Item>
          <Descriptions.Item
            label={<FormattedMessage id="process.locationName" defaultMessage="Location Name" />}
          >
            {result?.locationName}
            <LocationViewByParent
              projectId={result.projectId}
              id={result.locationId}
              parentType={'process'}
              parentId={result.id}
              actionRef={actionRef}
            />
          </Descriptions.Item>
        </Descriptions>,
      );
      setFooterButtons(
        <>
          <ProcessEdit
            pkid={pkid}
            buttonType={'text'}
            actionRef={actionRef}
            setViewDrawerVisible={setDrawerVisible}
          />
          <ProcessDelete
            pkid={pkid}
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

export default ProcessView;
