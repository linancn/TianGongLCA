import { request } from 'umi';

import { getServiceHostName } from '../setting';
export async function login(data?: Record<string, any>) {
  return request<string>(`${getServiceHostName()}/api/user/login`, {
    method: 'PUT',
    data,
  });
}
