export default [
  {
    path: '/test',
    name: 'Test',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      {
        name: 'ReactFlowDemo',
        icon: 'smile',
        path: '/test/reactflowdemo',
        component: './test/ReactFlowDemo',
      },
      {
        name: 'EmptyPage',
        icon: 'smile',
        path: '/test/emptypage',
        component: './test/emptypage',
      },
      {
        name: 'listsearch',
        icon: 'smile',
        path: '/test/listsearch',
        component: './Test/ListSearch',
      },
    ],
  },
  {
    name: 'ListTableList',
    icon: 'smile',
    path: '/test/listtablelist',
    component: './test/ListTableList',
  },
  {
    name: 'ProfileBasic',
    icon: 'smile',
    path: '/test/profilebasic',
    component: './test/ProfileBasic',
  },
];
