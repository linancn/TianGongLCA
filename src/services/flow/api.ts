import type { SortOrder } from 'antd/lib/table/interface';
import { request } from 'umi';
import type { Flow } from './data';

export async function getFlowGrid(
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
    data: Flow[];
    total?: number;
    success?: boolean;
  }>('http://localhost:8081/api/flow/getgrid', {
    method: 'GET',
    params: {
      ...params,
      sortBy,
      orderBy,
      projectId,
    },
  });
}

export async function createFlow(data?: Record<string, any>) {
  return request<string>('http://localhost:8081/api/flow/create', {
    method: 'POST',
    data,
  });
}

/** Delete /api/plan */
export async function deleteFlow(pkid: number) {
  return request<string>(`http://localhost:8081/api/flow/delete/${pkid}`, {
    method: 'DELETE',
  });
}
