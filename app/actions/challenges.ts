/** @format */

'use server';

import { z } from 'zod';
import { prisma } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { Prisma } from '@prisma/client';

const LocationSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  latitude: z.number(),
  longitude: z.number(),
  photoUrl: z.string().url().optional(),
  hasArHiddenReward: z.boolean().default(false),
  hiddenRewardId: z.string().uuid().optional(),
});

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
          select: {
            id: true,
            title: true,
            isCompleted: true,
          },
        },
        hiddenReward: true,
      },
    });

    return { success: true, data: locations };
  } catch (error) {
    console.error('Failed to fetch nearby locations:', error);
    return { success: false, error: 'Failed to fetch nearby locations' };
  }
}

export async function getLocationDetails(locationId: string) {
  try {
    const location = await prisma.location.findUnique({
      where: {
        id: locationId,
      },
      include: {
        tasks: {
          include: {
            user: {
              select: {
                id: true,
                username: true,
              },
            },
          },
        },
        hiddenReward: true,
        recommendations: {
          where: {
            endDate: {
              gte: new Date(),
            },
          },
        },
      },
    });

    if (!location) {
      return { success: false, error: 'Location not found' };
    }

    return { success: true, data: location };
  } catch (error) {
    console.error('Failed to fetch location details:', error);
    return { success: false, error: 'Failed to fetch location details' };
  }
}

export async function createLocation(data: z.infer<typeof LocationSchema>) {
  try {
    const validatedData = LocationSchema.parse(data);

    const location = await prisma.location.create({
      data: validatedData,
    });

    revalidatePath('/challenges');
    return { success: true, data: location };
  } catch (error) {
    console.error('Failed to create location:', error);
    return { success: false, error: 'Failed to create location' };
  }
}

export async function updateLocation(
  locationId: string,
  data: z.infer<typeof LocationSchema>
) {
  try {
    const validatedData = LocationSchema.parse(data);

    const location = await prisma.location.update({
      where: {
        id: locationId,
      },
      data: validatedData,
    });

    revalidatePath('/challenges');
    revalidatePath(`/challenges/${locationId}`);
    return { success: true, data: location };
  } catch (error) {
    console.error('Failed to update location:', error);
    return { success: false, error: 'Failed to update location' };
  }
}

export async function getPopularLocations() {
  try {
    const locations = await prisma.location.findMany({
      include: {
        _count: {
          select: {
            tasks: {
              where: {
                isCompleted: true,
              },
            },
          },
        },
        tasks: {
          take: 3,
          orderBy: {
            createdAt: 'desc',
          },
          select: {
            id: true,
            title: true,
          },
        },
      },
      orderBy: {
        tasks: {
          _count: 'desc',
        },
      },
      take: 10,
    });

    return { success: true, data: locations };
  } catch (error) {
    console.error('Failed to fetch popular locations:', error);
    return { success: false, error: 'Failed to fetch popular locations' };
  }
}

export type GetLocationByIdReturnType = Prisma.PromiseReturnType<
  typeof getLocationById
>;
export async function getLocationById(id: string) {
  return prisma.location.findUnique({
    where: { id },
    include: { tasks: true, hiddenReward: true },
  });
}
