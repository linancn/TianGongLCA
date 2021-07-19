export default [
  {
    path: '/home/welcome',
    name: 'welcome',
    icon: 'smile',
    component: './Home/Welcome',
  },
  {
    name: 'Project',
    icon: 'crown',
    path: '/home/project/card',
    component: './Home/Project/Card',
  },
  {
    hideInMenu: true,
    name: 'Project',
    icon: 'crown',
    path: '/home/project/table',
    component: './Home/Project/Table',
  },
  {
    path: '/home/starred',
    name: 'Starred',
    icon: 'crown',
    component: './Home/Welcome',
  },
  {
    path: '/home/create',
    name: 'Create',
    icon: 'crown',
    component: './Home/Welcome',
  },
  {
    path: '/home/connect',
    name: 'Connect',
    icon: 'crown',
    component: './Welcome',
  },
  {
    path: '/home/recyclebin',
    name: 'RecycleBin',
    icon: 'crown',
    component: './Home/Welcome',
  },
  {
    path: '/home/database',
    name: 'Database',
    icon: 'crown',
    component: './Home/Welcome',
  },
];
