"use server";

import { prisma, thisUser } from "@/lib/db";
import { mainLangflow } from "@/lib/langflow/server";

export async function askLangflow(inputValue: string) {
  const user = await thisUser;
  if (!user) throw new Error("User not found");
  const response = await mainLangflow.run(inputValue);
  const output = response.chatOutputText();
  if (!output)
    throw new Error(
      "Sorry, Kom is travelling right now, please try again later"
    );
  await prisma.chatbotLog.create({
    data: { userId: user.id, messageText: inputValue, responseText: output },
  });
}

export async function getChatLogs() {
  const user = await thisUser;
  if (!user) throw new Error("User not found");
  const logs = await prisma.chatbotLog.findMany({
    where: { userId: user.id },
    orderBy: { timestamp: "asc" },
  });
  return logs;
}
