/** @format */

'use server';
import { prisma } from '@/lib/db';

export async function getHobbies() {
  return prisma.hobbyTag.findMany();
}

export async function getDailyTips() {
  const tips = await prisma.dailyTip.findMany();
  return tips;
}

export async function getFriends() {
  const { prisma, thisUser } = await import('@/lib/db');
  const { mockFriends } = await import('@/lib/constants');

  try {
    const user = await thisUser;
    if (!user) return mockFriends;

    const connections = await prisma.connection.findMany({
      where: { userId: user.id },
      include: {
        friend: true,
      },
    });

    // If no connections, return mock data
    return connections.length > 0 ? connections : mockFriends;
  } catch (error) {
    console.error('Error fetching connections:', error);
    return mockFriends;
  }
}
