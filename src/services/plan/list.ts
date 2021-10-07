// @ts-ignore
/* eslint-disable */
import { request } from 'umi';
import { PlanChildrenJson, PlanInfo } from './list.d';
import { SortOrder } from 'antd/lib/table/interface';

/** 获取规则列表 GET /api/project */
export async function getPlanList(
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
  }>('http://localhost:8081/api/plan/grid', {
    method: 'GET',
    params: {
      ...params,
      sortBy,
      orderBy,
      projectId,
    },
  });
}

export async function getPlanInfo(projectId: number, id: string) {
  return request<PlanInfo>('http://localhost:8081/api/plan/getinfo/' + projectId + '/' + id, {
    method: 'GET',
  });
}

export async function updatePlanInfo(data?: { [key: string]: any }) {
  return request<string>('http://localhost:8081/api/plan/updateinfo', {
    method: 'PUT',
    data: data,
  });
}

export async function getPlanChildrenJson(projectId: number, id: string) {
  return request<PlanChildrenJson>(
    'http://localhost:8081/api/plan/getchildrenjson/' + projectId + '/' + id,
    {
      method: 'GET',
    },
  );
}

/** PUT /api/plan */
export async function updatePlanChinlrenJson(data?: { [key: string]: any }) {
  return request<PlanInfo>('http://localhost:8081/api/plan/updatechinlrenjson', {
    method: 'PUT',
    data: data,
  });
}

/** POST /api/plan */
export async function createPlan(data?: { [key: string]: any }) {
  return request<PlanInfo>('http://localhost:8081/api/plan/create', {
    method: 'POST',
    data: data,
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
  return request<PlanInfo>('http://localhost:8081/api/plan/delete/' + id, {
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
export async function removeplan(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/plan', {
    method: 'DELETE',
    ...(options || {}),
  });
}
