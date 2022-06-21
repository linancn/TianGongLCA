import type {
  BasicLayoutProps,
  MenuDataItem,
  Settings as LayoutSettings,
} from '@ant-design/pro-layout';
import { PageLoading } from '@ant-design/pro-layout';
import { message } from 'antd';
import { history } from 'umi';
import RightContent from '@/components/RightContent';
import Footer from '@/components/Footer';
import { currentUser as queryCurrentUser } from '@/services/user/api';
import fixMenuItemIcon from './utils/fixMenuItemIcon';
import { getHomeMenu } from './services/menu/home';
import { getProjectMenu } from './services/menu/project';
import HeaderContent from './components/HeaderContent';
const loginPath = '/user/login';

export const initialStateConfig = {
  loading: <PageLoading />,
};

const getUrlParam = () => {
  const { pathname, query } = history.location;
  let menuid = '';
  let pathnames = pathname.split('/');
  if (pathnames.length > 1) {
    menuid = pathnames[1].toLocaleLowerCase();
    if (menuid === 'user' && query?.redirect) {
      if (typeof query?.redirect === 'string') {
        pathnames = query?.redirect.split('/');
        if (pathnames.length > 1) {
          menuid = pathnames[1].toLocaleLowerCase();
        }
      }
    }
  }
  return {
    menuId: menuid,
    query,
  };
};

// const getMenuId = () => {
//   const { pathname } = history.location;
//   const redirect = history.location.query?.redirect;
//   let menuid = '';
//   let pathnames = pathname.split('/');
//   if (pathnames.length > 1) {
//     menuid = pathnames[1].toLocaleLowerCase();
//     if (menuid === 'user' && redirect) {
//       if (typeof redirect === 'string') {
//         pathnames = redirect.split('/');
//         if (pathnames.length > 1) {
//           menuid = pathnames[1].toLocaleLowerCase();
//         }
//       }
//     }
//   }
//   return menuid;
// };

export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: API.CurrentUser;
  fetchUserInfo?: () => Promise<API.CurrentUser | undefined>;
  fetchMenuData?: () => Promise<any>;
  menuId: string;
  menuData: any;
}> {
  const fetchUserInfo = async () => {
    try {
      const currentUser = await queryCurrentUser();
      return currentUser;
    } catch (error) {
      history.push(loginPath);
    }
    return undefined;
  };
  //   try {
  //     console.log("localStorage", localStorage.getItem('islogin'));
  //     if (localStorage.getItem('islogin') === 'admin') {
  //       const current = await queryCurrentUser();
  //       return current;
  //     } else {
  //       history.push(loginPath);
  //     }
  //     // const currentUser: any = {
  //     // name: 'Admin',
  //     // avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
  //     // userid: '00000001',
  //     // email: '',
  //     // signature: '',
  //     // title: '',
  //     // group: '',
  //     // tags: [
  //     //   {
  //     //     key: '0',
  //     //     label: '',
  //     //   },
  //     // ],
  //     // notifyCount: 12,
  //     // unreadCount: 6,
  //     // country: 'China',
  //     // access: {},
  //     // geographic: {
  //     //   province: {
  //     //     label: '',
  //     //     key: '',
  //     //   },
  //     //   city: {
  //     //     label: '',
  //     //     key: '',
  //     //   },
  //     // },
  //     // address: '',
  //     // phone: '',
  //     // };
  //     // return currentUser;
  //   } catch (error) {
  //     history.push(loginPath);
  //   }
  //   return undefined;
  // };
  const fetchMenuData = async () => {
    try {
      const urlparam = getUrlParam();
      // if (urlparam.menuId === '' || urlparam.menuId === 'home' || urlparam.menuId === 'user') {
      //   return getHomeMenu();
      // }
      if (urlparam.menuId === 'project') {
        return getProjectMenu(urlparam.query?.projectid);
      }
      return getHomeMenu();
    } catch (error) {
      history.push(loginPath);
      return undefined;
    }
  };

  const urlParam = getUrlParam();
  const menuData = await fetchMenuData();
  if (history.location.pathname !== loginPath) {
    const currentUser = await fetchUserInfo();
    return {
      fetchUserInfo,
      currentUser,
      settings: {},
      menuId: urlParam.menuId,
      menuData,
    };
  }
  return {
    fetchUserInfo,
    settings: {},
    menuId: urlParam.menuId,
    menuData,
  };
}

