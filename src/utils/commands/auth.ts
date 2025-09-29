import { Context } from "telegraf";

export const authCommand = (ctx: Context) => {
  let message: string | undefined;
  if (ctx.message && "text" in ctx.message) {
    message = (ctx.message as { text: string }).text;
  }

  ctx.reply(`Received message: ${message}`);
};
