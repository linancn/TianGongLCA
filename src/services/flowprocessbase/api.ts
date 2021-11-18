import { request } from 'umi';
import type { FlowProcessBase } from './data';
import type { SortOrder } from 'antd/lib/table/interface';

export async function getFlowProcessBaseGrid(
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
    data: FlowProcessBase[];
    total?: number;
    success?: boolean;
  }>('http://localhost:8081/api/flowprocessbase/getgrid', {
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

export async function getFlowProcessBaseByPkid(pkid: number) {
  return request<FlowProcessBase>(`http://localhost:8081/api/flowprocessbase/get/${pkid}`, {
    method: 'GET',
  });
}
export async function getFlowProcessBaseById(projectid: number, processid: string, id: string) {
  return request<FlowProcessBase>(
    `http://localhost:8081/api/flowprocessbase/get/${projectid}/${processid}/${id}`,
    {
      method: 'GET',
    },
  );
}

export async function updateFlowProcessBase(data?: Record<string, any>) {
  return request<string>('http://localhost:8081/api/flowprocessbase/update', {
    method: 'PUT',
    data,
  });
}

export async function createFlowProcessBase(data?: Record<string, any>) {
  return request<string>('http://localhost:8081/api/flowprocessbase/create', {
    method: 'POST',
    data,
  });
}

/** Delete /api/plan */
export async function deleteFlowProcessBase(id: number) {
  return request<string>(`http://localhost:8081/api/flowprocessbase/delete/${id}`, {
    method: 'DELETE',
  });
}
