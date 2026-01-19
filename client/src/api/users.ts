import type { ApiResponse, User, UserQueryParams } from "@/types";

const API_BASE = `${import.meta.env.VITE_API_BASE_URL}`;

export const fetchUsers = async (
  params: UserQueryParams,
  signal?: AbortSignal,
): Promise<User[]> => {
  const searchParams = new URLSearchParams();

  if (params.search) searchParams.set("search", params.search);
  if (params.role) searchParams.set("role", params.role);
  if (params.sortOrder) searchParams.set("sortOrder", params.sortOrder);

  const url = `${API_BASE}/users?${searchParams.toString()}`;
  const response = await fetch(url, { signal });

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  const json: ApiResponse<User[]> = await response.json();
  return json.data;
};

export const fetchUserById = async (id: string): Promise<User> => {
  const response = await fetch(`${API_BASE}/users/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch user");
  }

  const json: ApiResponse<User> = await response.json();
  return json.data;
};

export const toggleUserActive = async (id: string): Promise<User> => {
  const response = await fetch(`${API_BASE}/users/${id}/toggle-active`, {
    method: "PATCH",
  });

  if (!response.ok) {
    throw new Error("Failed to toggle user active status");
  }

  const json: ApiResponse<User> = await response.json();
  return json.data;
};
