import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Example queries to test the database
  const completedTasks = await prisma.userTask.findMany();
  console.log(completedTasks);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
