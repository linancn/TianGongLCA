import type { SortOrder } from 'antd/lib/table/interface';
import { request } from 'umi';
import type { PubProcess } from './data';

export async function getPubProcessGrid(
  params: {
    current?: number;
    pageSize?: number;
  },
  sort: Record<string, SortOrder>,
) {
  const sortBy = Object.keys(sort)[0];
  const orderBy = sort[sortBy]?.replace('end', '');
  return request<{
    data: PubProcess[];
    total?: number;
    success?: boolean;
  }>('http://localhost:8081/api/pub/process/getgrid', {
    method: 'GET',
    params: {
      ...params,
      sortBy,
      orderBy,
    },
  });
}

export async function copyPubProcess(data?: Record<string, any>) {
  return request<string>('http://localhost:8081/api/pub/process/copy', {
    method: 'PUT',
    data,
  });
}
