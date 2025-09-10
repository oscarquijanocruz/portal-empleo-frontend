import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis;

// Usar un singleton para evitar multiples instancias en dev
const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
