import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/lib/generated/prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
  prismaPoolMax: number | undefined;
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
