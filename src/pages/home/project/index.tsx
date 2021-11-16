import { createProject } from '@/services/project/api';
import type { ProFormInstance } from '@ant-design/pro-form';
import ProForm, { ProFormSelect, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Drawer, Input, message, Space } from 'antd';
import type { FC } from 'react';
import { useRef, useState } from 'react';
import { history } from 'umi';
import styles from './style.less';

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
    tab: 'Card',
  },
  {
    key: 'table',
    tab: 'Table',
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
          Name
          <Input.Search
            placeholder=""
            enterButton="Search"
            onSearch={handleFormSubmit}
            style={{ maxWidth: 522, width: '100%' }}
          />
          <Button
            onClick={() => {
              handleDrawerCreateVisible(true);
            }}
          >
            Create
          </Button>
        </div>
      }
      tabList={tabList}
      tabActiveKey={getTabKey()}
      onTabChange={handleTabChange}
    >
      <Drawer
        title="Create Plan"
        width="400px"
        maskClosable={false}
        visible={drawerCreateVisible}
        onClose={() => handleDrawerCreateVisible(false)}
        footer={
          <Space size={'middle'} className={styles.footer_right}>
            <Button onClick={() => handleDrawerCreateVisible(false)}>Cancel</Button>
            <Button onClick={() => formRefCreate.current?.submit()} type="primary">
              Submit
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
          <ProFormText width="md" name="name" label="Name" />
          <ProFormText width="md" name="nation" label="Nation" />
          <ProFormText width="md" name="type" label="Type" />
          <ProFormSelect
            options={[
              {
                value: 'true',
                label: 'true',
              },
              {
                value: 'false',
                label: 'false',
              },
            ]}
            width="md"
            name="star"
            label="Star"
          />
          <ProFormTextArea width="md" name="comment" label="Comment" />
        </ProForm>
      </Drawer>
      {props.children}
    </PageContainer>
  );
};

export default ListSearch;
