import { Context } from "telegraf";

export const newCommand = (ctx: Context) => {
  ctx.reply("Creating a new employee...");
};
