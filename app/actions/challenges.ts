"use server";
import { prisma } from "@/lib/db";
import { Prisma } from "@prisma/client";

export async function getNearbyLocations(
  lat: number,
  lng: number,
  radiusKm: number = 5
) {
  try {
    const locations = await prisma.location.findMany({
      where: {
        AND: [
          {
            latitude: {
              gte: lat - radiusKm / 111.32, // roughly convert km to degrees
              lte: lat + radiusKm / 111.32,
            },
          },
          {
            longitude: {
              gte: lng - radiusKm / (111.32 * Math.cos(lat * (Math.PI / 180))),
              lte: lng + radiusKm / (111.32 * Math.cos(lat * (Math.PI / 180))),
            },
          },
        ],
      },
      include: {
        tasks: {
          select: { id: true, description: true },
        },
      },
    });

    return { success: true, data: locations };
  } catch (error) {
    console.error("Failed to fetch nearby locations:", error);
    return { success: false, error: "Failed to fetch nearby locations" };
  }
}

export async function getPopularLocations() {
  const locations = await prisma.location.findMany({
    include: {
      _count: { select: { tasks: true } },
      tasks: {
        take: 3,
        orderBy: { createdAt: "desc" },
      },
    },
    orderBy: {
      tasks: { _count: "desc" },
    },
    take: 10,
  });

  return locations;
}

export type GetLocationByIdReturnType = Prisma.PromiseReturnType<
  typeof getLocationById
>;
export async function getLocationById(id: string) {
  const location = await prisma.location.findUnique({
    where: { id },
    include: { tasks: true },
  });
  return location;
}
