import { request } from 'umi';
import type { ExchangeJson, ParameterJson, Process } from './data';
import type { SortOrder } from 'antd/lib/table/interface';
import { getServiceHostName } from '../setting';

export async function getProcessGrid(
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
    data: Process[];
    total?: number;
    success?: boolean;
  }>(`${getServiceHostName()}/api/process/getgrid`, {
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

export async function getParameterJsonGrid(
  params: {
    current?: number;
    pageSize?: number;
  },
  sort: Record<string, SortOrder>,
  projectId: number,
  processId: string,
) {
  const sortBy = Object.keys(sort)[0];
  const orderBy = sort[sortBy]?.replace('end', '');
  return request<{
    data: ParameterJson[];
    total?: number;
    success?: boolean;
  }>(`${getServiceHostName()}/api/process/getparameterjsongrid`, {
    method: 'GET',
    params: {
      ...params,
      sortBy,
      orderBy,
      projectId,
      processId,
    },
  });
}

export async function getExchangeJsonGrid(
  params: {
    current?: number;
    pageSize?: number;
  },
  sort: Record<string, SortOrder>,
  projectId: number,
  processId: string,
  input: boolean,
) {
  const sortBy = Object.keys(sort)[0];
  const orderBy = sort[sortBy]?.replace('end', '');
  return request<{
    data: ExchangeJson[];
    total?: number;
    success?: boolean;
  }>(`${getServiceHostName()}/api/process/getexchangejsongrid`, {
    method: 'GET',
    params: {
      ...params,
      sortBy,
      orderBy,
      projectId,
      processId,
      input,
    },
  });
}

export async function getProcessById(projectId: number, id: string) {
  return request<Process>(`${getServiceHostName()}/api/process/get/${projectId}/${id}`, {
    method: 'GET',
  });
}

export async function getProcessByPkid(pkid: number) {
  return request<Process>(`${getServiceHostName()}/api/process/get/${pkid}`, {
    method: 'GET',
  });
}

export async function updateProcess(data?: Record<string, any>) {
  return request<string>(`${getServiceHostName()}/api/process/update`, {
    method: 'PUT',
    data,
  });
}

// export async function getParentCount(projectId: number, id: string) {
//   return request<number>(`http://localhost:8081/api/process/getparentcount/${projectId}/${id}`, {
//     method: 'GET',
//   });
// }

export async function createProcess(data?: Record<string, any>) {
  return request<string>(`${getServiceHostName()}/api/process/create`, {
    method: 'POST',
    data,
  });
}

export async function deleteProcess(pkid: number) {
  return request<string>(`${getServiceHostName()}/api/process/delete/${pkid}`, {
    method: 'DELETE',
  });
}

export async function getParameterJson(projectId: number, processId: string, id: string) {
  return request<ParameterJson>(
    `${getServiceHostName()}/api/process/getparameterjson/${projectId}/${processId}/${id}`,
    {
      method: 'GET',
    },
  );
}

export async function createParameterJson(data?: Record<string, any>) {
  return request<string>(`${getServiceHostName()}/api/process/createparameterjson`, {
    method: 'POST',
    data,
  });
}

export async function updateParameterJson(data?: Record<string, any>) {
  return request<string>(`${getServiceHostName()}/api/process/updateparameterjson`, {
    method: 'PUT',
    data,
  });
}

export async function deleteParameterJson(data?: Record<string, any>) {
  return request<string>(`${getServiceHostName()}/api/process/deleteparameterjson`, {
    method: 'DELETE',
    data,
  });
}

export async function getExchangeJson(
  projectId: number,
  processId: string,
  internalId: number,
  input: boolean,
) {
  return request<ExchangeJson>(
    `${getServiceHostName()}/api/process/getexchangejson/${projectId}/${processId}/${internalId}/${input}`,
    {
      method: 'GET',
    },
  );
}

export async function createExchangeJson(data?: Record<string, any>) {
  return request<string>(`${getServiceHostName()}/api/process/createexchangejson`, {
    method: 'POST',
    data,
  });
}

export async function updateExchangeJson(data?: Record<string, any>) {
  return request<string>(`${getServiceHostName()}/api/process/updateexchangejson`, {
    method: 'PUT',
    data,
  });
}

export async function deleteExchangeJson(data?: Record<string, any>) {
  return request<string>(`${getServiceHostName()}/api/process/deleteexchangejson`, {
    method: 'DELETE',
    data,
  });
}

export async function copyProcess(data?: Record<string, any>) {
  return request<string>(`${getServiceHostName()}/api/process/copy`, {
    method: 'PUT',
    data,
  });
}
