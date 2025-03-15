"use server";

import { z } from "zod";
import { prisma, thisUser } from "@/lib/db";
import { put } from "@vercel/blob";

const TaskUpdateSchema = z.object({
  id: z.string().uuid(),
  photoDataUrl: z.any(),
});

export async function updateTaskStatus(data: z.infer<typeof TaskUpdateSchema>) {
  const user = await thisUser;
  if (!user) throw new Error("User not found");
  const userId = user.id;
  const { id, photoDataUrl } = TaskUpdateSchema.parse(data);

  let photoUrl = undefined;
  if (photoDataUrl) {
    const { url } = await put(`tasks/${id}/${userId}`, photoDataUrl, {
      access: "public",
    });
    photoUrl = url;
  }

  const task = await prisma.task.findFirst({ where: { id } });
  if (!task) throw Error("Task not found");

  const completedTask = await prisma.userTask.findFirst({
    where: { taskId: id, userId },
  });
  if (completedTask) {
    await prisma.userTask.delete({ where: { id: completedTask.id } });
  } else {
    await prisma.userTask.create({
      data: { taskId: id, userId, photoUrl },
    });
  }
}

export async function getUserTasks() {
  const user = await thisUser;
  if (!user) throw new Error("User not found");
  const userId = user.id;
  const tasks = await prisma.userTask.findMany({
    where: { userId },
  });

  return tasks;
}
