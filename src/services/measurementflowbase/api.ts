import { request } from 'umi';
import type { MeasurementFlowBase } from './data';
import type { SortOrder } from 'antd/lib/table/interface';

export async function getMeasurementFlowBaseGrid(
  params: {
    current?: number;
    pageSize?: number;
  },
  sort: Record<string, SortOrder>,
  projectId: number,
  flowBaseId: string,
) {
  const sortBy = Object.keys(sort)[0];
  const orderBy = sort[sortBy]?.replace('end', '');
  return request<{
    data: MeasurementFlowBase[];
    total?: number;
    success?: boolean;
  }>('http://localhost:8081/api/measurementflowbase/getgrid', {
    method: 'GET',
    params: {
      ...params,
      sortBy,
      orderBy,
      projectId,
      flowBaseId,
    },
  });
}

export async function getMeasurementFlowBaseById(projectId: number, id: string) {
  return request<MeasurementFlowBase>(
    `http://localhost:8081/api/measurementflowbase/get/${projectId}/${id}`,
    {
      method: 'GET',
    },
  );
}

export async function getMeasurementFlowBaseByPkid(pkid: number) {
  return request<MeasurementFlowBase>(`http://localhost:8081/api/measurementflowbase/get/${pkid}`, {
    method: 'GET',
  });
}
