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
              path: `/project/plan?projectid=${projectId}`,
              component: './project/plan',
            },
            {
              name: 'processes',
              icon: 'ShareAlt',
              locale: 'menu.processes',
              path: `/project/process?projectid=${projectId}`,
              component: './project/process',
            },
            {
              name: 'flows',
              icon: 'NodeExpand',
              locale: 'menu.flows',
              path: `/project/flow?projectid=${projectId}`,
              component: './project/flow',
            },
            {
              name: 'measurements',
              icon: 'Profile',
              locale: 'menu.measurements',
              path: `/project/measurement?projectid=${projectId}`,
              component: './project/measurement',
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
