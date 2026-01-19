import { Role } from "@prisma/client";

export interface UserQueryParams {
  search?: string;
  role?: Role;
  sortOrder?: "asc" | "desc";
}
