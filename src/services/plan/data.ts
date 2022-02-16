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
  childrenJson: string;
};

export type PlanModelState = {
  isSelected: boolean;
  cellType: string;
  cellId: string;
  cellConfig: any;
};
