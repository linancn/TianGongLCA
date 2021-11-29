import { Button, Space } from 'antd';
import {
  CloseOutlined,
  FullscreenExitOutlined,
  FullscreenOutlined,
  MinusOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import React from 'react';
import { useModel, SelectLang } from 'umi';
import Avatar from './AvatarDropdown';
import styles from './index.less';

export type SiderTheme = 'light' | 'dark';

const GlobalHeaderRight: React.FC = () => {
  const { initialState } = useModel('@@initialState');

  if (!initialState || !initialState.settings) {
    return null;
  }

  const { navTheme, layout } = initialState.settings;
  let className = styles.right;

  if ((navTheme === 'dark' && layout === 'top') || layout === 'mix') {
    className = `${styles.right}  ${styles.dark}`;
  }
  return (
    <>
      <Space className={className}>
        {/* <HeaderSearch
        className={`${styles.action} ${styles.search}`}
        placeholder="站内搜索"
        defaultValue="umi ui"
        options={[
          { label: <a href="https://umijs.org/zh/guide/umi-ui.html">umi ui</a>, value: 'umi ui' },
          {
            label: <a href="next.ant.design">Ant Design</a>,
            value: 'Ant Design',
          },
          {
            label: <a href="https://protable.ant.design/">Pro Table</a>,
            value: 'Pro Table',
          },
          {
            label: <a href="https://prolayout.ant.design/">Pro Layout</a>,
            value: 'Pro Layout',
          },
        ]}
        // onSearch={value => {
        //   console.log('input', value);
        // }}
      /> */}
        <span
          className={styles.action}
          onClick={() => {
            // window.open('https://pro.ant.design/docs/getting-started');
          }}
        >
          <QuestionCircleOutlined />
        </span>
        <Avatar />
        <SelectLang className={styles.action} />
      </Space>
      <Space id="electron" className={styles.electron}>
        |
        <Button type="link" id="electron_minimize" icon={<MinusOutlined />} />
        <Button type="link" id="electron_maximize" icon={<FullscreenExitOutlined />} />
        <Button type="link" id="electron_restore" icon={<FullscreenOutlined />} />
        <Button
          type="link"
          icon={<CloseOutlined />}
          onClick={() => {
            window.close();
          }}
        />
      </Space>
    </>
  );
};
export default GlobalHeaderRight;
