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

  let session;

  session = await prisma.bot_sessions.findFirst({
    where: { chat_id: chatId.toString() },
  });
  if (!session) {
    return await next();
  }
  session = { ...session, chat_metadata: session.chat_metadata || {} };

  const company = await prisma.bot_sessions.findFirst({
    where: { id: session.id as number },
  });
  if (!company) {
    return await next();
  }
  session = { ...session, company };

  (ctx as any).session = session;

  await next();
};
