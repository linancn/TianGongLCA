import type { SortOrder } from 'antd/lib/table/interface';
import { request } from 'umi';
import { getServiceHostName } from '../setting';
import type { UnitGroup, UnitJson } from './data';

export async function getUnitGroupGrid(
  params: {
    current?: number;
    pageSize?: number;
  },
  sort: Record<string, SortOrder>,
  projectId: number,
  otherProject: boolean,
) {
  const sortBy = Object.keys(sort)[0];
  const orderBy = sort[sortBy]?.replace('end', '');
  return request<{
    data: UnitGroup[];
    total?: number;
    success?: boolean;
  }>(`${getServiceHostName()}/api/unitgroup/getgrid`, {
    method: 'GET',
    params: {
      ...params,
      sortBy,
      orderBy,
      projectId,
      otherProject,
    },
  });
}

export async function getUnitJsonGrid(
  params: {
    current?: number;
    pageSize?: number;
  },
  sort: Record<string, SortOrder>,
  projectId: number,
  unitGroupId: string,
) {
  const sortBy = Object.keys(sort)[0];
  const orderBy = sort[sortBy]?.replace('end', '');
  return request<{
    data: UnitJson[];
    total?: number;
    success?: boolean;
  }>(`${getServiceHostName()}/api/unitgroup/getunitjsongrid`, {
    method: 'GET',
    params: {
      ...params,
      sortBy,
      orderBy,
      projectId,
      unitGroupId,
    },
  });
}

export async function getUnitGroupByPkid(pkid: number) {
  return request<UnitGroup>(`${getServiceHostName()}/api/unitgroup/get/${pkid}`, {
    method: 'GET',
  });
}

export async function getUnitGroupById(projectId: number, id: string) {
  return request<UnitGroup>(`${getServiceHostName()}/api/unitgroup/get/${projectId}/${id}`, {
    method: 'GET',
  });
}

export async function createUnitGroup(data?: Record<string, any>) {
  return request<string>(`${getServiceHostName()}/api/unitgroup/create`, {
    method: 'POST',
    data,
  });
}

export async function updateUnitGroup(data?: Record<string, any>) {
  return request<string>(`${getServiceHostName()}/api/unitgroup/update`, {
    method: 'PUT',
    data,
  });
}

export async function copyUnitGroup(data?: Record<string, any>) {
  return request<string>(`${getServiceHostName()}/api/unitgroup/copy`, {
    method: 'PUT',
    data,
  });
}

export async function updateParentUnitGroup(
  parentType: string,
  parentPkid: number,
  unitGroupId: string,
) {
  return request<string>(`${getServiceHostName()}/api/${parentType}/updateunitgroup`, {
    method: 'PUT',
    data: {
      pkid: parentPkid,
      unitGroupId: unitGroupId,
    },
  });
}

export async function deleteUnitGroup(pkid: number) {
  return request<string>(`${getServiceHostName()}/api/unitgroup/delete/${pkid}`, {
    method: 'DELETE',
  });
}

export async function getUnitJson(projectId: number, unitGroupId: string, id: string) {
  return request<UnitJson>(
    `${getServiceHostName()}/api/unitgroup/getunitjson/${projectId}/${unitGroupId}/${id}`,
    {
      method: 'GET',
    },
  );
}

export async function createUnitJson(data?: Record<string, any>) {
  return request<string>(`${getServiceHostName()}/api/unitgroup/createunitjson`, {
    method: 'POST',
    data,
  });
}

export async function updateUnitJson(data?: Record<string, any>) {
  return request<string>(`${getServiceHostName()}/api/unitgroup/updateunitjson`, {
    method: 'PUT',
    data,
  });
}

export async function deleteUnitJson(data?: Record<string, any>) {
  return request<string>(`${getServiceHostName()}/api/unitgroup/deleteunitjson`, {
    method: 'DELETE',
    data,
  });
}
