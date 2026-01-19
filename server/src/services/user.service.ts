import { Prisma, Role, User } from "../generated/prisma/client.js";
import { prisma } from "../lib/db/prisma.js";
import { trimOrUndefined } from "../lib/utils/string.js";
import { UserQueryParams } from "../types/index.js";

export const getUsers = async (params: UserQueryParams): Promise<User[]> => {
  const role = params.role as Role;
  const search = trimOrUndefined(params.search);
  const sortOrder = trimOrUndefined(params.sortOrder);

  const where: Prisma.UserWhereInput = {};
  if (search) {
    where.name = {
      contains: search,
      mode: "insensitive",
    };
  }
  if (role) {
    where.role = role;
  }

  // Fetch users from the database
  const users = await prisma.user.findMany({
    where,
    orderBy: sortOrder ? { name: sortOrder } : undefined,
  });

  return users;
};

export const getUserById = async (id: string): Promise<User> => {
  const user = await prisma.user.findUnique({
    where: { id },
  });

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

export const toggleActiveStatus = async (id: string): Promise<User> => {
  const user = await prisma.user.findUnique({
    where: { id },
    select: { active: true },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const updatedUser = await prisma.user.update({
    where: { id },
    data: { active: !user.active },
  });

  return updatedUser;
};
