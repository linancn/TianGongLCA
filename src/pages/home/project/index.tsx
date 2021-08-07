import { PageContainer } from '@ant-design/pro-layout';
import { Input } from 'antd';
import type { FC } from 'react';
import { history } from 'umi';

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

  return (
    <PageContainer
      content={
        <div style={{ textAlign: 'center' }}>
          <Input.Search
            placeholder="请输入"
            enterButton="搜索"
            size="large"
            onSearch={handleFormSubmit}
            style={{ maxWidth: 522, width: '100%' }}
          />
        </div>
      }
      tabList={tabList}
      tabActiveKey={getTabKey()}
      onTabChange={handleTabChange}
    >
      {props.children}
    </PageContainer>
  );
};

export default ListSearch;
