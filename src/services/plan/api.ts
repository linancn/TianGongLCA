import { request } from 'umi';
import type { PlanInfo, PlanModel } from './api.d';
import type { SortOrder } from 'antd/lib/table/interface';

export async function getGrid(
  params: {
    current?: number;
    pageSize?: number;
  },
  sort: Record<string, SortOrder>,
  projectId: number,
) {
  const sortBy = Object.keys(sort)[0];
  const orderBy = sort[sortBy]?.replace('end', '');
  return request<{
    data: PlanInfo[];
    total?: number;
    success?: boolean;
  }>('http://localhost:8081/api/plan/getgrid', {
    method: 'GET',
    params: {
      ...params,
      sortBy,
      orderBy,
      projectId,
    },
  });
}

export async function getParentGrid(
  params: {
    current?: number;
    pageSize?: number;
  },
  sort: Record<string, SortOrder>,
  projectId: number,
  id: string,
) {
  const sortBy = Object.keys(sort)[0];
  const orderBy = sort[sortBy]?.replace('end', '');
  return request<{
    data: PlanInfo[];
    total?: number;
    success?: boolean;
  }>('http://localhost:8081/api/plan/getparentgrid', {
    method: 'GET',
    params: {
      ...params,
      sortBy,
      orderBy,
      projectId,
      id,
    },
  });
}

export async function getInfo(projectId: number, id: string) {
  return request<PlanInfo>(`http://localhost:8081/api/plan/getinfo/${projectId}/${id}`, {
    method: 'GET',
  });
}

export async function updateInfo(data?: Record<string, any>) {
  return request<string>('http://localhost:8081/api/plan/updateinfo', {
    method: 'PUT',
    data,
  });
}

export async function getModel(projectId: number, id: string) {
  return request<PlanModel>(`http://localhost:8081/api/plan/getmodel/${projectId}/${id}`, {
    method: 'GET',
  });
}

export async function updateChinlrenJson(data?: Record<string, any>) {
  return request<PlanInfo>('http://localhost:8081/api/plan/updatechinlrenjson', {
    method: 'PUT',
    data,
  });
}

export async function getParentCount(projectId: number, id: string) {
  return request<number>(`http://localhost:8081/api/plan/getparentcount/${projectId}/${id}`, {
    method: 'GET',
  });
}

// export async function getParents(projectId: number, id: string) {
//   return request<PlanInfo[]>('http://localhost:8081/api/plan/getparents/' + projectId + '/' + id, {
//     method: 'GET'
//   });
// }

export async function create(data?: Record<string, any>) {
  return request<PlanInfo>('http://localhost:8081/api/plan/create', {
    method: 'POST',
    data,
  });
}

// /** Put /api/plan */
// export async function starPlan(id: number) {
//   return request<PlanListItem>('http://localhost:8081/api/plan/starred/' + id, {
//     method: 'PUT',
//   });
// }

/** Delete /api/plan */
export async function deletePlan(id: number) {
  return request<PlanInfo>(`http://localhost:8081/api/plan/delete/${id}`, {
    method: 'DELETE',
  });
}

// export async function getPlanCardList(
//   params: {
//     current?: number;
//     pageSize?: number;
//   },
//   sort: Record<string, SortOrder>,
//   // filter: Record<string, React.ReactText[] | null>,
//   searchvalue: string,
//   data?: { [key: string]: any },
// ) {
//   return request('http://localhost:8081/api/plan/cardlist', {
//     method: 'GET',
//     params: {
//       ...params,
//       sort,
//       searchvalue,
//     },
//     data: data,
//   });
// }

/** DELETE /api/plan */
export async function removeplan(options?: Record<string, any>) {
  return request<Record<string, any>>('/api/plan', {
    method: 'DELETE',
    ...(options || {}),
  });
}
