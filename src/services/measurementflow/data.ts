export type MeasurementFlow = {
  pkid: number;
  id: string;
  projectId: number;
  name: string;
  comment: string;
  unit: string;
  asRef: boolean;
  conversionRef: number;
  creator: string;
  createTime: Date;
  lastUpdateTime: Date;
  version: string;
};

export type MeasurementFlowListPagination = {
  total: number;
  pageSize: number;
  current: number;
};
