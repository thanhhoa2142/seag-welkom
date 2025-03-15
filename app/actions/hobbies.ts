/** @format */

"use server";
import { prisma } from "@/lib/db";

export async function getHobbies() {
  return prisma.hobbyTag.findMany();
}

export async function getDailyTips() {
  const tips = await prisma.dailyTip.findMany();
  return tips;
}
