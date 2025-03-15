"use server";

import { z } from "zod";
import { prisma, thisUser } from "@/lib/db";

const TaskUpdateSchema = z.object({
  id: z.string().uuid(),
  isCompleted: z.boolean(),
});

export async function updateTaskStatus(data: z.infer<typeof TaskUpdateSchema>) {
  const user = await thisUser;
  if (!user) throw new Error("User not found");
  const userId = user.id;
  const validatedData = TaskUpdateSchema.parse(data);

  const task = await prisma.task.findFirst({
    where: { id: validatedData.id },
  });

  if (!task) throw Error("Task not found");

  const completedTask = await prisma.userTask.findFirst({
    where: { taskId: validatedData.id, userId },
  });
  if (completedTask) {
    await prisma.userTask.delete({ where: { id: completedTask.id } });
  } else {
    await prisma.userTask.create({
      data: { taskId: validatedData.id, userId },
    });
  }
  return validatedData;
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
