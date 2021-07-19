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
        name: '搜索列表',
        icon: 'smile',
        path: '/test/listsearch',
        component: './Test/ListSearch',
      },
    ],
  },
];
