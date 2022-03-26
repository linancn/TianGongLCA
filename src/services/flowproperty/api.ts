import type { SortOrder } from 'antd/lib/table/interface';
import { request } from 'umi';
import type { FlowProperty } from './data';

export async function getFlowPropertyGrid(
  params: {
    current?: number;
    pageSize?: number;
  },
  sort: Record<string, SortOrder>,
  projectId: number,
  otherProject: boolean,
) {
  const sortBy = Object.keys(sort)[0];
  const orderBy = sort[sortBy]?.replace('end', '');
  return request<{
    data: FlowProperty[];
    total?: number;
    success?: boolean;
  }>('http://localhost:8081/api/flowproperty/getgrid', {
    method: 'GET',
    params: {
      ...params,
      sortBy,
      orderBy,
      projectId,
      otherProject,
    },
  });
}

export async function getFlowPropertyByPkid(pkid: number) {
  return request<FlowProperty>(`http://localhost:8081/api/flowproperty/get/${pkid}`, {
    method: 'GET',
  });
}

export async function createFlowProperty(data?: Record<string, any>) {
  return request<string>('http://localhost:8081/api/flowproperty/create', {
    method: 'POST',
    data,
  });
}

export async function deleteFlowProperty(pkid: number) {
  return request<string>(`http://localhost:8081/api/flowproperty/delete/${pkid}`, {
    method: 'DELETE',
  });
}

export async function updateFlowProperty(data?: Record<string, any>) {
  return request<string>('http://localhost:8081/api/flowproperty/update', {
    method: 'PUT',
    data,
  });
}

export async function saveFlowProperty(data?: Record<string, any>) {
  return request<string>('http://localhost:8081/api/flowproperty/save', {
    method: 'PUT',
    data,
  });
}
