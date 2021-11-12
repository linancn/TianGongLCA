import { request } from 'umi';
import type { EdgeProcess } from './data';
import type { SortOrder } from 'antd/lib/table/interface';

export async function getEdgeProcessGrid(
  params: {
    current?: number;
    pageSize?: number;
  },
  sort: Record<string, SortOrder>,
  projectId: number,
  planId: string,
  sourceProcessId: string,
  targetProcessId: string,
) {
  const sortBy = Object.keys(sort)[0];
  const orderBy = sort[sortBy]?.replace('end', '');
  return request<{
    data: EdgeProcess[];
    total?: number;
    success?: boolean;
  }>('http://localhost:8081/api/edgeprocess/getgrid', {
    method: 'GET',
    params: {
      ...params,
      sortBy,
      orderBy,
      projectId,
      planId,
      sourceProcessId,
      targetProcessId,
    },
  });
}

export async function getEdgeProcess(pkid: number) {
  return request<EdgeProcess>(`http://localhost:8081/api/edgeprocess/get/${pkid}`, {
    method: 'GET',
  });
}

export async function updateEdgeProcess(data?: Record<string, any>) {
  return request<string>('http://localhost:8081/api/edgeprocess/update', {
    method: 'PUT',
    data,
  });
}

export async function createEdgeProcess(data?: Record<string, any>) {
  return request<string>('http://localhost:8081/api/edgeprocess/create', {
    method: 'POST',
    data,
  });
}

export async function deleteEdgeProcess(pkid: number) {
  return request<string>(`http://localhost:8081/api/edgeprocess/delete/${pkid}`, {
    method: 'DELETE',
  });
}
