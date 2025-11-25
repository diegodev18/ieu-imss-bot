import { PrismaClient } from "@/lib/generated/prisma/client/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { DATABASE_URL } from "@/config";

const adapter = new PrismaPg({
  connectionString: DATABASE_URL,
});

export const prisma = new PrismaClient({ adapter });
