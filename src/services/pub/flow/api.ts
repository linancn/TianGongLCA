import { getServiceHostName } from '@/services/setting';
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
  }>(`${getServiceHostName()}/api/pub/flow/getgrid`, {
    method: 'GET',
    params: {
      ...params,
      sortBy,
      orderBy,
    },
  });
}

export async function copyPubFlow(data?: Record<string, any>) {
  return request<string>(`${getServiceHostName()}/api/pub/flow/copy`, {
    method: 'PUT',
    data,
  });
}
