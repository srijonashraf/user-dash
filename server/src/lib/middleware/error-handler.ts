import type { Request, Response, NextFunction } from "express";
import config from "../../config/config.js";

interface AppError extends Error {
  statusCode?: number;
}

const errorHandler = (
  err: AppError,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  const statusCode = err.statusCode ?? 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    message,
    ...(config.server.nodeEnv === "development" && { stack: err.stack }),
  });
};

export default errorHandler;
