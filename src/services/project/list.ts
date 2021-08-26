// @ts-ignore
/* eslint-disable */
import { request } from 'umi';
import { ProjectListItem } from 'mock/project/list.d';
import { SortOrder } from 'antd/lib/table/interface';

/** 获取规则列表 GET /api/project */
export async function getProjectList(
  params: {
    current?: number;
    pageSize?: number;
  },
  sort: Record<string, SortOrder>,
  // filter: Record<string, React.ReactText[] | null>,
  filterByname: string,
  // options?: { [key: string]: any },
) {
  const sortBy = Object.keys(sort)[0];
  const orderBy = sort[sortBy]?.replace('end', '');
  return request<{
    data: ProjectListItem[];
    total?: number;
    success?: boolean;
  }>('http://localhost:8081/api/project/list', {
    method: 'GET',
    params: {
      ...params,
      sortBy,
      orderBy,
      filterByname,
    },
    // ...(options || {}),
  });
}

/** PUT /api/project */
export async function updateProject(options?: { [key: string]: any }) {
  return request<ProjectListItem>('/api/project', {
    method: 'PUT',
    ...(options || {}),
  });
}

/** POST /api/project */
export async function addProject(data?: { [key: string]: any }) {
  return request<ProjectListItem>('http://localhost:8081/api/project/add', {
    method: 'POST',
    data: data,
  });
}
/** Put /api/project */
export async function flagProject(id: number) {
  return request<ProjectListItem>('http://localhost:8081/api/project/flag/' + id, {
    method: 'PUT',
  });
}
/** Delete /api/project */
export async function deleteProject(id: number) {
  return request<ProjectListItem>('http://localhost:8081/api/project/delete/' + id, {
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
  data?: { [key: string]: any },
) {
  return request('http://localhost:8081/api/project/cardlist', {
    method: 'GET',
    params: {
      ...params,
      sort,
      searchvalue,
    },
    data: data,
  });
}
/** DELETE /api/project */
export async function removeProject(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/project', {
    method: 'DELETE',
    ...(options || {}),
  });
}
