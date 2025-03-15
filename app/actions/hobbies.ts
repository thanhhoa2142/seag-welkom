"use server";
import { prisma } from "@/lib/db";

export async function getHobbies() {
  return prisma.hobbyTag.findMany();
}
