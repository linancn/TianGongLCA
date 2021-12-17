import { request } from 'umi';
import type { UslciProcess } from './data';
import type { SortOrder } from 'antd/lib/table/interface';

export async function getUslciProcessGrid(
  params: {
    current?: number;
    pageSize?: number;
  },
  sort: Record<string, SortOrder>,
) {
  const sortBy = Object.keys(sort)[0];
  const orderBy = sort[sortBy]?.replace('end', '');
  return request<{
    data: UslciProcess[];
    total?: number;
    success?: boolean;
  }>('http://localhost:8081/api/uslciprocess/getgrid', {
    method: 'GET',
    params: {
      ...params,
      sortBy,
      orderBy,
    },
  });
}

export async function getUslciProcessByPkid(pkid: string) {
  return request<UslciProcess>(`http://localhost:8081/api/uslciprocess/get/${pkid}`, {
    method: 'GET',
  });
}
