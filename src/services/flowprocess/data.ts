export type FlowProcess = {
  pkid: number;
  id?: string;
  projectId: number;
  processId: string;
  ioType: string;
  comment?: string;
  flowBaseId?: string;
};

export type FlowProcessListPagination = {
  total: number;
  pageSize: number;
  current: number;
};