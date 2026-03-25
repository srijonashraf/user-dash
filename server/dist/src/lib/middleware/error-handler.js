import config from "../../config/config.js";
const errorHandler = (err, _req, res, _next) => {
    const statusCode = err.statusCode ?? 500;
    const message = err.message || "Internal Server Error";
    res.status(statusCode).json({
        success: false,
        message,
        ...(config.server.nodeEnv === "development" && { stack: err.stack }),
    });
};
export default errorHandler;
