import type { FC } from 'react';
import { useState } from 'react';
import { Button, Descriptions, Drawer, Space, Tooltip } from 'antd';
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
    getFlowByPkid(pkid).then(async (result) => {
      setViewDescriptions(
        <Descriptions column={1}>
          <Descriptions.Item label="Data Name">{result.dataName}</Descriptions.Item>
          <Descriptions.Item label="Location Name">
            {result.locationName}
            <LocationViewByParent
              projectId={result.projectId}
              id={result.locationId}
              parentType={'flow'}
              parentPkid={pkid}
              actionRef={actionRef}
            />
          </Descriptions.Item>
          <Descriptions.Item label="Category Name">
            {result.categoryName}
            <CategoryViewByParent
              projectId={result.projectId}
              id={result.categoryId}
              parentType={'flow'}
              parentPkid={pkid}
              actionRef={actionRef}
            />
          </Descriptions.Item>
          <Descriptions.Item label="Measurement Count">
            {result.flowPropertyCount}
            <FlowPropertyJsonList
              projectId={result.projectId}
              flowPkid={pkid}
              parentActionRef={actionRef}
            />
          </Descriptions.Item>
          <Descriptions.Item label="Last Change">
            {moment(result.lastChange).format('YYYY-MM-DD HH:mm:ss')}
          </Descriptions.Item>
          <Descriptions.Item label="Description">{result.description}</Descriptions.Item>
          <Descriptions.Item label="Version">{result.version}</Descriptions.Item>
          <Descriptions.Item label="Synonyms">{result.synonyms}</Descriptions.Item>
          <Descriptions.Item label="Formula">{result.formula}</Descriptions.Item>
          <Descriptions.Item label="Flow Type">{result.flowType}</Descriptions.Item>
          <Descriptions.Item label="Cas">{result.cas}</Descriptions.Item>
          <Descriptions.Item label="Database">{result.database}</Descriptions.Item>
          <Descriptions.Item label="Release">{result.release}</Descriptions.Item>
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

export default FlowView;
