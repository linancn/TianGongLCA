import type { SortOrder } from 'antd/lib/table/interface';
import { request } from 'umi';
import type { PubFlowProperty } from './data';

export async function getPubFlowPropertyGrid(
  params: {
    current?: number;
    pageSize?: number;
  },
  sort: Record<string, SortOrder>,
) {
  const sortBy = Object.keys(sort)[0];
  const orderBy = sort[sortBy]?.replace('end', '');
  return request<{
    data: PubFlowProperty[];
    total?: number;
    success?: boolean;
  }>('http://localhost:8081/api/pub/flowproperty/getgrid', {
    method: 'GET',
    params: {
      ...params,
      sortBy,
      orderBy,
    },
  });
}

export async function copyPubFlowProperty(data?: Record<string, any>) {
  return request<string>('http://localhost:8081/api/pub/flowproperty/copy', {
    method: 'PUT',
    data,
  });
}
