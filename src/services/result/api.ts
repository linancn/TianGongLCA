import { request } from 'umi';

export async function getResultData() {
  // return resultJson;
  return request<any>(
    `https://gw.alipayobjects.com/os/bmw-prod/2a5dbbc8-d0a7-4d02-b7c9-34f6ca63cff6.json`,
    {
      method: 'GET',
    },
  );
}
