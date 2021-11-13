export type FlowBase = {
  pkid: number;
  id: string;
  projectId: number;
  name: string;
  creator: string;
  createTime: Date;
  lastUpdateTime: Date;
  comment: string;
  type: string;
  nation: string;
  source: string;
};

export type FlowBaseListPagination = {
  total: number;
  pageSize: number;
  current: number;
};
