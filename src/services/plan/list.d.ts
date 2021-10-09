export type PlanInfo = {
  pkid: number;
  id: string;
  projectId: number;
  name: string;
  lastUpdateTime: Date;
  comment: string;
  type: string;
  nation: string;
};

export type PlanModel = {
  // pkid: number;
  projectId: number;
  id: string;
  parentCount: number;
  // name: string;
  childrenJson: string;
};

export type PlanListPagination = {
  total: number;
  pageSize: number;
  current: number;
};

// export type PlanListData = {
//   list: PlanListItem[];
//   pagination: Partial<PlanListPagination>;
// };
