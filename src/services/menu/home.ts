export async function getHomeMenu() {
  return [
    {
      name: 'project',
      icon: 'Wallet',
      path: '/home/project/card',
      component: './home/project/card',
    },
    {
      hideInMenu: true,
      name: 'project',
      icon: 'Wallet',
      path: '/home/project/table',
      component: './home/project/table',
      parentKeys: ['/home/project/card'],
    },
    {
      name: 'starred',
      icon: 'Star',
      path: '/home/starred/card',
      component: './home/starred/card',
    },
    {
      hideInMenu: true,
      name: 'starred',
      icon: 'Star',
      path: '/home/starred/table',
      component: './home/starred/table',
      parentKeys: ['/home/starred/card'],
    },
    {
      path: '/home/create',
      name: 'create',
      icon: 'FileAdd',
      component: './home/welcome',
    },
    {
      path: '/home/connect',
      name: 'connect',
      icon: 'Api',
      component: './home/welcome',
    },
    {
      path: '/home/recyclebin',
      name: 'recyclebin',
      icon: 'Delete',
      component: './home/welcome',
    },
    {
      path: '/home/database',
      name: 'database',
      icon: 'Database',
      component: './home/welcome',
    },
  ];
}
