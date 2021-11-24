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
            path: '/project/plan/list',
            component: './project/plan/list',
          },
          {
            name: 'editmodel',
            path: '/project/plan/editmodel',
            component: './project/plan/editmodel',
            layout: false,
          },
          {
            name: 'viewmodel',
            path: '/project/plan/viewmodel',
            component: './project/plan/viewmodel',
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
          {
            name: 'processes',
            path: '/project/process/edit',
            component: './project/process/edit',
            layout: false,
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
        path: '/project/measurement',
        component: './project/measurement',
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
    path: '/',
    redirect: '/home/project/card',
  },
  {
    component: './404',
  },
];
