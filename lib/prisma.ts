import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/lib/generated/prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
  prismaPoolMax: number | undefined;
  prismaMigrated: boolean | undefined;
};

function getPoolMax() {
  const poolMax = Number(process.env.DATABASE_POOL_MAX);
  return Number.isInteger(poolMax) && poolMax > 0 ? poolMax : 1;
}

function createPrismaClient(poolMax: number) {
  const connectionString =
    process.env.DATABASE_URL ?? process.env.DIRECT_DATABASE_URL;

  if (!connectionString) {
    throw new Error("DATABASE_URL or DIRECT_DATABASE_URL is not set");
  }

  const adapter = new PrismaPg({
    connectionString,
    connectionTimeoutMillis: 5000,
    idleTimeoutMillis: 10000,
    max: poolMax,
  });
  return new PrismaClient({ adapter });
}

const poolMax = getPoolMax();

export const prisma =
  globalForPrisma.prismaPoolMax === poolMax && globalForPrisma.prisma
    ? globalForPrisma.prisma
    : createPrismaClient(poolMax);

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
  globalForPrisma.prismaPoolMax = poolMax;
}

// Run once per process: ensure Order/OrderItem tables exist (idempotent DDL)
async function ensureSchema() {
  if (globalForPrisma.prismaMigrated) return;
  globalForPrisma.prismaMigrated = true;
  try {
    await prisma.$executeRawUnsafe(`
      DO $$ BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'OrderStatus') THEN
          CREATE TYPE "OrderStatus" AS ENUM (
            'PENDING','CONFIRMED','PROCESSING','SHIPPED','DELIVERED','CANCELLED','REFUNDED'
          );
        END IF;
      END $$;
    `);
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "Order" (
        "id"        TEXT NOT NULL PRIMARY KEY,
        "userId"    TEXT NOT NULL REFERENCES "User"("id") ON DELETE CASCADE,
        "status"    "OrderStatus" NOT NULL DEFAULT 'PENDING',
        "total"     DOUBLE PRECISION NOT NULL,
        "subtotal"  DOUBLE PRECISION NOT NULL,
        "notes"     TEXT,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `);
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "OrderItem" (
        "id"          TEXT NOT NULL PRIMARY KEY,
        "orderId"     TEXT NOT NULL REFERENCES "Order"("id") ON DELETE CASCADE,
        "productId"   TEXT REFERENCES "Product"("id") ON DELETE SET NULL,
        "productName" TEXT NOT NULL,
        "productSlug" TEXT NOT NULL,
        "imageUrl"    TEXT,
        "unitPrice"   DOUBLE PRECISION NOT NULL,
        "quantity"    INTEGER NOT NULL,
        "lineTotal"   DOUBLE PRECISION NOT NULL
      );
    `);
    await prisma.$executeRawUnsafe(
      `CREATE INDEX IF NOT EXISTS "Order_userId_idx" ON "Order"("userId");`
    );
    await prisma.$executeRawUnsafe(
      `CREATE INDEX IF NOT EXISTS "OrderItem_orderId_idx" ON "OrderItem"("orderId");`
    );
  } catch {
    // Non-fatal: tables may already exist or DB not yet reachable at build time
  }
}

// Fire-and-forget on module load (runs in the server process with real env)
if (typeof window === "undefined") {
  ensureSchema();
}
