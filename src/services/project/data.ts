// import type { ListPagination } from "../home/data";

export type ProjectListItem = {
  id: number;
  name?: string;
  createTime?: Date;
  lastUpdateTime?: Date;
  comment?: string;
  star?: boolean;
  creator?: string;
  nation?: string;
  type?: string;
};

// export type ProjectListData = {
//   list: ProjectListItem[];
//   pagination: Partial<ListPagination>;
// };

// export type ProjectListParams = {
//   pageSize?: number;
//   currentPage?: number;
//   sort?: Record<string, any>;
//   searchvalue?: string;
// };
