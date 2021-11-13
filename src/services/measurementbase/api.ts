import { request } from 'umi';
import type { MeasurementBase } from './data';
import type { SortOrder } from 'antd/lib/table/interface';

export async function getMeasurementBaseGrid(
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
    data: MeasurementBase[];
    total?: number;
    success?: boolean;
  }>('http://localhost:8081/api/measurementbase/getgrid', {
    method: 'GET',
    params: {
      ...params,
      sortBy,
      orderBy,
      projectId,
    },
  });
}

export async function getMeasurementBaseById(projectId: number, id: string) {
  return request<MeasurementBase>(
    `http://localhost:8081/api/measurementbase/get/${projectId}/${id}`,
    {
      method: 'GET',
    },
  );
}
export async function getMeasurementBaseByPkid(pkid: number) {
  return request<MeasurementBase>(`http://localhost:8081/api/measurementbase/get/${pkid}`, {
    method: 'GET',
  });
}

export async function updateMeasurementBase(data?: Record<string, any>) {
  return request<string>('http://localhost:8081/api/measurementbase/update', {
    method: 'PUT',
    data,
  });
}

export async function createMeasurementBase(data?: Record<string, any>) {
  return request<string>('http://localhost:8081/api/measurementbase/create', {
    method: 'POST',
    data,
  });
}

export async function deleteMeasurementBase(pkid: number) {
  return request<string>(`http://localhost:8081/api/measurementbase/delete/${pkid}`, {
    method: 'DELETE',
  });
}
