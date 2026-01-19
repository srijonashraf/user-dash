import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import config from "./config/config.js";
const createExpressApp = () => {
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cors());
    app.use(helmet());
    app.use(rateLimit({
        windowMs: config.server.rateLimit.windowMs,
        max: config.server.rateLimit.max,
    }));
    return app;
};
export default createExpressApp;
