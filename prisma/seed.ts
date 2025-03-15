/** @format */

import { LocationTag, Prisma, PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
import { hashSync } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Clean up existing data, including DailyTip entries
  await prisma.$transaction([
    prisma.dailyTip.deleteMany(), // Added to clear existing daily tips
    prisma.chatbotLog.deleteMany(),
    prisma.userReward.deleteMany(),
    prisma.reward.deleteMany(),
    prisma.weeklyRecommendation.deleteMany(),
    prisma.chatConnection.deleteMany(),
    prisma.connection.deleteMany(),
    prisma.userTask.deleteMany(),
    prisma.userHobbyTag.deleteMany(),
    prisma.userPreference.deleteMany(),
    prisma.user.deleteMany(),
    prisma.hobbyTag.deleteMany(),
    prisma.task.deleteMany(),
    prisma.location.deleteMany(),
  ]);

  // Create hobby tags
  const hobbyTexts = ["Photography", "Food", "Art", "Music", "Sports"];
  const hobbies = await Promise.all(
    hobbyTexts.map((hobby) => prisma.hobbyTag.create({ data: { name: hobby } }))
  );

  // Create sample users
  const rin = await prisma.user.create({
    data: {
      phoneNumber: "0478234236",
      username: "rinx1000",
      email: "iamrin@seag.fun",
      bio: `Love code, cat 🐈, but not coffee. A real developer from Vietnam 🇻🇳.
      I'm a full-stack developer, with a passion for building beautiful and functional websites.
      `,
      passwordHash: hashSync("password"),
    },
  });
  const users = await Promise.all(
    Array.from({ length: 5 }).map(async () => {
      const user = await prisma.user.create({
        data: {
          phoneNumber: faker.phone.number(),
          username: faker.internet.displayName(),
          passwordHash: hashSync("password"),
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
  // Add friends for rin
  await prisma.connection.createMany({
    data: users.map((user) => ({
      userId: rin.id,
      friendId: user.id,
      status: "ACCEPTED",
    })),
  });

  // Create locations
  const locations = await Promise.all([
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
        tasks: {
          createMany: {
            data: [
              "Visit the Lego Model of State Lib",
              "Attend free exhibitions",
              "Visit the famous Dome reading room",
              "Register for library account",
              "Visit at least 3 readings rooms",
            ].map((task) => ({ description: task })),
          },
        },
      },
    }),
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
        tasks: {
          createMany: {
            data: [
              "Take a picture inside the Galleries of Remembrance",
              "Find the The WWII gallery",
              "Visit the Crypt",
              "Enjoy the Balcony Views",
              "Stroll Through the Gardens",
              "Visit the Visitor Centre",
            ].map((task) => ({ description: task })),
          },
        },
      },
    }),
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
        tasks: {
          createMany: {
            data: [
              "Stroll through themed gardens or bring along a picnic in one of the many green spaces.",
              "Visit Visitor Centre",
              "Take photo of the amazing landscape",
              "Find at least 20 unique plants",
              "Visit Tropical Glass House",
              "Find a quiet spot to read, meditate, or simply enjoy the natural beauty.",
            ].map((task) => ({ description: task })),
          },
        },
      },
    }),
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
        tasks: {
          createMany: {
            data: [
              "Watch the people going pass by ",
              "Grab a coffee or meal from nearby cafés, then relax on the steps and enjoy the vibe.",
              "Find Community Event or Watch sport (If there are any)",
            ].map((task) => ({ description: task })),
          },
        },
      },
    }),
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
        tasks: {
          createMany: {
            data: [
              "Find a painting that makes you laugh or smile.",
              "Spot an artwork that features an animal.",
              "Engage with an interactive exhibit or use the NGV’s digital resources.",
              "Take the picture next to the water fountain.",
            ].map((task) => ({ description: task })),
          },
        },
      },
    }),
  ]);

  // Add tasks for rin
  const tasks = await prisma.task.findMany();
  await prisma.userTask.createMany({
    data: tasks
      .filter(() => Math.random() > 0.5)
      .map((task) => ({ userId: rin.id, taskId: task.id })),
  });

  // Create rewards
  const rewards: Prisma.RewardCreateInput[] = [
    {
      name: "Card Holder",
      description: "Keep your Myki card always in one place",
      pointsRequired: 50,
      photoUrl:
        "https://jeci5zb54a7bovch.public.blob.vercel-storage.com/rewards/card-holder-pCsjJsJKuHIpbtgywCK2z4gzNTU99l.jpg",
    },
    {
      name: "Water Bottle",
      description: "Stay hydrated with this water bottle",
      pointsRequired: 100,
      photoUrl:
        "https://jeci5zb54a7bovch.public.blob.vercel-storage.com/rewards/bottle-vpoMuJSGQIWwIg2MKbKxktnX8BeWAi.jpg",
    },
    {
      name: "Sturdy Umbrella",
      description: "Stay dry with this sturdy umbrella",
      pointsRequired: 150,
      photoUrl:
        "https://jeci5zb54a7bovch.public.blob.vercel-storage.com/rewards/umbrella-psNkFQECf1Cig63gMGYNbVbXZ5TLyL.jpg",
    },
    {
      name: "T-shirt with your badges",
      description: "Show off your badges with this t-shirt",
      pointsRequired: 200,
      photoUrl:
        "https://jeci5zb54a7bovch.public.blob.vercel-storage.com/rewards/t-shirt-lyk2XPhnR7yzoBDTuRIWhA8skGgFFo.webp",
    },
    {
      name: "Keychron K2 Keyboard",
      description:
        "Upgrade your typing experience with this mechanical keyboard",
      pointsRequired: 500,
      photoUrl:
        "https://jeci5zb54a7bovch.public.blob.vercel-storage.com/rewards/keychron-v2-d7T4ZxsCLiNBMZultg7HMRq0MKBS4u.webp",
    },
  ];
  await prisma.reward.createMany({ data: rewards });

  // Create some connections between users
  await Promise.all(
    users.flatMap((user1) =>
      users
        .filter((user2) => user1.id !== user2.id)
        .map((user2) =>
          prisma.connection.create({
            data: {
              userId: user1.id,
              friendId: user2.id,
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

  // Create daily tips for navigating Melbourne
  const tips = [
    {
      title: "Master Melbourne’s Public Transport with Myki",
      description:
        "Get a Myki card to access Melbourne’s trams, buses, and trains. Top up online or use Myki Money for casual trips and Myki Pass for unlimited travel. Remember: you don’t need to tap off on trams except outside the free tram zone!",
    },
    {
      title: "Free Tram Zone: Travel in Melbourne’s CBD for Free",
      description:
        "Melbourne’s Free Tram Zone covers the CBD and Docklands. Trams within this zone are free—just hop on and off without tapping your Myki. Check maps at tram stops or inside trams to see the boundaries.",
    },
    {
      title: "Discounted Travel for Students & Concession Holders",
      description:
        "International students can apply for iUSEpass to get cheaper Myki fares. Concession cards are also available for eligible students and residents. Use PTV’s website to check your eligibility and apply.",
    },
    {
      title: "Best Apps for Getting Around Melbourne",
      description:
        "Use apps like PTV (Public Transport Victoria) for live tram and train times, Google Maps for navigation, and Citymapper for alternative routes. Yarra Trams’ website also provides real-time updates.",
    },
    {
      title: "Where to Get Cheap and Discounted Attractions",
      description:
        "Many museums and attractions offer student discounts—bring your student ID! Use websites like Klook or Groupon for discounts on tours and activities. Some places also have free entry on specific days.",
    },
    {
      title: "Finding Budget-Friendly Accommodation",
      description:
        "Explore options like student housing, share houses (Flatmates.com.au), or temporary stays via hostel websites and Facebook groups. Uni notice boards and rental platforms can also help find short-term stays.",
    },
    {
      title: "Stay Safe While Exploring Melbourne",
      description:
        "Melbourne is safe, but stay alert at night in less busy areas. Use rideshare apps like Uber or Didi if traveling late. Save emergency numbers: 000 (police/fire/ambulance) and your university’s support line.",
    },
  ];

  await prisma.dailyTip.createMany({ data: tips });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
