// ─── Prisma Database Client ────────────────────────────────────────────────
// PostgreSQL database client initialized with Prisma ORM
// This replaces the legacy MongoDB/Mongoose setup

import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const globalForPrisma = global as unknown as { prisma?: PrismaClient };

let db: PrismaClient;

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL || "postgresql://postgres:root@localhost:5432/Pahuna",
});

if (process.env.NODE_ENV === "production") {
  db = new PrismaClient({
    adapter,
    log: ["warn", "error"],
  });
} else {
  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = new PrismaClient({
      adapter,
      log: ["query", "warn", "error"],
    });
  }
  db = globalForPrisma.prisma;
}

export { db };

/**
 * Default export for convenience
 * import db from '@/lib/db';
 */
export default db;
