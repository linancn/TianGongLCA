import { request } from 'umi';

export async function createFlows(data?: Record<string, any>) {
  return request<string>('http://localhost:8081/api/flowbase/create', {
    method: 'POST',
    data,
  });
}

/** Delete /api/plan */
export async function deleteFlows(pkid: number) {
  return request<string>(`http://localhost:8081/api/flowbase/delete/${pkid}`, {
    method: 'DELETE',
  });
}
