export async function getProjectMenu(projectId: any) {
  return [
    {
      name: 'plans',
      icon: 'crown',
      path: `/project/plan/list?projectid=${projectId}`,
      component: './project/plan/list',
    },
    {
      name: 'processes',
      icon: 'crown',
      path: `/project/process/list?projectid=${projectId}`,
      component: './project/process/list',
    },
    {
      name: 'flows',
      icon: 'crown',
      path: `/project/flow/list?projectid=${projectId}`,
      component: './project/flow/list',
    },
    {
      name: 'measurements',
      icon: 'crown',
      path: `/project/measurement/list?projectid=${projectId}`,
      component: './project/measurement/list',
    },
    {
      path: '/project/units',
      name: 'units',
      icon: 'crown',
      component: './project/welcome',
    },
    {
      path: '/project/global_parameters',
      name: 'global_parameters',
      icon: 'crown',
      component: './project/welcome',
    },
    {
      path: '/project/assessment',
      name: 'assessment',
      icon: 'crown',
      component: './project/welcome',
    },
  ];
}
