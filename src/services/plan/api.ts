import { request } from 'umi';
import type { PlanInfo, PlanModel, PlanModelFlow, PlanModelProcess } from './data';
import type { SortOrder } from 'antd/lib/table/interface';
import { getServiceHostName } from '../setting';

export async function getPlanGrid(
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
    data: PlanInfo[];
    total?: number;
    success?: boolean;
  }>(`${getServiceHostName()}/api/plan/getgrid`, {
    method: 'GET',
    params: {
      ...params,
      sortBy,
      orderBy,
      projectId,
    },
  });
}

export async function getPlanParentGrid(
  params: {
    current?: number;
    pageSize?: number;
  },
  sort: Record<string, SortOrder>,
  projectId: number,
  id: string,
) {
  const sortBy = Object.keys(sort)[0];
  const orderBy = sort[sortBy]?.replace('end', '');
  return request<{
    data: PlanInfo[];
    total?: number;
    success?: boolean;
  }>(`${getServiceHostName()}/api/plan/getparentgrid`, {
    method: 'GET',
    params: {
      ...params,
      sortBy,
      orderBy,
      projectId,
      id,
    },
  });
}

export async function getPlanModelFlowGrid(
  params: {
    current?: number;
    pageSize?: number;
  },
  sort: Record<string, SortOrder>,
  projectId: number,
  planId: string,
  edgeSourceId: string,
  edgeTargetId: string,
  planSourceId: string,
  planTargetId: string,
  processSourceId: string,
  processTargetId: string,
) {
  const sortBy = Object.keys(sort)[0];
  const orderBy = sort[sortBy]?.replace('end', '');
  return request<{
    data: PlanModelFlow[];
    total?: number;
    success?: boolean;
  }>(`${getServiceHostName()}/api/plan/getmodelflowgrid`, {
    method: 'POST',
    data: {
      ...params,
      sortBy,
      orderBy,
      projectId,
      planId,
      edgeSourceId,
      edgeTargetId,
      planSourceId,
      planTargetId,
      processSourceId,
      processTargetId,
    },
  });
}

export async function getPlanModelProcessGrid(
  params: {
    current?: number;
    pageSize?: number;
  },
  sort: Record<string, SortOrder>,
  projectId: number,
  planId: string,
  edgeSourceId: string,
  edgeTargetId: string,
) {
  const sortBy = Object.keys(sort)[0];
  const orderBy = sort[sortBy]?.replace('end', '');
  return request<{
    data: PlanModelProcess[];
    total?: number;
    success?: boolean;
  }>(`${getServiceHostName()}/api/plan/getmodelprocessgrid`, {
    method: 'POST',
    data: {
      ...params,
      sortBy,
      orderBy,
      projectId,
      planId,
      edgeSourceId,
      edgeTargetId,
    },
  });
}

export async function getPlanById(projectId: number, id: string) {
  return request<PlanInfo>(`${getServiceHostName()}/api/plan/get/${projectId}/${id}`, {
    method: 'GET',
  });
}

export async function getPlanByPkid(pkid: number) {
  return request<PlanInfo>(`${getServiceHostName()}/api/plan/get/${pkid}`, {
    method: 'GET',
  });
}

export async function updatePlan(data?: Record<string, any>) {
  return request<string>(`${getServiceHostName()}/api/plan/update`, {
    method: 'PUT',
    data,
  });
}

export async function getPlanModelCells(projectId: number, id: string) {
  return request<PlanModel>(`${getServiceHostName()}/api/plan/getmodelcells/${projectId}/${id}`, {
    method: 'GET',
  });
}

export async function updatePlanModelCells(data?: Record<string, any>) {
  return request<string>(`${getServiceHostName()}/api/plan/updatemodelcells`, {
    method: 'PUT',
    data,
  });
}

export async function createPlanModelFlow(data?: Record<string, any>) {
  return request<string>(`${getServiceHostName()}/api/plan/createmodelflow`, {
    method: 'POST',
    data,
  });
}

export async function deletePlanModelFlow(data?: Record<string, any>) {
  return request<string>(`${getServiceHostName()}/api/plan/deletemodelflow`, {
    method: 'DELETE',
    data,
  });
}

export async function deletePlanModelFlowByProcess(data?: Record<string, any>) {
  return request<string>(`${getServiceHostName()}/api/plan/deletemodelflowbyprocess`, {
    method: 'DELETE',
    data,
  });
}

export async function getPlanParentCount(projectId: number, id: string) {
  return request<number>(`${getServiceHostName()}/api/plan/getparentcount/${projectId}/${id}`, {
    method: 'GET',
  });
}

export async function getPlanModelNodeTree(projectId: number, id: string) {
  return request<any>(`${getServiceHostName()}/api/plan/getmodelnodetree/${projectId}/${id}`, {
    method: 'GET',
  });
}

export async function createPlan(data?: Record<string, any>) {
  return request<string>(`${getServiceHostName()}/api/plan/create`, {
    method: 'POST',
    data,
  });
}

export async function deletePlan(pkid: number) {
  return request<string>(`${getServiceHostName()}/api/plan/delete/${pkid}`, {
    method: 'DELETE',
  });
}
