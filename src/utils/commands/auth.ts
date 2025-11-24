import { ContextWithSession } from "@/types";
import { prisma } from "@/lib/prisma";

export const authCommand = async (ctx: ContextWithSession) => {
  if (ctx.session) {
    await ctx.reply("Ya estás autenticado.");
    return;
  }

  let message: string | undefined;
  if (ctx.message && "text" in ctx.message) {
    message = (ctx.message as { text: string }).text;
  }

  const tokens = message?.split(" ");
  const authToken = tokens?.[1];

  if (!authToken) {
    await ctx.reply("Uso: /auth <auth_token>");
    return;
  }

  const authTokenRecord = await prisma.bot_sessions.findUnique({
    where: { auth_token: authToken },
  });
  if (!authTokenRecord || authTokenRecord.used) {
    await ctx.reply("Credenciales inválidas");
    return;
  }

  const chatId = ctx.chat?.id;
  if (!chatId) {
    await ctx.reply("No se pudo obtener el chat ID.");
    return;
  }

  await ctx.reply("Autenticación exitosa, registrando sesión...");

  try {
    const updateToken = await prisma.bot_sessions.update({
      where: { id: authTokenRecord.id },
      data: { used: true, chat_id: chatId, chat_metadata: ctx.from ?? {} },
    });
    console.log("Token actualizado:", updateToken.id);
  } catch (error) {
    await ctx.reply("Error al actualizar el estado del token.");
    return;
  }

  await ctx.reply("Sesión registrada exitosamente.");
};
