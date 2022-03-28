import type { SortOrder } from 'antd/lib/table/interface';
import { request } from 'umi';
import type { PubFlow } from './data';

export async function getPubFlowGrid(
  params: {
    current?: number;
    pageSize?: number;
  },
  sort: Record<string, SortOrder>,
) {
  const sortBy = Object.keys(sort)[0];
  const orderBy = sort[sortBy]?.replace('end', '');
  return request<{
    data: PubFlow[];
    total?: number;
    success?: boolean;
  }>('http://localhost:8081/api/pub/flow/getgrid', {
    method: 'GET',
    params: {
      ...params,
      sortBy,
      orderBy,
    },
  });
}

export async function copyPubFlow(data?: Record<string, any>) {
  return request<string>('http://localhost:8081/api/pub/flow/copy', {
    method: 'PUT',
    data,
  });
}
