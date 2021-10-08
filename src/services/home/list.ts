import { request } from 'umi';

export async function getOK() {
  return request<any>('http://localhost:8081/api/home/ok', {
    method: 'GET',
  });
}
