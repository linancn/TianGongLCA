import { request } from 'umi';
import type { ParameterJson, Process } from './data';
import type { SortOrder } from 'antd/lib/table/interface';

export async function getProcessGrid(
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
    data: Process[];
    total?: number;
    success?: boolean;
  }>('http://localhost:8081/api/process/getgrid', {
    method: 'GET',
    params: {
      ...params,
      sortBy,
      orderBy,
      projectId,
    },
  });
}

export async function getParameterJsonGrid(
  params: {
    current?: number;
    pageSize?: number;
  },
  sort: Record<string, SortOrder>,
  processPkid: number,
) {
  const sortBy = Object.keys(sort)[0];
  const orderBy = sort[sortBy]?.replace('end', '');
  return request<{
    data: ParameterJson[];
    total?: number;
    success?: boolean;
  }>('http://localhost:8081/api/process/getparameterjsongrid', {
    method: 'GET',
    params: {
      ...params,
      sortBy,
      orderBy,
      processPkid,
    },
  });
}

export async function getProcessById(projectId: number, id: string) {
  return request<Process>(`http://localhost:8081/api/process/get/${projectId}/${id}`, {
    method: 'GET',
  });
}

export async function getProcessByPkid(pkid: number) {
  return request<Process>(`http://localhost:8081/api/process/get/${pkid}`, {
    method: 'GET',
  });
}

export async function updateProcess(data?: Record<string, any>) {
  return request<string>('http://localhost:8081/api/process/update', {
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
  return request<string>('http://localhost:8081/api/process/create', {
    method: 'POST',
    data,
  });
}

export async function deleteProcess(pkid: number) {
  return request<string>(`http://localhost:8081/api/process/delete/${pkid}`, {
    method: 'DELETE',
  });
}

export async function getParameterJson(processPkid: number, id: string) {
  return request<ParameterJson>(
    `http://localhost:8081/api/process/getparameterjson/${processPkid}/${id}`,
    {
      method: 'GET',
    },
  );
}

export async function createParameterJson(data?: Record<string, any>) {
  return request<string>('http://localhost:8081/api/process/createparameterjson', {
    method: 'POST',
    data,
  });
}

export async function updateParameterJson(data?: Record<string, any>) {
  return request<string>('http://localhost:8081/api/process/updateparameterjson', {
    method: 'PUT',
    data,
  });
}

export async function deleteParameterJson(processPkid: number, id: string) {
  return request<string>(
    `http://localhost:8081/api/process/deleteparameterjson/${processPkid}/${id}`,
    {
      method: 'DELETE',
    },
  );
}
