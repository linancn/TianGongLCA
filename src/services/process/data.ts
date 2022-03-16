export type Process = {
  pkid: number;
  id: string;
  projectId: number;
  dataName: string;
  lastChange: Date;
  description: string;
  processType: string;
  database: string;
  release: string;
  version: string;
};

export type ParameterJson = {
  id: string;
  projectId: number;
  processPkid: number;
  processId: string;
  name: string;
  formula: string;
  value: number;
  uncertaintyGeomMean: number;
  uncertaintyGeomSd: number;
  version: string;
  description: string;
};
