import type { SortOrder } from 'antd/lib/table/interface';
import { request } from 'umi';
import { getServiceHostName } from '../setting';
import type { Category } from './data';

export async function getCategoryGrid(
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
    data: Category[];
    total?: number;
    success?: boolean;
  }>(`${getServiceHostName()}/api/category/getgrid`, {
    method: 'GET',
    params: {
      ...params,
      sortBy,
      orderBy,
      projectId,
    },
  });
}

export async function createCategory(data?: Record<string, any>) {
  return request<string>(`${getServiceHostName()}/api/category/create`, {
    method: 'POST',
    data,
  });
}

export async function updateCategory(data?: Record<string, any>) {
  return request<string>(`${getServiceHostName()}/api/category/update`, {
    method: 'PUT',
    data,
  });
}

export async function updateParentCategory(
  parentType: string,
  projectId: number,
  parentId: string,
  categoryId: string,
) {
  return request<string>(`${getServiceHostName()}/api/${parentType}/updatecategory`, {
    method: 'PUT',
    data: {
      projectId,
      parentId,
      categoryId,
    },
  });
}

export async function getCategoryById(projectId: number, id: string) {
  return request<Category>(`${getServiceHostName()}/api/category/get/${projectId}/${id}`, {
    method: 'GET',
  });
}

export async function getCategoryByPkid(pkid: number) {
  return request<Category>(`${getServiceHostName()}/api/category/get/${pkid}`, {
    method: 'GET',
  });
}

export async function deleteCategory(pkid: number) {
  return request<string>(`${getServiceHostName()}/api/category/delete/${pkid}`, {
    method: 'DELETE',
  });
}
