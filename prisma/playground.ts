import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Example queries to test the database
  const locations = await prisma.user.findMany({
    select: { username: true, password: true },
  });
  console.log(locations);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
