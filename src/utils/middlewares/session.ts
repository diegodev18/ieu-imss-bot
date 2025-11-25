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

  const session = (await prisma.bot_sessions.findFirst({
    where: { chat_id: chatId.toString() },
  })) as any;

  if (!session) {
    return await next();
  }

  try {
    session.user_metadata = session.user_metadata
      ? JSON.parse(session.user_metadata)
      : {};
  } catch {}

  const admin = await prisma.companies.findUnique({
    where: { id: session.created_by as number },
  });

  session.company = admin?.id
    ? await prisma.companies.findUnique({
        where: { id: admin.id },
      })
    : null;

  (ctx as any).session = session;

  await next();
};
