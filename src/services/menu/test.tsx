export async function getTestMenu() {
  return [
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
      ],
    },
    {
      name: 'ProfileBasic',
      icon: 'smile',
      path: '/test/profilebasic',
      component: './test/ProfileBasic',
    },
  ];
}
