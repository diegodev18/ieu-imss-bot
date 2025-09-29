import { Context } from "telegraf";
import { prisma } from "@/lib/prisma";

export const sessionMiddleware = async (
  ctx: Context,
  next: () => Promise<void>,
) => {
  const chatId = ctx.chat?.id;
  if (!chatId) {
    await ctx.reply("No se pudo obtener el chat ID.");
    return;
  }

  const session = await prisma.sessions.findFirst({
    where: { chat_id: chatId },
  });

  (ctx as any).session = session;

  await next();
};
