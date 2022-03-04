import { getProject } from '../project/api';

export async function getProjectMenu(projectId: any) {
  return getProject(projectId)
    .then(async () => {
      return [
        {
          name: 'home',
          icon: 'DoubleLeft',
          path: '/home/project/card',
          component: './home/project/card',
        },
        // {
        //   name: 'back',
        //   icon: 'Left',
        //   path: `/project/plan?projectid=${projectId}`,
        //   component: './project/plan',
        //   parentKeys: [],
        // },
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
          path: `/project/flowproperty?projectid=${projectId}`,
          component: './project/flowproperty',
        },
        {
          name: 'categories',
          icon: 'Profile',
          locale: 'menu.categories',
          path: `/project/category?projectid=${projectId}`,
          component: './project/category',
        },
        {
          name: 'locations',
          icon: 'Profile',
          locale: 'menu.locations',
          path: `/project/location?projectid=${projectId}`,
          component: './project/location',
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
          path: `/project/assessment?projectid=${projectId}`,
          name: 'assessment',
          icon: 'Reconciliation',
          locale: 'menu.assessment',
          component: './project/assessment',
        },
        // {
        //   hideInMenu: true,
        //   name: 'assessment',
        //   icon: 'Reconciliation',
        //   path: '/project/assessment/chart1',
        //   component: './project/assessment/chart1',
        //   // parentKeys: ['/project/assessment'],
        // },
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
