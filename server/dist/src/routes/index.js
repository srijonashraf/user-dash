import { Router } from "express";
import userRoutes from "./user.routes.js";
const rootRouter = Router();
rootRouter.use("/users", userRoutes);
export default rootRouter;
