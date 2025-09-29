import { Context } from "telegraf";
import { prisma } from "@/lib/prisma";

export const authCommand = async (ctx: Context) => {
  let message: string | undefined;
  if (ctx.message && "text" in ctx.message) {
    message = (ctx.message as { text: string }).text;
  }

  const tokens = message?.split(" ");
  const user = tokens?.[1];
  const pass = tokens?.[2];

  if (!user || !pass) {
    await ctx.reply("Usage: /auth <username> <password>");
    return;
  }

  const isAuth = await prisma.admin_user_tokens.findFirst({
    where: { user: parseInt(user), password: pass },
  });
  if (isAuth) {
  }
};
