export type PlanInfo = {
  pkid: number;
  id: string;
  projectId: number;
  dataName: string;
  lastChange: Date;
  description: string;
  planType: string;
  locationId: string;
  locationName: string;
  categoryId: string;
  categoryPath: string;
  categoryName: string;
  fixedProcessId: string;
  scalingFactor: string;
  version: string;
};

export type PlanModel = {
  projectId: number;
  id: string;
  parentCount: number;
  dataName: string;
  modelCells: string;
};

export type PlanModelState = {
  isSelected: boolean;
  cellType: string;
  cellId: string;
  cellConfig: any;
};

export type PlanModelProcess = {
  projectId: number;
  planPkid: number;
  planId: string;
  edgeSourceId: string;
  edgeSourceName: string;
  planSourceId: string;
  planSourceName: string;
  processSourceId: string;
  processSourceName: string;
  edgeTargetId: string;
  edgeTargetName: string;
  planTargetId: string;
  planTargetName: string;
  processTargetId: string;
  processTargetName: string;
};

export type PlanModelFlow = {
  projectId: number;
  planPkid: number;
  planId: string;
  edgeSourceId: string;
  edgeSourceName: string;
  planSourceId: string;
  planSourceName: string;
  processSourceId: string;
  processSourceName: string;
  flowSourceId: string;
  flowSourceName: string;
  edgeTargetId: string;
  edgeTargetName: string;
  planTargetId: string;
  planTargetName: string;
  processTargetId: string;
  processTargetName: string;
  flowTargetId: string;
  flowTargetName: string;
};
