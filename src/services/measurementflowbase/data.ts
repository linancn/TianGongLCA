export type MeasurementFlowBase = {
  pkid: number;
  id: string;
  projectId: number;
  flowBaseId: string;
  asRef: boolean;
  conversionRef: number;
  measurementBaseId: string;
  name: string;
  comment: string;
  unit: string;
  creator: string;
  createTime: Date;
  lastUpdateTime: Date;
  version: string;
};

export type MeasurementFlowBaseListPagination = {
  total: number;
  pageSize: number;
  current: number;
};
