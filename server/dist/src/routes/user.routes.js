import { Router } from "express";
import { getUserById, getUsers, toggleActiveStatus, } from "../services/user.service.js";
import sendResponse from "../lib/utils/api-response.js";
import catchAsync from "../lib/utils/catch-async.js";
const router = Router();
// Get all users
router.get("/", catchAsync(async (req, res) => {
    const users = await getUsers(req.query);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Users retrieved successfully",
        data: users,
    });
}));
// Get user by id
router.get("/:id", catchAsync(async (req, res) => {
    const user = await getUserById(req.params.id);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "User retrieved successfully",
        data: user,
    });
}));
// Toggle user active status
router.patch("/:id/toggle-active", catchAsync(async (req, res) => {
    const user = await toggleActiveStatus(req.params.id);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "User status toggled successfully",
        data: user,
    });
}));
export default router;
