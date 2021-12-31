import { createProject } from '@/services/project/api';
import type { ProFormInstance } from '@ant-design/pro-form';
import ProForm, { ProFormSelect, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Drawer, Input, message, Space } from 'antd';
import type { FC } from 'react';
import { useRef, useState } from 'react';
import { FormattedMessage, history } from 'umi';
import styles from '@/style/custom.less';
import { CloseOutlined } from '@ant-design/icons';

type ListSearchProps = {
  match: {
    url: string;
    path: string;
  };
  location: {
    pathname: string;
  };
};

const tabList = [
  {
    key: 'card',
    tab: <FormattedMessage id="homepage.card" />,
  },
  {
    key: 'table',
    tab: <FormattedMessage id="homepage.table" />,
  },
];
let nameLike = '';
let reload = 0;
const ListSearch: FC<ListSearchProps> = (props) => {
  const [drawerCreateVisible, handleDrawerCreateVisible] = useState(false);
  const formRefCreate = useRef<ProFormInstance>();
  const handleTabChange = (key: string) => {
    const { match } = props;
    const url = match.url === '/' ? '' : match.url;
    switch (key) {
      case 'card':
        history.push(`${url}/card?nl=${nameLike}&r=${reload}`);
        break;
      case 'table':
        history.push(`${url}/table?nl=${nameLike}&r=${reload}`);
        break;
      default:
        break;
    }
  };
  const getTabKey = () => {
    const { match, location } = props;
    const url = match.path === '/' ? '' : match.path;
    const tabKey = location.pathname.replace(`${url}/`, '');
    if (tabKey && tabKey !== '/') {
      return tabKey;
    }
    return 'card';
  };
  const handleFormSubmit = (value: string) => {
    nameLike = value;
    handleTabChange(getTabKey());
  };
  return (
    <PageContainer
      content={
        <div style={{ textAlign: 'center' }}>
          <Space>
            <FormattedMessage id="homepage.projectsearch" />
            <Input.Search
              placeholder=""
              enterButton={<FormattedMessage id="homepage.projectsearchbutton" />}
              onSearch={handleFormSubmit}
              style={{ maxWidth: 500, minWidth: 300 }}
            />
            <Button
              onClick={() => {
                handleDrawerCreateVisible(true);
              }}
            >
              <FormattedMessage id="homepage.projectcreate" />
            </Button>
          </Space>
        </div>
      }
      tabList={tabList}
      tabActiveKey={getTabKey()}
      onTabChange={handleTabChange}
    >
      <Drawer
        title={<FormattedMessage id="homepage.projectcreate" />}
        width="400px"
        closable={false}
        extra={
          <Button
            icon={<CloseOutlined />}
            style={{ border: 0 }}
            onClick={() => handleDrawerCreateVisible(false)}
          />
        }
        maskClosable={false}
        visible={drawerCreateVisible}
        onClose={() => handleDrawerCreateVisible(false)}
        footer={
          <Space size={'middle'} className={styles.footer_right}>
            <Button onClick={() => handleDrawerCreateVisible(false)}>
              <FormattedMessage id="pages.cancel" />
            </Button>
            <Button onClick={() => formRefCreate.current?.submit()} type="primary">
              <FormattedMessage id="pages.submit" />
            </Button>
          </Space>
        }
      >
        <ProForm
          formRef={formRefCreate}
          submitter={{
            render: () => {
              return [];
            },
          }}
          onFinish={async (values) => {
            createProject({ ...values }).then(async (result) => {
              if (result === 'ok') {
                message.success('Create successfully!');
                handleDrawerCreateVisible(false);
                reload += 1;
                handleTabChange(getTabKey());
              } else {
                message.error(result);
              }
            });
            return true;
          }}
        >
          <ProFormText width="md" name="name" label={<FormattedMessage id="project.name" />} />
          <ProFormText width="md" name="nation" label={<FormattedMessage id="project.nation" />} />
          <ProFormText width="md" name="type" label={<FormattedMessage id="project.type" />} />
          <ProFormSelect
            options={[
              {
                value: 'true',
                label: <FormattedMessage id="pages.true" />,
              },
              {
                value: 'false',
                label: <FormattedMessage id="pages.false" />,
              },
            ]}
            width="md"
            name="star"
            label={<FormattedMessage id="project.star" />}
          />
          <ProFormTextArea
            width="md"
            name="comment"
            label={<FormattedMessage id="project.comment" />}
          />
        </ProForm>
      </Drawer>
      {props.children}
    </PageContainer>
  );
};

export default ListSearch;
