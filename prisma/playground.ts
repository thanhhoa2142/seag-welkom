import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Example queries to test the database

  // 1. Get all users with their preferences and hobby tags
  const users = await prisma.user.findMany({
    include: { preferences: true, hobbyTags: true },
  });
  console.log("Users with preferences:", users);

  // 2. Get all tasks for a specific user
  const firstUser = users[0];
  if (firstUser) {
    const userTasks = await prisma.task.findMany({
      where: {
        userId: firstUser.id,
      },
      include: {
        location: true,
      },
    });
    console.log("Tasks for first user:", userTasks);
  }

  // 3. Get all connections for a user
  const userConnections = await prisma.connection.findMany({
    where: {
      OR: [{ userOneId: firstUser?.id }, { userTwoId: firstUser?.id }],
    },
    include: {
      userOne: true,
      userTwo: true,
    },
  });
  console.log("User connections:", userConnections);

  // 4. Get all locations with hidden rewards
  const locationsWithRewards = await prisma.location.findMany({
    where: {
      hasArHiddenReward: true,
    },
    include: {
      hiddenReward: true,
    },
  });
  console.log("Locations with hidden rewards:", locationsWithRewards);

  // 5. Get weekly recommendations for the next month
  const recommendations = await prisma.weeklyRecommendation.findMany({
    where: {
      startDate: {
        gte: new Date(),
      },
      endDate: {
        lte: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      },
    },
    include: {
      location: true,
    },
  });
  console.log("Upcoming recommendations:", recommendations);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
