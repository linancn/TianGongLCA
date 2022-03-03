export type FlowProperty = {
  pkid: number;
  id: string;
  projectId: number;
  dataName: string;
  lastChange: Date;
  description: string;
  flowPropertyType: string;
  cas: string;
  categoryId: string;
  categoryPath: string;
  categoryName: string;
  version: string;
  release: string;
  tags: string;
  library: string;
};

export type FlowPropertyJson = {
  projectId: number;
  flowPkid: number;
  flowId: string;
  conversionFactor: number;
  referenceFlowProperty: boolean;
  flowPropertyId: string;
  dataName: string;
  lastChange: Date;
  description: string;
  flowPropertyType: string;
  categoryId: string;
  version: string;
  release: string;
};
