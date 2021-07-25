// @ts-ignore
/* eslint-disable */
import { request } from 'umi';
import { TableListItem } from 'mock/plan/table.d';
import { SortOrder } from 'antd/lib/table/interface';

/** 获取规则列表 GET /api/rule */
export async function rule(
  params: {
    current?: number;
    pageSize?: number;
  },
  sort: Record<string, SortOrder>,
  // filter: Record<string, React.ReactText[] | null>,
  options?: { [key: string]: any },
) {
  console.log(params, sort);
  return request<{
    data: TableListItem[];
    total?: number;
    success?: boolean;
  }>('/api/planrule', {
    method: 'GET',
    params: {
      ...params,
      sort,
    },
    ...(options || {}),
  });
}

/** 新建规则 PUT /api/rule */
export async function updateRule(options?: { [key: string]: any }) {
  return request<TableListItem>('/api/rule', {
    method: 'PUT',
    ...(options || {}),
  });
}

/** 新建规则 POST /api/rule */
export async function addRule(options?: { [key: string]: any }) {
  return request<TableListItem>('/api/rule', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 删除规则 DELETE /api/rule */
export async function removeRule(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/rule', {
    method: 'DELETE',
    ...(options || {}),
  });
}
