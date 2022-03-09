export type UnitGroup = {
  pkid: number;
  id: string;
  projectId: number;
  dataName: string;
  lastChange: Date;
  description: string;
  referenceUnit: string;
  categoryId: string;
  categoryPath: string;
  categoryName: string;
  version: string;
  release: string;
  tags: string;
  library: string;
};

export type UnitJson = {
  projectId: number;
  unitGroupPkid: number;
  unitGroupId: number;
  id: string;
  name: string;
  conversionFactor: number;
  referenceUnit: boolean;
  description: string;
  type: string;
  synonyms: string;
  version: string;
};
