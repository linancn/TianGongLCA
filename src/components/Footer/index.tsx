import { useIntl } from 'umi';
import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-layout';

export default () => {
  const intl = useIntl();
  const defaultMessage = intl.formatMessage({
    id: 'app.copyright.produced',
    defaultMessage: 'CrystaLCA R&D Team',
  });

  return (
    <DefaultFooter
      copyright={`2021-2022 ${defaultMessage}`}
      links={[
        {
          key: 'NGO',
          title: 'NGO',
          href: 'https://www.crystalca.org/',
          blankTarget: true,
        },
        {
          key: 'CrystaLCA R&D Team',
          title: 'CrystaLCA R&D Team',
          href: 'https://www.crystalca.org/team',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <GithubOutlined />,
          href: 'https://github.com/linancn/CrystaLCA',
          blankTarget: true,
        },
      ]}
    />
  );
};
