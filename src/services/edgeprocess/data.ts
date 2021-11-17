export type EdgeProcess = {
  pkid: number;
  id?: string;
  projectId: number;
  planId: string;
  sourceProcessId: string;
  sourceFlowId: string;
  sourceFlowName?: string;
  targetProcessId: string;
  targetFlowId: string;
  targetFlowName?: string;
};
