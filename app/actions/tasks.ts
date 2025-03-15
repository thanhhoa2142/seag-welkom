"use server";

import { z } from "zod";
import { prisma, thisUser } from "@/lib/db";
import { revalidatePath } from "next/cache";

const TaskUpdateSchema = z.object({
  id: z.string().uuid(),
  isCompleted: z.boolean(),
});

export async function updateTaskStatus(data: z.infer<typeof TaskUpdateSchema>) {
  const user = await thisUser;
  if (!user) return { success: false, error: "User not found" };
  const userId = user.id;
  try {
    const validatedData = TaskUpdateSchema.parse(data);

    const task = await prisma.task.findFirst({
      where: { id: validatedData.id, userId },
    });

    if (!task) return { success: false, error: "Task not found" };

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
    revalidatePath("/tasks");
    return { success: true, data: validatedData };
  } catch (error) {
    console.error("Failed to update task:", error);
    return { success: false, error: "Failed to update task" };
  }
}

export async function getUserTasks(locationId?: string) {
  const user = await thisUser;
  if (!user) return { success: false, error: "User not found" };
  const userId = user.id;
  try {
    const tasks = await prisma.task.findMany({
      where: { userId, locationId },
      include: {
        location: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return { success: true, data: tasks };
  } catch (error) {
    console.error("Failed to fetch tasks:", error);
    return { success: false, error: "Failed to fetch tasks" };
  }
}
