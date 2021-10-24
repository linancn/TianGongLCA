import { request } from 'umi';
import type { FlowProcess } from './data';
import type { SortOrder } from 'antd/lib/table/interface';

export async function getFlowProcessGrid(
  params: {
    current?: number;
    pageSize?: number;
  },
  sort: Record<string, SortOrder>,
  projectId: number,
  processId: string,
  ioType: string,
) {
  const sortBy = Object.keys(sort)[0];
  const orderBy = sort[sortBy]?.replace('end', '');
  return request<{
    data: FlowProcess[];
    total?: number;
    success?: boolean;
  }>('http://localhost:8081/api/flowprocess/getgrid', {
    method: 'GET',
    params: {
      ...params,
      sortBy,
      orderBy,
      projectId,
      processId,
      ioType,
    },
  });
}

export async function getFlowProcess(projectId: number, id: string) {
  return request<FlowProcess>(`http://localhost:8081/api/flowprocess/get/${projectId}/${id}`, {
    method: 'GET',
  });
}

export async function updateFlowProcess(data?: Record<string, any>) {
  return request<string>('http://localhost:8081/api/flowprocess/update', {
    method: 'PUT',
    data,
  });
}

export async function createFlowProcess(data?: Record<string, any>) {
  return request<string>('http://localhost:8081/api/flowprocess/create', {
    method: 'POST',
    data,
  });
}

/** Delete /api/plan */
export async function deleteFlowProcess(id: number) {
  return request<string>(`http://localhost:8081/api/flowprocess/delete/${id}`, {
    method: 'DELETE',
  });
}
