import type { SortOrder } from 'antd/lib/table/interface';
import { request } from 'umi';
import type { UnitGroup, UnitJson } from './data';

export async function getUnitGroupGrid(
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
    data: UnitGroup[];
    total?: number;
    success?: boolean;
  }>('http://localhost:8081/api/unitgroup/getgrid', {
    method: 'GET',
    params: {
      ...params,
      sortBy,
      orderBy,
      projectId,
    },
  });
}

export async function getUnitJsonGrid(
  params: {
    current?: number;
    pageSize?: number;
  },
  sort: Record<string, SortOrder>,
  unitGroupPkid: number,
) {
  const sortBy = Object.keys(sort)[0];
  const orderBy = sort[sortBy]?.replace('end', '');
  return request<{
    data: UnitJson[];
    total?: number;
    success?: boolean;
  }>('http://localhost:8081/api/unitgroup/getunitjsongrid', {
    method: 'GET',
    params: {
      ...params,
      sortBy,
      orderBy,
      unitGroupPkid,
    },
  });
}

export async function getUnitGroupByPkid(pkid: number) {
  return request<UnitGroup>(`http://localhost:8081/api/unitgroup/get/${pkid}`, {
    method: 'GET',
  });
}

export async function getUnitGroupById(projectId: number, id: string) {
  return request<UnitGroup>(`http://localhost:8081/api/unitgroup/get/${projectId}/${id}`, {
    method: 'GET',
  });
}

export async function createUnitGroup(data?: Record<string, any>) {
  return request<string>('http://localhost:8081/api/unitgroup/create', {
    method: 'POST',
    data,
  });
}

export async function updateUnitGroup(data?: Record<string, any>) {
  return request<string>('http://localhost:8081/api/unitgroup/update', {
    method: 'PUT',
    data,
  });
}

export async function updateParentUnitGroup(
  parentType: string,
  parentPkid: number,
  unitGroupId: string,
) {
  return request<string>(`http://localhost:8081/api/${parentType}/updateunitgroup`, {
    method: 'PUT',
    data: {
      pkid: parentPkid,
      unitGroupId: unitGroupId,
    },
  });
}

export async function deleteUnitGroup(pkid: number) {
  return request<string>(`http://localhost:8081/api/unitgroup/delete/${pkid}`, {
    method: 'DELETE',
  });
}

export async function getUnitJson(unitGroupPkid: number, id: string) {
  return request<UnitJson>(
    `http://localhost:8081/api/unitgroup/getunitjson/${unitGroupPkid}/${id}`,
    {
      method: 'GET',
    },
  );
}

export async function createUnitJson(data?: Record<string, any>) {
  return request<string>('http://localhost:8081/api/unitgroup/createunitjson', {
    method: 'POST',
    data,
  });
}

export async function updateUnitJson(data?: Record<string, any>) {
  return request<string>('http://localhost:8081/api/unitgroup/updateunitjson', {
    method: 'PUT',
    data,
  });
}

export async function deleteUnitJson(unitGroupPkid: number, id: string) {
  return request<string>(
    `http://localhost:8081/api/unitgroup/deleteunitjson/${unitGroupPkid}/${id}`,
    {
      method: 'DELETE',
    },
  );
}
