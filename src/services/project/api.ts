import { request } from 'umi';
import type { Project } from './data';
import type { SortOrder } from 'antd/lib/table/interface';
import { getServiceHostName } from '../setting';

export async function getProjectList(
  params: {
    current?: number;
    pageSize?: number;
  },
  sort: Record<string, SortOrder>,
  name: string,
  star: boolean | null,
) {
  const sortBy = Object.keys(sort)[0];
  const orderBy = sort[sortBy]?.replace('end', '');
  return request<{
    data: Project[];
    total?: number;
    success?: boolean;
  }>(`${getServiceHostName()}/api/project/grid`, {
    method: 'GET',
    params: {
      ...params,
      sortBy,
      orderBy,
      name,
      star,
    },
  });
}

export async function getProject(id: number) {
  return request<Project>(`${getServiceHostName()}/api/project/get/${id}`, {
    method: 'GET',
  });
}

export async function updateProject(data?: Record<string, any>) {
  return request<string>(`${getServiceHostName()}/api/project/update`, {
    method: 'PUT',
    data,
  });
}

export async function createProject(data?: Record<string, any>) {
  return request<string>(`${getServiceHostName()}/api/project/create`, {
    method: 'POST',
    data,
  });
}

export async function starProject(id: number) {
  return request<string>(`${getServiceHostName()}/api/project/star/${id}`, {
    method: 'PUT',
  });
}

export async function deleteProject(id: number) {
  return request<string>(`${getServiceHostName()}/api/project/delete/${id}`, {
    method: 'DELETE',
  });
}
