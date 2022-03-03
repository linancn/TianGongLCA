import type { SortOrder } from 'antd/lib/table/interface';
import { request } from 'umi';
import type { Flow, FlowPropertyJson } from './data';

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

export async function getFlowPropertyJsonViewGrid(
  params: {
    current?: number;
    pageSize?: number;
  },
  sort: Record<string, SortOrder>,
  projectId: number,
  flowPkid: number,
) {
  const sortBy = Object.keys(sort)[0];
  const orderBy = sort[sortBy]?.replace('end', '');
  return request<{
    data: FlowPropertyJson[];
    total?: number;
    success?: boolean;
  }>('http://localhost:8081/api/flow/getpropertyjsonviewgrid', {
    method: 'GET',
    params: {
      ...params,
      sortBy,
      orderBy,
      projectId,
      flowPkid,
    },
  });
}

export async function createFlow(data?: Record<string, any>) {
  return request<string>('http://localhost:8081/api/flow/create', {
    method: 'POST',
    data,
  });
}

export async function createFlowPropertyJson(data?: Record<string, any>) {
  return request<string>(`http://localhost:8081/api/flow/createpropertyjson`, {
    method: 'POST',
    data,
  });
}

export async function updateFlowPropertyJson(propertyId: string, data?: Record<string, any>) {
  return request<string>(`http://localhost:8081/api/flow/updatepropertyjson/${propertyId}`, {
    method: 'PUT',
    data,
  });
}

export async function getFlowPropertyJsonView(flowPkid: number, propertyId: string) {
  return request<FlowPropertyJson>(
    `http://localhost:8081/api/flow/getpropertyjsonview/${flowPkid}/${propertyId}`,
    {
      method: 'GET',
    },
  );
}

export async function deleteFlow(pkid: number) {
  return request<string>(`http://localhost:8081/api/flow/delete/${pkid}`, {
    method: 'DELETE',
  });
}

export async function deleteFlowPropertyJson(flowPkid: number, propertyId: string) {
  return request<string>(
    `http://localhost:8081/api/flow/deletepropertyjson/${flowPkid}/${propertyId}`,
    {
      method: 'DELETE',
    },
  );
}
