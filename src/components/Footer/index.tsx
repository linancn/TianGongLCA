import { useIntl } from 'umi';
import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-layout';

export default () => {
  const intl = useIntl();
  const defaultMessage = intl.formatMessage({
    id: 'app.copyright.produced',
    defaultMessage: 'TianGongLCA R&D Team',
  });

  return (
    <DefaultFooter
      copyright={`2021-2022 ${defaultMessage}`}
      links={[
        {
          key: 'NGO',
          title: 'NGO',
          href: 'https://www.tiangong.earth/',
          blankTarget: true,
        },
        {
          key: 'TianGongLCA R&D Team',
          title: 'TianGongLCA R&D Team',
          href: 'https://www.tiangong.earth/team',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <GithubOutlined />,
          href: 'https://github.com/linancn/TianGongLCA',
          blankTarget: true,
        },
      ]}
    />
  );
};
