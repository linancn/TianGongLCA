import type { FC } from 'react';
import { useState } from 'react';
import { Button, Descriptions, Drawer, Space, Spin, Tooltip } from 'antd';
import { CloseOutlined, ProfileOutlined } from '@ant-design/icons';
import moment from 'moment';
import { getFlowPropertyByPkid } from '@/services/flowproperty/api';
import type { ActionType } from '@ant-design/pro-table';
import FlowPropertyEdit from './edit';
import FlowPropertyDelete from './delete';
import styles from '@/style/custom.less';
import UnitGroupViewByParent from '../../unitgroup/components/viewbyparent';
import CategoryViewByParent from '../../category/components/viewbyparent';
import { FormattedMessage } from 'umi';

type Props = {
  pkid: number;
  actionRef: React.MutableRefObject<ActionType | undefined>;
};
const FlowPropertyView: FC<Props> = ({ pkid, actionRef }) => {
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
    getFlowPropertyByPkid(pkid).then(async (result) => {
      setViewDescriptions(
        <Descriptions column={1}>
          <Descriptions.Item
            label={<FormattedMessage id="flowproperty.dataName" defaultMessage="Data Name" />}
          >
            {result?.dataName}
          </Descriptions.Item>
          <Descriptions.Item
            label={<FormattedMessage id="flowproperty.version" defaultMessage="Version" />}
          >
            {result?.version}
          </Descriptions.Item>
          <Descriptions.Item
            label={<FormattedMessage id="flowproperty.description" defaultMessage="Description" />}
          >
            {result?.description}
          </Descriptions.Item>
          <Descriptions.Item
            label={<FormattedMessage id="flowproperty.lastChange" defaultMessage="Last Change" />}
          >
            {moment(result?.lastChange).format('YYYY-MM-DD HH:mm:ss')}
          </Descriptions.Item>
          <Descriptions.Item
            label={
              <FormattedMessage
                id="flowproperty.flowPropertyType"
                defaultMessage="Flow Property Type"
              />
            }
          >
            {result?.flowPropertyType}
          </Descriptions.Item>
          <Descriptions.Item
            label={<FormattedMessage id="flowproperty.unitGroupName" defaultMessage="Unit Group" />}
          >
            {result?.unitGroupName}
            <UnitGroupViewByParent
              projectId={result.projectId}
              id={result.unitGroupId}
              parentPkid={result.pkid}
              parentType={'flowproperty'}
              actionRef={actionRef}
            />
          </Descriptions.Item>
          <Descriptions.Item
            label={<FormattedMessage id="flowproperty.categoryName" defaultMessage="Category" />}
          >
            {result.categoryName}
            <CategoryViewByParent
              projectId={result.projectId}
              id={result.categoryId}
              parentType={'flowproperty'}
              parentPkid={pkid}
              actionRef={actionRef}
            />
          </Descriptions.Item>
          <Descriptions.Item
            label={<FormattedMessage id="flowproperty.release" defaultMessage="Release" />}
          >
            {result?.release}
          </Descriptions.Item>
        </Descriptions>,
      );
    });
    setFooterButtons(
      <>
        <FlowPropertyEdit
          pkid={pkid}
          buttonType={'text'}
          actionRef={actionRef}
          setViewDrawerVisible={setDrawerVisible}
        />
        <FlowPropertyDelete
          pkid={pkid}
          buttonType={'text'}
          actionRef={actionRef}
          setViewDrawerVisible={setDrawerVisible}
        />
      </>,
    );
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

export default FlowPropertyView;
