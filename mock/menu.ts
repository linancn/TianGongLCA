import { Request, Response } from 'express';
export default {
  'GET /api/menuData': (req: Request, res: Response) => {
    res.send([
      {
        path: '/home/welcome',
        name: 'welcome',
        icon: 'smile',
      },
    ]);
  },
  'GET /api/homemenudata': (req: Request, res: Response) => {
    res.send([
      {
        path: '/home/welcome',
        name: 'welcome',
        icon: 'smile',
        component: './Home/Welcome',
      },
      {
        path: '/home/project',
        name: 'Project',
        icon: 'crown',
        component: './Home/Welcome',
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
    ]);
  },
  'GET /api/testmenudata': (req: Request, res: Response) => {
    res.send([
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
            name: 'list.table-list',
            icon: 'table',
            path: '/home/list',
            component: './TableList',
          },
        ],
      },
    ]);
  },
};
