import { getServiceHostName } from '@/services/setting';
import type { SortOrder } from 'antd/lib/table/interface';
import { request } from 'umi';
import type { PubUnitGroup } from './data';

export async function getPubUnitGroupGrid(
  params: {
    current?: number;
    pageSize?: number;
  },
  sort: Record<string, SortOrder>,
) {
  const sortBy = Object.keys(sort)[0];
  const orderBy = sort[sortBy]?.replace('end', '');
  return request<{
    data: PubUnitGroup[];
    total?: number;
    success?: boolean;
  }>(`${getServiceHostName()}/api/pub/unitgroup/getgrid`, {
    method: 'GET',
    params: {
      ...params,
      sortBy,
      orderBy,
    },
  });
}

export async function copyPubUnitGroup(data?: Record<string, any>) {
  return request<string>(`${getServiceHostName()}/api/pub/unitgroup/copy`, {
    method: 'PUT',
    data,
  });
}
