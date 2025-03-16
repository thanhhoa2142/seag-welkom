"use server";

import { prisma } from "@/lib/db";

export async function getChatFromConnectionId(connectionId: string) {
  const connection = await prisma.connection.findFirst({
    where: { id: connectionId },
    include: { friend: true, user: true },
  });
  if (!connection) throw new Error("Connection");

  const { friendId, userId, friend, user } = connection;
  const chatConnections = await prisma.chatConnection.findMany({
    where: {
      OR: [
        { userOneId: friendId, userTwoId: userId },
        { userOneId: userId, userTwoId: friendId },
      ],
    },
    orderBy: { createdAt: "asc" },
  });

  return {
    user,
    friend,
    chatConnections,
  };
}

export async function createMessage({
  from,
  to,
  message,
}: {
  from: string;
  to: string;
  message: string;
}) {
  const connection = await prisma.chatConnection.create({
    data: { userOneId: from, userTwoId: to, message },
  });

  return connection;
}
