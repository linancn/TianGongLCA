import component from './zh-CN/component';
import globalHeader from './zh-CN/globalHeader';
import menu from './zh-CN/menu';
import pwa from './zh-CN/pwa';
import settingDrawer from './zh-CN/settingDrawer';
import settings from './zh-CN/settings';
import pages from './zh-CN/pages';
import homepage from './zh-CN/homepage';
import plan from './zh-CN/plan';
import project from './zh-CN/project';
import flow from './zh-CN/flow';
import options from './zh-CN/options';
import flowproperty from './zh-CN/flowproperty';
import process from './zh-CN/process';
import unitgroup from './zh-CN/unitgroup';
import category from './zh-CN/category';
import location from './zh-CN/location';
export default {
  'navBar.lang': '语言',
  'layout.user.link.help': '帮助',
  'layout.user.link.privacy': '隐私',
  'layout.user.link.terms': '条款',
  'app.copyright.produced': '由CrystaLCA研发团队开发',
  'app.preview.down.block': '下载此页面到本地项目',
  'app.welcome.link.fetch-blocks': '获取全部区块',
  'app.welcome.link.block-list': '基于 block 开发，快速构建标准页面',
  ...pages,
  ...globalHeader,
  ...menu,
  ...settingDrawer,
  ...settings,
  ...pwa,
  ...component,
  ...homepage,
  ...plan,
  ...project,
  ...flow,
  ...options,
  ...flowproperty,
  ...process,
  ...unitgroup,
  ...category,
  ...location,
};
