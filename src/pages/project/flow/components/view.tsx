import type { FC } from 'react';
import { useState } from 'react';
import { Button, Descriptions, Drawer, Space, Spin, Tooltip } from 'antd';
import { CloseOutlined, ProfileOutlined } from '@ant-design/icons';
import moment from 'moment';
import { getFlowByPkid } from '@/services/flow/api';
import styles from '@/style/custom.less';
import FlowEdit from './edit';
import FlowDelete from './delete';
import type { ActionType } from '@ant-design/pro-table';
import LocationViewByParent from '../../location/components/viewbyparent';
import CategoryViewByParent from '../../category/components/viewbyparent';
import FlowPropertyJsonList from './propertyjson/list';
import { FormattedMessage } from 'umi';

type Props = {
  pkid: number;
  actionRef: React.MutableRefObject<ActionType | undefined>;
};
const FlowView: FC<Props> = ({ pkid, actionRef }) => {
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
    getFlowByPkid(pkid).then(async (result) => {
      setViewDescriptions(
        <Descriptions column={1}>
          <Descriptions.Item
            label={<FormattedMessage id="flow.dataName" defaultMessage="Data Name" />}
          >
            {result.dataName}
          </Descriptions.Item>
          <Descriptions.Item
            label={<FormattedMessage id="flow.flowType" defaultMessage="Flow Type" />}
          >
            {result.flowType}
          </Descriptions.Item>
          <Descriptions.Item
            label={<FormattedMessage id="flow.categoryName" defaultMessage="Category" />}
          >
            {result.categoryName}
            <CategoryViewByParent
              projectId={result.projectId}
              id={result.categoryId}
              parentType={'flow'}
              parentPkid={pkid}
              actionRef={actionRef}
            />
          </Descriptions.Item>
          <Descriptions.Item
            label={<FormattedMessage id="flow.locationName" defaultMessage="Location Name" />}
          >
            {result.locationName}
            <LocationViewByParent
              projectId={result.projectId}
              id={result.locationId}
              parentType={'flow'}
              parentPkid={pkid}
              actionRef={actionRef}
            />
          </Descriptions.Item>

          <Descriptions.Item
            label={
              <FormattedMessage id="flow.flowPropertyCount" defaultMessage="Measurement Count" />
            }
          >
            {result.flowPropertyCount}
            <FlowPropertyJsonList
              projectId={result.projectId}
              flowId={result.id}
              parentActionRef={actionRef}
            />
          </Descriptions.Item>
          <Descriptions.Item
            label={<FormattedMessage id="flow.description" defaultMessage="Description" />}
          >
            {result.description}
          </Descriptions.Item>
          <Descriptions.Item
            label={<FormattedMessage id="flow.synonyms" defaultMessage="Synonyms" />}
          >
            {result.synonyms}
          </Descriptions.Item>
          <Descriptions.Item
            label={<FormattedMessage id="flow.formula" defaultMessage="Formula" />}
          >
            {result.formula}
          </Descriptions.Item>
          <Descriptions.Item label={<FormattedMessage id="flow.cas" defaultMessage="Cas" />}>
            {result.cas}
          </Descriptions.Item>
          <Descriptions.Item
            label={<FormattedMessage id="flow.database" defaultMessage="Database" />}
          >
            {result.database}
          </Descriptions.Item>
          <Descriptions.Item
            label={<FormattedMessage id="flow.release" defaultMessage="Release" />}
          >
            {result.release}
          </Descriptions.Item>
          <Descriptions.Item
            label={<FormattedMessage id="flow.lastChange" defaultMessage="Last Change" />}
          >
            {moment(result.lastChange).format('YYYY-MM-DD HH:mm:ss')}
          </Descriptions.Item>
          <Descriptions.Item
            label={<FormattedMessage id="flow.version" defaultMessage="Version" />}
          >
            {result.version}
          </Descriptions.Item>
        </Descriptions>,
      );
      setFooterButtons(
        <>
          <FlowEdit
            pkid={pkid}
            buttonType={'text'}
            actionRef={actionRef}
            setViewDrawerVisible={setDrawerVisible}
          />
          <FlowDelete
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

export default FlowView;
