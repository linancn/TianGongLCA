import { request } from 'umi';
import type { Params, ListItemDataType } from 'mock/project/card.d';

export async function queryFakeList(
  params: Params,
): Promise<{ data: { list: ListItemDataType[] } }> {
  return request('/api/fake_list', {
    params,
  });
}
