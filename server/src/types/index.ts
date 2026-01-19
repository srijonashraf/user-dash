import { Role } from "../generated/prisma/client.js";

export interface UserQueryParams {
  search?: string;
  role?: Role;
  sortOrder?: "asc" | "desc";
}
