import type { SortOrder } from 'antd/lib/table/interface';
import { request } from 'umi';
import type { Location } from './data';

export async function getLocationGrid(
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
    data: Location[];
    total?: number;
    success?: boolean;
  }>('http://localhost:8081/api/location/getgrid', {
    method: 'GET',
    params: {
      ...params,
      sortBy,
      orderBy,
      projectId,
    },
  });
}

export async function createLocation(data?: Record<string, any>) {
  return request<string>('http://localhost:8081/api/location/create', {
    method: 'POST',
    data,
  });
}

export async function updateLocation(data?: Record<string, any>) {
  return request<string>('http://localhost:8081/api/location/update', {
    method: 'PUT',
    data,
  });
}

export async function updateParentLocation(
  parentType: string,
  parentPkid: number,
  locationId: string,
) {
  return request<string>(`http://localhost:8081/api/${parentType}/updatelocation`, {
    method: 'PUT',
    data: {
      pkid: parentPkid,
      locationId: locationId,
    },
  });
}

export async function getLocationById(projectId: number, id: string) {
  return request<Location>(`http://localhost:8081/api/location/get/${projectId}/${id}`, {
    method: 'GET',
  });
}

export async function getLocationByPkid(pkid: number) {
  return request<Location>(`http://localhost:8081/api/location/get/${pkid}`, {
    method: 'GET',
  });
}

export async function deleteLocation(pkid: number) {
  return request<string>(`http://localhost:8081/api/location/delete/${pkid}`, {
    method: 'DELETE',
  });
}