// https://procomponents.ant.design/components/layout
export const layout = ({
  initialState,
}: {
  initialState: {
    settings?: LayoutSettings;
    menuId: string;
    menuData: MenuDataItem[];
    currentUser?: API.CurrentUser;
  };
}): BasicLayoutProps => {
  return {
    // menuItemRender: (menuItemProps, defaultDom) => {
    //   if (menuItemProps.isUrl || !menuItemProps.path) {
    //     return defaultDom;
    //   }
    //   return (
    //     <Link to={menuItemProps.path}>
    //       {menuItemProps.pro_layout_parentKeys &&
    //         menuItemProps.pro_layout_parentKeys.length > 0 &&
    //         menuItemProps.icon}
    //       {defaultDom}
    //     </Link>
    //   );
    // },
    rightContentRender: () => <RightContent />,
    headerContentRender: () => <HeaderContent title={''} />,
    disableContentMargin: false,
    // waterMarkProps: {
    //   content: initialState?.currentUser?.name,
    // },
    footerRender: () => <Footer />,
    onPageChange: () => {
      const { location } = history;
      if (!initialState?.currentUser && location.pathname !== loginPath) {
        history.push(loginPath);
      }
      if (initialState.menuId !== getUrlParam().menuId) {
        history.go(0);
      }
    },
    // links: isDev
    //   ? [
    //       <Link to="/umi/plugin/openapi" target="_blank">
    //         <LinkOutlined />
    //         <span>openAPI 文档</span>
    //       </Link>,
    //       <Link to="/~docs">
    //         <BookOutlined />
    //         <span>业务组件文档</span>
    //       </Link>,
    //     ]
    //   : [],
    menuHeaderRender: undefined,
    menuDataRender: () => {
      // return initialState.menuData;
      return fixMenuItemIcon(initialState.menuData);
    },
    // actionRef:()=>{},
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    ...initialState?.settings,
  };
};

//拦截器-请求前拦截
const authHeaderInterceptor = (url: any, options: any) => {
  if (localStorage.getItem('token')) {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    };
    return {
      url,
      options: { ...options, headers },
    };
  }
  return {
    url,
    options: { ...options },
  };
};

//拦截器-响应后拦截
const errorResponseInterceptors = async (response: any) => {
  const res = await response.clone().json(); //这里是关键，获取所有接口请求成功之后的数据
  if (res?.code) {
    if (res.code === 401) {
      history.push(loginPath);
    } else if (res.code === 403) message.error('没有权限，请联系管理员授权！');
  }
  return response;
};
//统一错误处理
const errorHandler = (error: any) => {
  const { response } = error;
  if (!response) {
    message.error('Your network is abnormal and you cannot connect to the server!');
  }
  throw error;
};

export const request = {
  errorHandler: errorHandler,
  requestInterceptors: [authHeaderInterceptor],
  responseInterceptors: [errorResponseInterceptors],
};

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
/**
 * 异常处理程序
    200: '服务器成功返回请求的数据。',
    201: '新建或修改数据成功。',
    202: '一个请求已经进入后台排队（异步任务）。',
    204: '删除数据成功。',
    400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
    401: '用户没有权限（令牌、用户名、密码错误）。',
    403: '用户得到授权，但是访问是被禁止的。',
    404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
    405: '请求方法不被允许。',
    406: '请求的格式不可得。',
    410: '请求的资源被永久删除，且不会再得到的。',
    422: '当创建一个对象时，发生一个验证错误。',
    500: '服务器发生错误，请检查服务器。',
    502: '网关错误。',
    503: '服务不可用，服务器暂时过载或维护。',
    504: '网关超时。',
 //-----English
    200: The server successfully returned the requested data. ',
    201: New or modified data is successful. ',
    202: A request has entered the background queue (asynchronous task). ',
    204: Data deleted successfully. ',
    400: 'There was an error in the request sent, and the server did not create or modify data. ',
    401: The user does not have permission (token, username, password error). ',
    403: The user is authorized, but access is forbidden. ',
    404: The request sent was for a record that did not exist. ',
    405: The request method is not allowed. ',
    406: The requested format is not available. ',
    410':
        'The requested resource is permanently deleted and will no longer be available. ',
    422: When creating an object, a validation error occurred. ',
    500: An error occurred on the server, please check the server. ',
    502: Gateway error. ',
    503: The service is unavailable. ',
    504: The gateway timed out. ',
 * @see https://beta-pro.ant.design/docs/request-cn
 */
