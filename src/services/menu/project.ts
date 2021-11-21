import { getProject } from '../project/api';

export async function getProjectMenu(projectId: any) {
  return getProject(projectId)
    .then(async (result) => {
      return [
        {
          path: '/home/project/card',
          name: 'go_back',
          icon: 'DoubleLeft',
          component: './home/project/card',
        },
        {
          name: result.name?.toString(),
          icon: 'Wallet',
          children: [
            {
              name: 'plans',
              icon: 'Apartment',
              locale: 'menu.plans',
              path: `/project/plan/list?projectid=${projectId}`,
              component: './project/plan/list',
            },
            {
              name: 'processes',
              icon: 'ShareAlt',
              locale: 'menu.processes',
              path: `/project/process/list?projectid=${projectId}`,
              component: './project/process/list',
            },
            {
              name: 'flows',
              icon: 'NodeExpand',
              locale: 'menu.flows',
              path: `/project/flow/list?projectid=${projectId}`,
              component: './project/flow/list',
            },
            {
              name: 'measurements',
              icon: 'Profile',
              locale: 'menu.measurements',
              path: `/project/measurement/list?projectid=${projectId}`,
              component: './project/measurement/list',
            },
            {
              path: '/project/units',
              name: 'units',
              icon: 'Swap',
              locale: 'menu.units',
              component: './project/welcome',
            },
            {
              path: '/project/global_parameters',
              name: 'global_parameters',
              icon: 'Control',
              locale: 'menu.global_parameters',
              component: './project/welcome',
            },
            {
              path: '/project/assessment',
              name: 'assessment',
              icon: 'Reconciliation',
              locale: 'menu.assessment',
              component: './project/welcome',
            },
          ],
        },
      ];
    })
    .catch(() => {
      return [
        {
          path: '/home/project/card',
          name: 'go_back',
          icon: 'DoubleLeft',
          component: './home/project/card',
        },
      ];
    });
}
