import type { SortOrder } from 'antd/lib/table/interface';
import { request } from 'umi';
import { getServiceHostName } from '../setting';
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
  }>(`${getServiceHostName()}/api/location/getgrid`, {
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
  return request<string>(`${getServiceHostName()}/api/location/create`, {
    method: 'POST',
    data,
  });
}

export async function updateLocation(data?: Record<string, any>) {
  return request<string>(`${getServiceHostName()}/api/location/update`, {
    method: 'PUT',
    data,
  });
}

export async function updateParentLocation(
  parentType: string,
  projectId: number,
  parentId: string,
  locationId: string,
) {
  return request<string>(`${getServiceHostName()}/api/${parentType}/updatelocation`, {
    method: 'PUT',
    data: {
      projectId,
      parentId,
      locationId,
    },
  });
}

export async function getLocationById(projectId: number, id: string) {
  return request<Location>(`${getServiceHostName()}/api/location/get/${projectId}/${id}`, {
    method: 'GET',
  });
}

export async function getLocationByPkid(pkid: number) {
  return request<Location>(`${getServiceHostName()}/api/location/get/${pkid}`, {
    method: 'GET',
  });
}

export async function deleteLocation(pkid: number) {
  return request<string>(`${getServiceHostName()}/api/location/delete/${pkid}`, {
    method: 'DELETE',
  });
}
