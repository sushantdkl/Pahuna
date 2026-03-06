import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error(
      "DATABASE_URL environment variable is not set. " +
      "See .env.example for required variables."
    );
  }

  const pool = new Pool({
    connectionString,
    max: process.env.NODE_ENV === "production" ? 10 : 5,
    idleTimeoutMillis: 30_000,
    connectionTimeoutMillis: 10_000,
  });
  const adapter = new PrismaPg(pool);
  return new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });
}

function getDb(): PrismaClient {
  if (globalForPrisma.prisma) return globalForPrisma.prisma;

  const instance = createPrismaClient();
  if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = instance;
  return instance;
}

// Lazy proxy — only connects when a property is actually accessed at runtime.
// This prevents build-time crashes when DATABASE_URL is not set (e.g. Vercel).
export const db = new Proxy({} as PrismaClient, {
  get(_target, prop) {
    return getDb()[prop as keyof PrismaClient];
  },
});
