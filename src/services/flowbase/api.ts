import { request } from 'umi';
import type { FlowBase } from './data';
import type { SortOrder } from 'antd/lib/table/interface';

export async function getFlowBaseGrid(
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
    data: FlowBase[];
    total?: number;
    success?: boolean;
  }>('http://localhost:8081/api/flowbase/getgrid', {
    method: 'GET',
    params: {
      ...params,
      sortBy,
      orderBy,
      projectId,
    },
  });
}

export async function getFlowBase(projectId: number, id: string) {
  return request<FlowBase>(`http://localhost:8081/api/flowbase/get/${projectId}/${id}`, {
    method: 'GET',
  });
}

export async function updateFlowBase(data?: Record<string, any>) {
  return request<string>('http://localhost:8081/api/flowbase/update', {
    method: 'PUT',
    data,
  });
}

export async function createFlowBase(data?: Record<string, any>) {
  return request<string>('http://localhost:8081/api/flowbase/create', {
    method: 'POST',
    data,
  });
}

/** Delete /api/plan */
export async function deleteFlowBase(id: number) {
  return request<FlowBase>(`http://localhost:8081/api/flowbase/delete/${id}`, {
    method: 'DELETE',
  });
}
