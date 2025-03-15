import { LocationTag, PrismaClient, RewardType } from "@prisma/client";
import { faker } from "@faker-js/faker";
import { hash } from "crypto";

const prisma = new PrismaClient();

async function main() {
  // Clean up existing data
  await prisma.$transaction([
    prisma.chatbotLog.deleteMany(),
    prisma.userReward.deleteMany(),
    prisma.reward.deleteMany(),
    prisma.task.deleteMany(),
    prisma.weeklyRecommendation.deleteMany(),
    prisma.location.deleteMany(),
    prisma.chatConnection.deleteMany(),
    prisma.connection.deleteMany(),
    prisma.userHobbyTag.deleteMany(),
    prisma.userPreference.deleteMany(),
    prisma.user.deleteMany(),
    prisma.hobbyTag.deleteMany(),
  ]);

  // Create hobby tags
  const hobbyTexts = ["Photography", "Food", "Art", "Music", "Sports"];
  const hobbies = await Promise.all(
    hobbyTexts.map((hobby) => prisma.hobbyTag.create({ data: { name: hobby } }))
  );

  // Create sample users
  const users = await Promise.all(
    Array.from({ length: 5 }).map(async () => {
      const user = await prisma.user.create({
        data: {
          phoneNumber: faker.phone.number(),
          username: faker.internet.userName(),
          passwordHash: hash("sha256", "password"),
        },
      });

      // Create user preferences
      await prisma.userPreference.create({
        data: {
          userId: user.id,
          nationality: faker.location.country(),
          university: "University of Melbourne",
          groupPreference: Math.random() > 0.5 ? "GROUP" : "SOLO",
        },
      });

      // Create hobby tags for users
      await Promise.all(
        faker.helpers
          .arrayElements(hobbies, Math.floor(Math.random() * 3) + 1)
          .map((hobby) =>
            prisma.userHobbyTag.create({
              data: { userId: user.id, hobbyTagId: hobby.id },
            })
          )
      );

      return user;
    })
  );

  // Create locations
  const locations = await Promise.all([
    // -37.809962798356516, 144.964566044394
    prisma.location.create({
      data: {
        name: "State Library Victoria",
        description:
          "The State Library Victoria is the central library of the state of Victoria, Australia, located in Melbourne. It is on the block bounded by Swanston, La Trobe, Russell, and Little Lonsdale streets, in the northern centre of the central business district.",
        latitude: -37.809962798356516,
        longitude: 144.964566044394,
        hasArHiddenReward: Math.random() > 0.7,
        photoUrl:
          "https://lh5.googleusercontent.com/p/AF1QipMBwsYfFhzSaKZ-E4yOioJB834E5tDZl3FO2YP-=w408-h408-k-no",
        tags: [LocationTag.HISTORICAL, LocationTag.CULTURAL, LocationTag.ART],
      },
    }),
    //-37.829918615807955, 144.9812192312084 - Shrine of Remembrance
    prisma.location.create({
      data: {
        name: "Shrine of Remembrance",
        description:
          "The Shrine of Remembrance, located in Kings Domain on St Kilda Road, Melbourne, Australia was built as a memorial to the...",
        latitude: -37.830372314962794,
        longitude: 144.97344262483904,
        hasArHiddenReward: Math.random() > 0.7,
        photoUrl:
          "https://lh5.googleusercontent.com/p/AF1QipM8htf0oBRNqgvM83Msp7WUr3TjFIgE6SA8ed2S=w408-h306-k-no",
        tags: [LocationTag.HISTORICAL, LocationTag.CULTURAL],
      },
    }),
    // -37.830372314962794, 144.97344262483904
    prisma.location.create({
      data: {
        name: "Royal Botanic Gardens Victoria",
        description:
          "The Royal Botanic Gardens Victoria are botanic gardens across two sites - Melbourne and Cranbourne. Melbourne Gardens was founded in 1846 when land was reserved on the south side of the Yarra River for a new botanic garden.",
        latitude: -37.830372314962794,
        longitude: 144.97344262483904,
        hasArHiddenReward: Math.random() > 0.7,
        photoUrl:
          "https://lh5.googleusercontent.com/p/AF1QipNr16xQjl9PqqLfiXee9kHtLv7xu-kvjiBPdeWw=w408-h306-k-no",
        tags: [LocationTag.NATURE, LocationTag.HISTORICAL],
      },
    }),
    // -37.81719642762704, 144.9708156498251
    prisma.location.create({
      data: {
        name: "Federation Square",
        description:
          "Federation Square is a venue for arts, culture and public events on the edge of the Melbourne central business district. It covers an area of 3.2 hectares at the intersection of Flinders and Swanston Streets built above busy railway lines and across the road from Flinders Street station.",
        latitude: -37.821891941272625,
        longitude: 144.9698528737019,
        hasArHiddenReward: Math.random() > 0.7,
        photoUrl:
          "https://lh5.googleusercontent.com/p/AF1QipOagdxjFkB5jmhQ08F3BeKzPkZeXf7wANo_IL9H=w408-h306-k-no",
        tags: [LocationTag.CULTURAL, LocationTag.HISTORICAL],
      },
    }),
    // -37.821891941272625, 144.9698528737019 NGV
    prisma.location.create({
      data: {
        name: "National Gallery of Victoria",
        description:
          "The National Gallery of Victoria, popularly known as the NGV, is an art museum in Melbourne, Victoria, Australia. Founded in 1861, it is Australia's oldest, largest and most visited art museum.",
        latitude: -37.821891941272625,
        longitude: 144.9698528737019,
        hasArHiddenReward: Math.random() > 0.7,
        photoUrl:
          "https://lh5.googleusercontent.com/p/AF1QipMBwsYfFhzSaKZ-E4yOioJB834E5tDZl3FO2YP-=w408-h408-k-no",
        tags: [LocationTag.CULTURAL, LocationTag.HISTORICAL, LocationTag.ART],
      },
    }),
  ]);
  // Create rewards
  await Promise.all(
    Array.from({ length: 5 }).map(() =>
      prisma.reward.create({
        data: {
          type: faker.helpers.arrayElement(Object.values(RewardType)),
          name: faker.commerce.productName(),
          description: faker.lorem.sentence(),
          pointsRequired: faker.number.int({ min: 100, max: 1000 }),
          isHidden: Math.random() > 0.7,
        },
      })
    )
  );

  // Create tasks for users at locations
  await Promise.all(
    users.flatMap((user) =>
      locations.map((location) =>
        prisma.task.create({
          data: {
            userId: user.id,
            locationId: location.id,
            title: faker.lorem.sentence(),
            description: faker.lorem.paragraph(),
            points: faker.number.int({ min: 10, max: 100 }),
            isCompleted: Math.random() > 0.7,
            completedAt: Math.random() > 0.7 ? faker.date.past() : null,
          },
        })
      )
    )
  );

  // Create some connections between users
  await Promise.all(
    users.flatMap((user1) =>
      users
        .filter((user2) => user1.id !== user2.id)
        .map((user2) =>
          prisma.connection.create({
            data: {
              userOneId: user1.id,
              userTwoId: user2.id,
              status: faker.helpers.arrayElement([
                "PENDING",
                "ACCEPTED",
                "REJECTED",
              ]),
            },
          })
        )
    )
  );

  // Create weekly recommendations
  await Promise.all(
    locations.map((location) =>
      prisma.weeklyRecommendation.create({
        data: {
          title: faker.lorem.sentence(),
          description: faker.lorem.paragraph(),
          locationId: location.id,
          startDate: faker.date.future(),
          endDate: faker.date.future({ years: 1 }),
        },
      })
    )
  );

  console.log("Seed data created successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
