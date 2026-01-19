import express from "express";
import type { Express, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import config from "./config/config.js";
import routes from "./routes/index.js";

const createExpressApp = (): Express => {
  const app: Express = express();
  app.set("trust proxy", 1);

  // Middleware setup
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(
    cors({
      origin: ["http://localhost:5173", "https://user-dash-tixio.vercel.app"],
    }),
  );
  app.use(helmet());
  app.use(
    rateLimit({
      windowMs: config.server.rateLimit.windowMs,
      max: config.server.rateLimit.max,
      standardHeaders: true,
      legacyHeaders: false,
    }),
  );

  // Routes setup
  app.use("/api", routes);

  // Basic route for health check
  app.get("/", (_req: Request, res: Response) => {
    res.send("User Dash API is running.");
  });

  return app;
};

export default createExpressApp;
