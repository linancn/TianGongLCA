import type { SortOrder } from 'antd/lib/table/interface';
import { request } from 'umi';
import { getServiceHostName } from '../setting';
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
  }>(`${getServiceHostName()}/api/flowproperty/getgrid`, {
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
  return request<FlowProperty>(`${getServiceHostName()}/api/flowproperty/get/${pkid}`, {
    method: 'GET',
  });
}

export async function createFlowProperty(data?: Record<string, any>) {
  return request<string>(`${getServiceHostName()}/api/flowproperty/create`, {
    method: 'POST',
    data,
  });
}

export async function deleteFlowProperty(pkid: number) {
  return request<string>(`${getServiceHostName()}/api/flowproperty/delete/${pkid}`, {
    method: 'DELETE',
  });
}

export async function updateFlowProperty(data?: Record<string, any>) {
  return request<string>(`${getServiceHostName()}/api/flowproperty/update`, {
    method: 'PUT',
    data,
  });
}

export async function copyFlowProperty(data?: Record<string, any>) {
  return request<string>(`${getServiceHostName()}/api/flowproperty/copy`, {
    method: 'PUT',
    data,
  });
}
