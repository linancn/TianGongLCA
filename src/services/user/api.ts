import { request } from 'umi';
import type { SortOrder } from 'antd/lib/table/interface';
import { getServiceHostName } from '../setting';
import type { LoginParams, User } from './data';

/** 登录*/
export async function login(data: LoginParams) {
  return request<any>(`${getServiceHostName()}/api/user/login`, {
    method: 'POST',
    data: data,
  });
}

/** 获取当前的用户*/
export async function currentUser() {
  return request<User>(`${getServiceHostName()}/api/user/current`, {
    method: 'POST',
  });
}

/** 退出登录*/
export async function logout() {
  localStorage.removeItem('token');
  return request<any>(`${getServiceHostName()}/api/user/logout`, {
    method: 'GET',
  });
}

/** 查询列表*/
export async function getUserGrid(
  params: {
    current?: number;
    pageSize?: number;
  },
  sort: Record<string, SortOrder>,
) {
  const sortBy = Object.keys(sort)[0];
  const orderBy = sort[sortBy]?.replace('end', '');
  return request<{
    data: User[];
    total?: number;
    success?: boolean;
  }>(`${getServiceHostName()}/api/user/grid`, {
    method: 'GET',
    params: {
      ...params,
      sortBy,
      orderBy,
    },
  });
}

export async function getUserById(id: number) {
  return request<User>(`${getServiceHostName()}/api/user/get/${id}`, {
    method: 'GET',
  });
}

export async function createUser(data?: Record<string, any>) {
  return request<string>(`${getServiceHostName()}/api/user/create`, {
    method: 'POST',
    data,
  });
}

export async function updateUser(data?: Record<string, any>) {
  return request<string>(`${getServiceHostName()}/api/user/update`, {
    method: 'PUT',
    data,
  });
}

export async function deleteUser(id: number) {
  return request<string>(`${getServiceHostName()}/api/user/delete`, {
    method: 'PUT',
    id,
  });
}
