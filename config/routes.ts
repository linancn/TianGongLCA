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
        name: 'welcome',
        path: '/home/welcome',
        component: './home/welcome',
      },
      {
        name: 'project',
        path: '/home/project',
        component: './home/project',
        routes: [
          {
            name: 'project.card',
            path: '/home/project/card',
            component: './home/project/card',
          },
          {
            name: 'project.table',
            path: '/home/project/table',
            component: './home/project/table',
          },
        ],
      },
      {
        name: 'starred',
        path: '/home/starred',
        component: './home/welcome',
      },
      {
        name: 'create',
        path: '/home/create',
        component: './home/welcome',
      },
      {
        name: 'connect',
        path: '/home/connect',
        component: './home/welcome',
      },
      {
        name: 'recyclebin',
        path: '/home/recyclebin',
        component: './home/welcome',
      },
      {
        name: 'database',
        path: '/home/database',
        component: './home/welcome',
      },
    ],
  },
  {
    path: '/project',
    routes: [
      {
        path: '/project/plan',
        routes: [
          {
            name: 'plans',
            path: '/project/plan/list',
            component: './project/plan/list',
          },
          {
            name: 'model',
            path: '/project/plan/model',
            component: './project/plan/model',
            layout: false,
          },
        ],
      },
      {
        path: '/project/process',
        routes: [
          {
            name: 'processes',
            path: '/project/process/list',
            component: './project/process/list',
          },
        ],
      },
      {
        path: '/project/flows',
        routes: [
          {
            name: 'flows',
            path: '/project/flows/list',
            component: './project/welcome',
          },
        ],
      },
      {
        name: 'quantitles',
        path: '/project/quantitles',
        component: './project/welcome',
      },
      {
        name: 'units',
        path: '/project/units',
        component: './project/welcome',
      },
      {
        name: 'global_parameters',
        path: '/project/global_parameters',
        component: './project/welcome',
      },
      {
        name: 'assessment',
        path: '/project/assessment',
        component: './project/welcome',
      },
    ],
  },
  {
    path: '/test',
    access: 'canAdmin',
    routes: [
      {
        name: 'reactflowdemo',
        path: '/test/reactflowdemo',
        component: './test/ReactFlowDemo',
      },
      {
        name: 'emptypage',
        path: '/test/emptypage',
        component: './test/EmptyPage',
      },
      {
        name: 'ProfileBasic',
        icon: 'smile',
        path: '/test/profilebasic',
        component: './test/ProfileBasic',
      },
    ],
  },
  {
    path: '/admin',
    access: 'canAdmin',
    component: './Admin',
    routes: [
      {
        path: '/admin/sub-page',
        name: 'sub-page',
        component: './home/welcome',
      },
    ],
  },
  {
    path: '/',
    redirect: '/home/welcome',
  },
  {
    component: './404',
  },
];
