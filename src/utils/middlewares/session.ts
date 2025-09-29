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
  if (!session) {
    await ctx.reply(
      "No estás autenticado. Usa /auth <username> <contraseña> para autenticarte.",
    );
    return;
  }

  // Attach session info to context for downstream handlers
  (ctx as any).session = session;

  await next();
};
