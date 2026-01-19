import { PrismaClient } from "../../generated/prisma/client.js";
import config from "../../config/config.js";

/**
 * Prisma Client Singleton
 * Ensures only one instance of PrismaClient is created throughout the application
 * This prevents connection pool exhaustion and improves performance
 */
class DatabaseClient {
  private static instance: PrismaClient | null = null;

  /**
   * Private constructor to prevent direct instantiation
   */
  private constructor() {}

  /**
   * Get the singleton instance of PrismaClient
   * @returns PrismaClient instance
   */
  public static getInstance(): PrismaClient {
    if (!DatabaseClient.instance) {
      DatabaseClient.instance = new PrismaClient({
        log:
          config.server.nodeEnv === "development"
            ? ["query", "error", "warn"]
            : ["error"],
      });

      DatabaseClient.instance
        .$connect()
        .then(() => {
          console.log("Database connected successfully");
        })
        .catch((error: Error) => {
          console.error("Database connection failed", error);
          throw error;
        });

      process.on("beforeExit", async () => {
        await DatabaseClient.disconnect();
      });
    }

    return DatabaseClient.instance;
  }

  /**
   * Disconnect from the database
   * Should be called when the application is shutting down
   */
  public static async disconnect(): Promise<void> {
    if (DatabaseClient.instance) {
      await DatabaseClient.instance.$disconnect();
      console.log("Database disconnected");
      DatabaseClient.instance = null;
    }
  }
}

export const prisma = DatabaseClient.getInstance();

export default DatabaseClient;
