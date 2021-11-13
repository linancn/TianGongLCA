export type PlanInfo = {
  pkid: number;
  id: string;
  projectId: number;
  name: string;
  creator: string;
  createTime: Date;
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
