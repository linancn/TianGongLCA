import { request } from 'umi';
import type { Params, ListItemDataType } from 'mock/Project/data.d';

export async function queryFakeList(
  params: Params,
): Promise<{ data: { list: ListItemDataType[] } }> {
  return request('/api/fake_list', {
    params,
  });
}
