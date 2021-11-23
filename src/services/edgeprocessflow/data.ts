export type EdgeProcessFlow = {
  pkid: number;
  id?: string;
  projectId: number;
  planId: string;
  sourceProcessId: string;
  sourceProcessName: string;
  sourceFlowId: string;
  sourceFlowName: string;
  targetProcessId: string;
  targetProcessName: string;
  targetFlowId: string;
  targetFlowName: string;
};
