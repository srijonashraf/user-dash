import { Request, Response, Router } from "express";
import { User } from "@prisma/client";
import {
  getUserById,
  getUsers,
  toggleActiveStatus,
} from "../services/user.service.js";
import sendResponse from "../lib/utils/api-response.js";
import catchAsync from "../lib/utils/catch-async.js";
import { UserQueryParams } from "../types/index.js";

const router = Router();

// Get all users
router.get(
  "/",
  catchAsync(async (req: Request, res: Response) => {
    const users: User[] = await getUsers(req.query as UserQueryParams);
    sendResponse<User[]>(res, {
      statusCode: 200,
      success: true,
      message: "Users retrieved successfully",
      data: users,
    });
  }),
);

// Get user by id
router.get(
  "/:id",
  catchAsync(async (req: Request, res: Response) => {
    const user: User = await getUserById(req.params.id as string);
    sendResponse<User>(res, {
      statusCode: 200,
      success: true,
      message: "User retrieved successfully",
      data: user,
    });
  }),
);

// Toggle user active status
router.patch(
  "/:id/toggle-active",
  catchAsync(async (req: Request, res: Response) => {
    const user: User = await toggleActiveStatus(req.params.id as string);
    sendResponse<User>(res, {
      statusCode: 200,
      success: true,
      message: "User status toggled successfully",
      data: user,
    });
  }),
);

export default router;
