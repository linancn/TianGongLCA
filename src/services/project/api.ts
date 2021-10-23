import { request } from 'umi';
import type { ProjectListItem } from './data';
import type { SortOrder } from 'antd/lib/table/interface';

export async function getProjectList(
  params: {
    current?: number;
    pageSize?: number;
  },
  sort: Record<string, SortOrder>,
  // filter: Record<string, React.ReactText[] | null>,
  name: string,
  // options?: { [key: string]: any },
) {
  const sortBy = Object.keys(sort)[0];
  const orderBy = sort[sortBy]?.replace('end', '');
  return request<{
    data: ProjectListItem[];
    total?: number;
    success?: boolean;
  }>('http://localhost:8081/api/project/grid', {
    method: 'GET',
    params: {
      ...params,
      sortBy,
      orderBy,
      name,
    },
    // ...(options || {}),
  });
}

/** PUT /api/project */
export async function updateProject(options?: Record<string, any>) {
  return request<ProjectListItem>('/api/project', {
    method: 'PUT',
    ...(options || {}),
  });
}

/** POST /api/project */
export async function creatProject(data?: Record<string, any>) {
  return request<ProjectListItem>('http://localhost:8081/api/project/creat', {
    method: 'POST',
    data,
  });
}
/** Put /api/project */
export async function starProject(id: number) {
  return request<ProjectListItem>(`http://localhost:8081/api/project/starred/${id}`, {
    method: 'PUT',
  });
}
/** Delete /api/project */
export async function deleteProject(id: number) {
  return request<ProjectListItem>(`http://localhost:8081/api/project/delete/${id}`, {
    method: 'DELETE',
  });
}

export async function getProjectCardList(
  params: {
    current?: number;
    pageSize?: number;
  },
  sort: Record<string, SortOrder>,
  // filter: Record<string, React.ReactText[] | null>,
  searchvalue: string,
  data?: Record<string, any>,
) {
  return request('http://localhost:8081/api/project/cardlist', {
    method: 'GET',
    params: {
      ...params,
      sort,
      searchvalue,
    },
    data,
  });
}
/** DELETE /api/project */
export async function removeProject(options?: Record<string, any>) {
  return request<Record<string, any>>('/api/project', {
    method: 'DELETE',
    ...(options || {}),
  });
}
