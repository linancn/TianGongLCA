export async function getProjectMenu(projectId: any) {
  return [
    {
      name: 'plans',
      icon: 'Apartment',
      path: `/project/plan/list?projectid=${projectId}`,
      component: './project/plan/list',
    },
    {
      name: 'processes',
      icon: 'ShareAlt',
      path: `/project/process/list?projectid=${projectId}`,
      component: './project/process/list',
    },
    {
      name: 'flows',
      icon: 'NodeExpand',
      path: `/project/flow/list?projectid=${projectId}`,
      component: './project/flow/list',
    },
    {
      name: 'measurements',
      icon: 'Profile',
      path: `/project/measurement/list?projectid=${projectId}`,
      component: './project/measurement/list',
    },
    {
      path: '/project/units',
      name: 'units',
      icon: 'Swap',
      component: './project/welcome',
    },
    {
      path: '/project/global_parameters',
      name: 'global_parameters',
      icon: 'Control',
      component: './project/welcome',
    },
    {
      path: '/project/assessment',
      name: 'assessment',
      icon: 'Reconciliation',
      component: './project/welcome',
    },
    {
      path: '/home/project/card',
      name: 'go_back',
      icon: 'DoubleLeft',
      component: './home/project/card',
    },
  ];
}
