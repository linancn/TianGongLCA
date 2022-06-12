import { request } from 'umi';

import { getServiceHostName } from '../setting';

/** 登录*/
export async function login(data: API.LoginParams) {
  localStorage.removeItem('islogin');
  return request<string>(`${getServiceHostName()}/api/user/login`, {
    method: 'PUT',
    data: data,
  });
}

/** 获取当前的用户*/
export async function currentUser() {
  return request<API.CurrentUser>(`${getServiceHostName()}/api/user/currentUser`, {
    method: 'GET',
  });
}

/** 退出登录*/
export async function outLogin() {
  localStorage.removeItem('islogin');
}
