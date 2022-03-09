export default [
  {
    name: 'account',
    icon: 'user',
    path: '/account',
    routes: [
      {
        path: '/account',
        redirect: '/account/center',
      },
      {
        name: 'center',
        icon: 'smile',
        path: '/account/center',
        component: './account/center',
      },
      {
        name: 'settings',
        icon: 'smile',
        path: '/account/settings',
        component: './account/settings',
      },
    ],
  },
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
        component: './home/starred',
        routes: [
          {
            name: 'starred.card',
            path: '/home/starred/card',
            component: './home/starred/card',
          },
          {
            name: 'starred.table',
            path: '/home/starred/table',
            component: './home/starred/table',
          },
        ],
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
            path: '/project/plan',
            component: './project/plan',
          },
        ],
      },
      {
        path: '/project/process',
        routes: [
          {
            name: 'processes',
            path: '/project/process',
            component: './project/process',
          },
        ],
      },
      {
        path: '/project/flow',
        routes: [
          {
            name: 'flows',
            path: '/project/flow',
            component: './project/flow',
          },
        ],
      },
      {
        name: 'measurements',
        path: '/project/flowproperty',
        component: './project/flowproperty',
      },
      {
        name: 'units',
        path: '/project/unitgroup',
        component: './project/unitgroup',
      },
      {
        name: 'categories',
        path: '/project/category',
        component: './project/category',
      },
      {
        name: 'locations',
        path: '/project/location',
        component: './project/location',
      },
      {
        name: 'global_parameters',
        path: '/project/global_parameters',
        component: './project/welcome',
      },
      {
        path: '/project/assessment',
        routes: [
          {
            name: 'assessment',
            path: '/project/assessment',
            component: './project/assessment',
          },
          {
            name: 'assessment',
            path: '/project/assessment/chart1',
            component: './project/assessment/chart1',
          },
        ],
      },
    ],
  },
  {
    path: '/',
    redirect: '/home/project/card',
  },
  {
    component: './404',
  },
];
