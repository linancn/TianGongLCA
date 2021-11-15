import { createProject } from '@/services/project/api';
// import { PlusOutlined } from '@ant-design/icons';
import { ModalForm, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType } from '@ant-design/pro-table';
import { Button, Input, message } from 'antd';
import type { ProjectListItem } from '@/services/project/data';
import type { FC } from 'react';
import { useRef, useState } from 'react';
import { history } from 'umi';

const handleCreate = async (fields: ProjectListItem) => {
  const hide = message.loading('loading');

  try {
    await createProject(fields);
    hide();
    message.success('success');
    return true;
  } catch (error) {
    hide();
    message.error('error');
    return false;
  }
};

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

let searchvalue = '';

const ListSearch: FC<ListSearchProps> = (props) => {
  const handleTabChange = (key: string) => {
    const { match } = props;
    const url = match.url === '/' ? '' : match.url;
    switch (key) {
      case 'card':
        history.push(`${url}/card?searchValue=${searchvalue}`);
        break;
      case 'table':
        history.push(`${url}/table?searchValue=${searchvalue}`);
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
    searchvalue = value;
    handleTabChange(getTabKey());
  };
  const actionRef = useRef<ActionType>();
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
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
            key="add"
            onClick={() => {
              handleModalVisible(true);
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
      <ModalForm
        title="Create Project"
        width="400px"
        visible={createModalVisible}
        onVisibleChange={handleModalVisible}
        onFinish={async (value) => {
          const success = await handleCreate(value as ProjectListItem);
          if (success) {
            handleModalVisible(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
      >
        Name:
        <ProFormText
          rules={[
            {
              required: true,
              message: '',
            },
          ]}
          width="md"
          name="name"
        />
        Comment:
        <ProFormTextArea width="md" name="comment" />
      </ModalForm>
      {props.children}
    </PageContainer>
  );
};

export default ListSearch;
