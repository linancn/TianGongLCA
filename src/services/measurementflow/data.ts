export type MeasurementFlow = {
  pkid: number;
  id: string;
  projectId: number;
  flowBaseId: string;
  measurementBaseId: string;
  asRef: boolean;
  conversionRef: number;
};

export type MeasurementFlowListPagination = {
  total: number;
  pageSize: number;
  current: number;
};
