export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './user/Login',
          },
        ],
      },
    ],
  },
  {
    path: '/home',
    routes: [
      {
        path: '/home',
        routes: [
          {
            name: 'Welcome',
            path: '/home/welcome',
            component: './Home/Welcome',
          },
          {
            name: 'Project',
            path: '/home/project',
            component: './Home/Welcome',
          },
          {
            name: 'Starred',
            path: '/home/starred',
            component: './Home/Welcome',
          },
          {
            name: 'Create',
            path: '/home/create',
            component: './Home/Welcome',
          },
          {
            name: 'Connect',
            path: '/home/connect',
            component: './Home/Welcome',
          },
          {
            name: 'RecycleBin',
            path: '/home/recyclebin',
            component: './Home/Welcome',
          },
          {
            name: 'Database',
            path: '/home/database',
            component: './Home/Welcome',
          },
        ],
      },
    ],
  },
  {
    path: '/test',
    name: 'Test',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      {
        name: 'ReactFlowDemo',
        path: '/test/reactflowdemo',
        component: './test/ReactFlowDemo',
      },
      {
        name: 'EmptyPage',
        path: '/test/emptypage',
        component: './Test/EmptyPage',
      },
    ],
  },
  {
    path: '/admin',
    name: 'Admin',
    icon: 'crown',
    access: 'canAdmin',
    component: './Admin',
    routes: [
      {
        path: '/admin/sub-page',
        name: 'sub-page',
        component: './Home/Welcome',
      },
    ],
  },
  {
    name: 'list.table-list',
    icon: 'table',
    path: '/home/list',
    component: './TableList',
  },
  {
    path: '/',
    redirect: '/home/welcome',
  },
  {
    component: './404',
  },
];
