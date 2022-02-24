import type { SortOrder } from 'antd/lib/table/interface';
import { request } from 'umi';
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
  }>('http://localhost:8081/api/category/getgrid', {
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
  return request<string>('http://localhost:8081/api/category/create', {
    method: 'POST',
    data,
  });
}

export async function updateCategory(data?: Record<string, any>) {
  return request<string>('http://localhost:8081/api/category/update', {
    method: 'PUT',
    data,
  });
}

export async function updateParentCategory(
  parentType: string,
  parentPkid: number,
  categoryId: string,
) {
  return request<string>(`http://localhost:8081/api/${parentType}/updatecategory`, {
    method: 'PUT',
    data: {
      pkid: parentPkid,
      categoryId: categoryId,
    },
  });
}

export async function getCategoryById(projectId: number, id: string) {
  return request<Category>(`http://localhost:8081/api/category/get/${projectId}/${id}`, {
    method: 'GET',
  });
}

export async function getCategoryByPkid(pkid: number) {
  return request<Category>(`http://localhost:8081/api/category/get/${pkid}`, {
    method: 'GET',
  });
}

export async function deleteCategory(pkid: number) {
  return request<string>(`http://localhost:8081/api/category/delete/${pkid}`, {
    method: 'DELETE',
  });
}
