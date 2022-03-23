import { request } from 'umi';
import type { PlanInfo, PlanModel, PlanModelFlow } from './data';
import type { SortOrder } from 'antd/lib/table/interface';

export async function getPlanInfoGrid(
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
  }>('http://localhost:8081/api/plan/getgrid', {
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
  }>('http://localhost:8081/api/plan/getparentgrid', {
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
  sourceNodeId: string,
  targetNodeId: string,
) {
  const sortBy = Object.keys(sort)[0];
  const orderBy = sort[sortBy]?.replace('end', '');
  return request<{
    data: PlanModelFlow[];
    total?: number;
    success?: boolean;
  }>('http://localhost:8081/api/plan/getmodelflowgrid', {
    method: 'GET',
    params: {
      ...params,
      sortBy,
      orderBy,
      projectId,
      planId,
      sourceNodeId,
      targetNodeId,
    },
  });
}

export async function getPlanInfo(projectId: number, id: string) {
  return request<PlanInfo>(`http://localhost:8081/api/plan/getinfo/${projectId}/${id}`, {
    method: 'GET',
  });
}

export async function getPlanInfoByPkid(pkid: number) {
  return request<PlanInfo>(`http://localhost:8081/api/plan/getinfo/${pkid}`, {
    method: 'GET',
  });
}

export async function updatePlanInfo(data?: Record<string, any>) {
  return request<string>('http://localhost:8081/api/plan/updateinfo', {
    method: 'PUT',
    data,
  });
}

export async function getPlanModelCells(projectId: number, id: string) {
  return request<PlanModel>(`http://localhost:8081/api/plan/getmodelcells/${projectId}/${id}`, {
    method: 'GET',
  });
}

export async function updatePlanModelCells(data?: Record<string, any>) {
  return request<string>('http://localhost:8081/api/plan/updatemodelcells', {
    method: 'PUT',
    data,
  });
}

export async function createPlanModelFlow(data?: Record<string, any>) {
  return request<string>('http://localhost:8081/api/plan/createmodelflow', {
    method: 'POST',
    data,
  });
}

export async function getPlanParentCount(projectId: number, id: string) {
  return request<number>(`http://localhost:8081/api/plan/getparentcount/${projectId}/${id}`, {
    method: 'GET',
  });
}

export async function createPlan(data?: Record<string, any>) {
  return request<string>('http://localhost:8081/api/plan/create', {
    method: 'POST',
    data,
  });
}

export async function deletePlan(pkid: number) {
  return request<string>(`http://localhost:8081/api/plan/delete/${pkid}`, {
    method: 'DELETE',
  });
}
