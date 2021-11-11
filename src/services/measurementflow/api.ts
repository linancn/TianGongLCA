import { request } from 'umi';
import type { MeasurementFlow } from './data';
import type { SortOrder } from 'antd/lib/table/interface';

export async function getMeasurementFlowGrid(
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
    data: MeasurementFlow[];
    total?: number;
    success?: boolean;
  }>('http://localhost:8081/api/measurementflow/getgrid', {
    method: 'GET',
    params: {
      ...params,
      sortBy,
      orderBy,
      projectId,
    },
  });
}

export async function getMeasurementFlow(pkid: number) {
  return request<MeasurementFlow>(`http://localhost:8081/api/measurementflow/get/${pkid}`, {
    method: 'GET',
  });
}

export async function updateMeasurementFlow(data?: Record<string, any>) {
  return request<string>('http://localhost:8081/api/measurementflow/update', {
    method: 'PUT',
    data,
  });
}

export async function createMeasurementFlow(data?: Record<string, any>) {
  return request<string>('http://localhost:8081/api/measurementflow/create', {
    method: 'POST',
    data,
  });
}

export async function deleteMeasurementFlow(pkid: number) {
  return request<string>(`http://localhost:8081/api/measurementflow/delete/${pkid}`, {
    method: 'DELETE',
  });
}
