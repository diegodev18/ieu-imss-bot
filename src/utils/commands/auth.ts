import { Context } from "telegraf";

export const authCommand = (ctx: Context) => {
  ctx.reply(`Hi ${ctx.from?.first_name ?? "there"}, Authenticating...`);
};
