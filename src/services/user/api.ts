import { request } from 'umi';

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
