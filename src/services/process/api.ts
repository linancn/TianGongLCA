import { request } from 'umi';
import type { Process } from './api.d';
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
    data: Process[];
    total?: number;
    success?: boolean;
  }>('http://localhost:8081/api/process/getgrid', {
    method: 'GET',
    params: {
      ...params,
      sortBy,
      orderBy,
      projectId,
    },
  });
}

export async function get(projectId: number, id: string) {
  return request<Process>(`http://localhost:8081/api/plan/getinfo/${projectId}/${id}`, {
    method: 'GET',
  });
}

export async function update(data?: Record<string, any>) {
  return request<string>('http://localhost:8081/api/process/update', {
    method: 'PUT',
    data,
  });
}

// export async function getParentCount(projectId: number, id: string) {
//   return request<number>(`http://localhost:8081/api/process/getparentcount/${projectId}/${id}`, {
//     method: 'GET',
//   });
// }

export async function create(data?: Record<string, any>) {
  return request<Process>('http://localhost:8081/api/process/create', {
    method: 'POST',
    data,
  });
}

/** Delete /api/plan */
export async function deletePlan(id: number) {
  return request<Process>(`http://localhost:8081/api/process/delete/${id}`, {
    method: 'DELETE',
  });
}
