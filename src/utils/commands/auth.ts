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
  const user = tokens?.[1];
  const pass = tokens?.[2];

  if (!user || !pass) {
    await ctx.reply("Uso: /auth <username> <contraseña>");
    return;
  }

  const isAuth = await prisma.admins.findFirst({
    where: { username: parseInt(user), password: pass },
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
    const updateToken = await prisma.admins.update({
      where: { id: isAuth.id },
      data: { status: "inactive" },
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
        admin_id: isAuth.id,
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
