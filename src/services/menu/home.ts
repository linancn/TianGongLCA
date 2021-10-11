export async function getHomeMenu() {
  return [
    {
      path: '/home/welcome',
      name: 'welcome',
      icon: 'smile',
      component: './home/welcome',
    },
    {
      name: 'project',
      icon: 'crown',
      path: '/home/project/card',
      component: './home/project/card',
    },
    {
      hideInMenu: true,
      name: 'project',
      icon: 'crown',
      path: '/home/project/table',
      component: './home/project/table',
      parentKeys: ['/home/project/card'],
    },
    {
      path: '/home/starred',
      name: 'starred',
      icon: 'crown',
      component: './home/welcome',
    },
    {
      path: '/home/create',
      name: 'create',
      icon: 'crown',
      component: './home/welcome',
    },
    {
      path: '/home/connect',
      name: 'connect',
      icon: 'crown',
      component: './home/welcome',
    },
    {
      path: '/home/recyclebin',
      name: 'recyclebin',
      icon: 'crown',
      component: './home/welcome',
    },
    {
      path: '/home/database',
      name: 'database',
      icon: 'crown',
      component: './home/welcome',
    },
  ];
}
