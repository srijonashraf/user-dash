export type Role = "admin" | "editor" | "viewer";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  active: boolean;
  createdAt: string;
}

export interface ApiResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
}

export interface UserQueryParams {
  search?: string;
  role?: Role;
  sortOrder?: "asc" | "desc";
}
