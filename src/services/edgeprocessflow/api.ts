import { request } from 'umi';
import type { EdgeProcessFlow } from './data';
import type { SortOrder } from 'antd/lib/table/interface';

export async function getEdgeProcessFlowGrid(
  params: {
    current?: number;
    pageSize?: number;
  },
  sort: Record<string, SortOrder>,
  projectId: number,
  planId: string,
  sourceProcessId: string,
  targetProcessId: string,
) {
  const sortBy = Object.keys(sort)[0];
  const orderBy = sort[sortBy]?.replace('end', '');
  return request<{
    data: EdgeProcessFlow[];
    total?: number;
    success?: boolean;
  }>('http://localhost:8081/api/edgeprocessflow/getgrid', {
    method: 'GET',
    params: {
      ...params,
      sortBy,
      orderBy,
      projectId,
      planId,
      sourceProcessId,
      targetProcessId,
    },
  });
}

export async function getEdgeProcessFlow(pkid: number) {
  return request<EdgeProcessFlow>(`http://localhost:8081/api/edgeprocessflow/get/${pkid}`, {
    method: 'GET',
  });
}
