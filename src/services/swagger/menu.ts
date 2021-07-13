import { request } from 'umi';

export async function queryHomeMenuData() {
  return request<any>('/api/homemenudata');
}

export async function queryTestMenuData() {
  return request<any>('/api/testmenudata');
}
