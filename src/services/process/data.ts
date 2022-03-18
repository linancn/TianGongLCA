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

export type ExchangeJson = {
  projectId: number;
  processPkid: number;
  processId: string;
  internalId: number;
  input: boolean;
  amount: number;
  amountFormula: string;
  description: string;
  avoidedProduct: boolean;
  quantitativeReference: boolean;
  flowPkid: number;
  flowId: string;
  flowName: string;
};
