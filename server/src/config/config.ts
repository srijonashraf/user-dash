import dotenv from "dotenv";
dotenv.config();

const config = {
  server: {
    nodeEnv: process.env.NODE_ENV || "development",
    port: process.env.SERVER_PORT
      ? parseInt(process.env.SERVER_PORT, 10)
      : 4500,
    rateLimit: {
      windowMs: process.env.RATE_LIMIT_WINDOW_MS
        ? parseInt(process.env.RATE_LIMIT_WINDOW_MS, 10)
        : 15 * 60 * 1000, // default 15 minutes
      max: process.env.RATE_LIMIT_MAX_REQUESTS
        ? parseInt(process.env.RATE_LIMIT_MAX_REQUESTS, 10)
        : 100, // default 100 requests per window
    },
  },
  database: {
    connectionString:
      process.env.DB_CONNECTION_STRING || "mongodb://localhost:27017/userdash",
  },
};

export default config;
