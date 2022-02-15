import { request } from 'umi';
import type { FlowsView } from './data';
import type { SortOrder } from 'antd/lib/table/interface';

export async function getFlowsViewGrid(
  params: {
    current?: number;
    pageSize?: number;
  },
  sort: Record<string, SortOrder>,
  projectId: number,
) {
  const sortBy = Object.keys(sort)[0];
  const orderBy = sort[sortBy]?.replace('end', '');
  return request<{
    data: FlowsView[];
    total?: number;
    success?: boolean;
  }>('http://localhost:8081/api/flowsview/getgrid', {
    method: 'GET',
    params: {
      ...params,
      sortBy,
      orderBy,
      projectId,
    },
  });
}

export async function getFlowsViewById(projectId: number, id: string) {
  return request<FlowsView>(`http://localhost:8081/api/flowview/get/${projectId}/${id}`, {
    method: 'GET',
  });
}

export async function getFlowsViewByPkid(pkid: number) {
  return request<FlowsView>(`http://localhost:8081/api/flowview/get/${pkid}`, {
    method: 'GET',
  });
}
