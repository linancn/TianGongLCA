export type ProjectListItem = {
  id: number;
  name: string;
  createAt: Date;
  lastUpdate: Date;
  // owner: string;
  comment: string;
  flag: boolean;
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
