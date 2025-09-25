import { Context } from "telegraf";

export const authCommand = (ctx: Context) => {
  ctx.reply("Authenticating...");
};
