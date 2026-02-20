import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

async function main() {
  const direct = process.env.DIRECT_URL;
  if (!direct) throw new Error("Missing DIRECT_URL in .env");

  const pool = new Pool({
    connectionString: direct,
    ssl: { rejectUnauthorized: false },
  });

  const prisma = new PrismaClient({
    adapter: new PrismaPg(pool),
  });

  // demo password za seed user-e
  const passwordHash = await bcrypt.hash("test1234", 10);

  const users = [
    { username: "marko", displayName: "Marko" },
    { username: "ana", displayName: "Ana" },
  ];

  for (const u of users) {
    await prisma.user.upsert({
      where: { username: u.username },
      update: {
        // opciono: ako želiš da uvek resetuješ password na test1234
        // passwordHash,
        displayName: u.displayName,
      },
      create: {
        username: u.username,
        displayName: u.displayName,
        passwordHash,
      },
    });
  }

  const marko = await prisma.user.findUnique({ where: { username: "marko" } });
  if (marko) {
    const count = await prisma.post.count({ where: { userId: marko.id } });
    if (count === 0) {
      await prisma.post.createMany({
        data: [
          { userId: marko.id, content: "Zdravo! Ovo je moj prvi post." },
          { userId: marko.id, content: "Prisma 7 + Neon + Vercel ✅" },
        ],
      });
    }
  }

  await prisma.$disconnect();
  await pool.end();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
