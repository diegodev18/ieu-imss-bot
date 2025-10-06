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

  const session = (await prisma.sessions.findFirst({
    where: { chat_id: chatId },
  })) as any;

  if (!session) {
    return await next();
  }

  const admin = await prisma.admins.findFirst({
    where: { id: session.id },
  });

  session.company = admin?.company_id
    ? await prisma.companies.findFirst({
        where: { id: admin.company_id },
      })
    : null;

  (ctx as any).session = session;

  await next();
};
