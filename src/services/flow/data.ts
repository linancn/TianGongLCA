export type Flow = {
  pkid: number;
  id: string;
  projectId: number;
  dataName: string;
  lastChange: Date;
  description: string;
  synonyms: string;
  formula: string;
  flowType: string;
  cas: string;
  categoryId: string;
  categoryPath: string;
  categoryName: string;
  flowPropertyCount: number;
  locationId: string;
  locationName: string;
  version: string;
  database: string;
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
