export type ProjectListItem = {
  id: number;
  name: string;
  createTime: Date;
  lastUpdateTime: Date;
  comment: string;
  star: boolean;
  creator: string;
  nation: string;
  type: string;
};

export type ProjectListPagination = {
  total: number;
  pageSize: number;
  current: number;
};

export type ProjectListData = {
  list: ProjectListItem[];
  pagination: Partial<ProjectListPagination>;
};

export type ProjectListParams = {
  pageSize?: number;
  currentPage?: number;
  sort?: Record<string, any>;
  searchvalue?: string;
};
