import { request } from 'umi';
import type { UslciFlow } from './data';
import type { SortOrder } from 'antd/lib/table/interface';

export async function getUslciFlowGrid(
  params: {
    current?: number;
    pageSize?: number;
  },
  sort: Record<string, SortOrder>,
) {
  const sortBy = Object.keys(sort)[0];
  const orderBy = sort[sortBy]?.replace('end', '');
  return request<{
    data: UslciFlow[];
    total?: number;
    success?: boolean;
  }>('http://localhost:8081/api/uslciflow/getgrid', {
    method: 'GET',
    params: {
      ...params,
      sortBy,
      orderBy,
    },
  });
}

export async function getUslciFlowByPkid(pkid: string) {
  return request<UslciFlow>(`http://localhost:8081/api/uslciflow/get/${pkid}`, {
    method: 'GET',
  });
}
