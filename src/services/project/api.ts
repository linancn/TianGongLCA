import { request } from 'umi';
import type { Project } from './data';
import type { SortOrder } from 'antd/lib/table/interface';

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
  }>('http://localhost:8081/api/project/grid', {
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
  return request<Project>(`http://localhost:8081/api/project/get/${id}`, {
    method: 'GET',
  });
}

export async function updateProject(data?: Record<string, any>) {
  return request<string>('http://localhost:8081/api/project/update', {
    method: 'PUT',
    data,
  });
}

export async function createProject(data?: Record<string, any>) {
  return request<string>('http://localhost:8081/api/project/create', {
    method: 'POST',
    data,
  });
}

export async function starProject(id: number) {
  return request<string>(`http://localhost:8081/api/project/star/${id}`, {
    method: 'PUT',
  });
}

export async function deleteProject(id: number) {
  return request<string>(`http://localhost:8081/api/project/delete/${id}`, {
    method: 'DELETE',
  });
}
