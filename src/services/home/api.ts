import { request } from 'umi';
import { getServiceHostName } from '../setting';

export async function getOK() {
  return request<any>(`${getServiceHostName()}/api/home/ok`, {
    method: 'GET',
  });
}
