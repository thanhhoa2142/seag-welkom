"use server";

import { z } from "zod";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

const TaskCreateSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  locationId: z.string().uuid(),
  points: z.number().min(0),
});

const TaskUpdateSchema = z.object({
  id: z.string().uuid(),
  isCompleted: z.boolean(),
});

export async function createTask(
  userId: string,
  data: z.infer<typeof TaskCreateSchema>
) {
  try {
    const validatedData = TaskCreateSchema.parse(data);

    const task = await prisma.task.create({
      data: {
        ...validatedData,
        userId,
      },
    });

    revalidatePath("/tasks");
    return { success: true, data: task };
  } catch (error) {
    console.error("Failed to create task:", error);
    return { success: false, error: "Failed to create task" };
  }
}

export async function updateTaskStatus(
  userId: string,
  data: z.infer<typeof TaskUpdateSchema>
) {
  try {
    const validatedData = TaskUpdateSchema.parse(data);

    const task = await prisma.task.findFirst({
      where: { id: validatedData.id, userId },
    });

    if (!task) return { success: false, error: "Task not found" };

    const updatedTask = await prisma.task.update({
      where: { id: validatedData.id },
      data: {
        isCompleted: validatedData.isCompleted,
        completedAt: validatedData.isCompleted ? new Date() : null,
      },
    });

    revalidatePath("/tasks");
    return { success: true, data: updatedTask };
  } catch (error) {
    console.error("Failed to update task:", error);
    return { success: false, error: "Failed to update task" };
  }
}

export async function getUserTasks(userId: string) {
  try {
    const tasks = await prisma.task.findMany({
      where: {
        userId,
      },
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
