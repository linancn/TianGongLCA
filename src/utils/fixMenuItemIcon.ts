import React from 'react';
import type { MenuDataItem } from '@ant-design/pro-layout';
import * as allIcons from '@ant-design/icons';

const fixMenuItemIcon = (menus: MenuDataItem[], iconType = 'Outlined'): MenuDataItem[] => {
  return menus.map((item) => {
    let fixIcon: React.ReactNode;
    if (typeof item.icon === 'string') {
      const { icon } = item;
      const fixIconName = icon.slice(0, 1).toLocaleUpperCase() + icon.slice(1) + iconType;
      fixIcon = React.createElement(allIcons[fixIconName] || allIcons[icon]);
    }
    if (item.children && item.children.length > 0) {
      return { ...item, icon: fixIcon, children: fixMenuItemIcon(item.children) };
    }
    return { ...item, icon: fixIcon };
  });
};

export default fixMenuItemIcon;
