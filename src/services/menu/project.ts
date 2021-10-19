export async function getProjectMenu(project: any) {
  return [
    {
      name: 'plans',
      icon: 'crown',
      path: `/project/plan/list?project=${project}`,
      component: './project/plan/list',
    },
    {
      name: 'processes',
      icon: 'crown',
      path: `/project/process/list?project=${project}`,
      component: './project/process/list',
    },
    {
      name: 'flows',
      icon: 'crown',
      path: `/project/flow/list?project=${project}`,
      component: './project/flow/list',
    },
    {
      name: 'measurements',
      icon: 'crown',
      path: `/project/measurement/list?project=${project}`,
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
