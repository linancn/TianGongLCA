// import type { ListPagination } from "../home/data";

export type Project = {
  id: number;
  name: string;
  createTime?: Date;
  lastChange?: Date;
  description?: string;
  star?: boolean;
  creator?: string;
  nation?: string;
  projectType?: string;
  roleId: number;
};
