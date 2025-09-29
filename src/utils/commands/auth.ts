import { Context } from "telegraf";
import { prisma } from "@/lib/prisma";

export const authCommand = async (ctx: Context) => {
  if (await prisma.sessions.findFirst({ where: { chat_id: ctx.chat?.id } })) {
    await ctx.reply("Ya estás autenticado.");
    return;
  }

  let message: string | undefined;
  if (ctx.message && "text" in ctx.message) {
    message = (ctx.message as { text: string }).text;
  }

  const tokens = message?.split(" ");
  const user = tokens?.[1];
  const pass = tokens?.[2];

  if (!user || !pass) {
    await ctx.reply("Uso: /auth <username> <contraseña>");
    return;
  }

  const isAuth = await prisma.admin_user_tokens.findFirst({
    where: { user: parseInt(user), password: pass },
  });
  if (!isAuth || isAuth.status !== "active") {
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
    const updateToken = await prisma.admin_user_tokens.update({
      where: { user: parseInt(user) },
      data: { status: "used" },
    });
    console.log("Token actualizado:", updateToken.id);
  } catch (error) {
    await ctx.reply("Error al actualizar el estado del token.");
    return;
  }
  try {
    const createSession = await prisma.sessions.create({
      data: {
        chat_id: chatId,
        admin_user_tokens_id: isAuth.id,
        user_metadata: JSON.stringify(ctx.from),
      },
    });
    console.log("Sesión creada:", createSession.id);
  } catch (error) {
    await ctx.reply("Error al crear la sesión.");
    return;
  }

  await ctx.reply("Sesión registrada exitosamente.");
};
