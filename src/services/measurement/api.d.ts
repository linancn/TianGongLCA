export type MeasurementBase = {
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

export type MeasurementBaseListPagination = {
  total: number;
  pageSize: number;
  current: number;
};
