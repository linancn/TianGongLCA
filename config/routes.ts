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
        component: './Home/Welcome',
      },
      {
        name: 'project',
        path: '/home/project',
        component: './Home/Project',
        routes: [
          {
            name: 'project.card',
            path: '/home/project/card',
            component: './Home/Project/Card',
          },
          {
            name: 'project.table',
            path: '/home/project/table',
            component: './Home/Project/Table',
          },
        ],
      },
      {
        name: 'starred',
        path: '/home/starred',
        component: './Home/Welcome',
      },
      {
        name: 'Create',
        path: '/home/create',
        component: './Home/Welcome',
      },
      {
        name: 'connect',
        path: '/home/connect',
        component: './Home/Welcome',
      },
      {
        name: 'recyclebin',
        path: '/home/recyclebin',
        component: './Home/Welcome',
      },
      {
        name: 'database',
        path: '/home/database',
        component: './Home/Welcome',
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
        component: './Test/EmptyPage',
      },
      {
        name: 'listsearch',
        path: '/test/listsearch',
        component: './Test/ListSearch',
        routes: [
          {
            name: 'applications',
            path: '/test/listsearch/applications',
            component: './Test/ListSearch/Applications',
          },
          {
            name: 'articles',
            path: '/test/listsearch/articles',
            component: './Test/ListSearch/Articles',
          },
          {
            name: 'projects',
            path: '/test/listsearch/projects',
            component: './Test/ListSearch/Projects',
          },
        ],
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
        component: './Home/Welcome',
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
