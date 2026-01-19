import { prisma } from "../lib/db/prisma.js";
import { trimOrUndefined } from "../lib/utils/string.js";
// Get all users
export const getUsers = async (params) => {
    const role = params.role;
    const search = trimOrUndefined(params.search);
    const sortOrder = trimOrUndefined(params.sortOrder);
    const where = {};
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
// Get user by id
export const getUserById = async (id) => {
    const user = await prisma.user.findUnique({
        where: { id },
    });
    if (!user) {
        throw new Error("User not found");
    }
    return user;
};
// Toggle user active status
export const toggleActiveStatus = async (id) => {
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
