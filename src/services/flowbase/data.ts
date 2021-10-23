export type FlowBase = {
  pkid: number;
  id: string;
  projectId: number;
  name: string;
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
