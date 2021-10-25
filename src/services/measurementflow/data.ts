export type MeasurementFlow = {
  pkid: number;
  id?: string;
  projectId: number;
  name?: string;
  comment?: string;
};

export type MeasurementFlowListPagination = {
  total: number;
  pageSize: number;
  current: number;
};
