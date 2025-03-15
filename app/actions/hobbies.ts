/** @format */

'use server';
import { prisma } from '@/lib/db';

export async function getHobbies() {
  return prisma.hobbyTag.findMany();
}

export async function getDailyTip() {
  try {
    const tips = await prisma.dailyTip.findMany();
    return Response.json(tips);
  } catch (error) {
    console.error('Error fetching daily tips:', error);
    return new Response('Error fetching tips', { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
