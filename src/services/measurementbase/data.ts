export type MeasurementBase = {
  pkid: number;
  id: string;
  projectId: number;
  name: string;
  unit: string;
  creator: string;
  createTime: Date;
  lastUpdateTime: Date;
  comment: string;
  version: string;
};

export type MeasurementBaseListPagination = {
  total: number;
  pageSize: number;
  current: number;
};
