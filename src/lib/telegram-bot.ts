import { Telegraf } from "telegraf";

if (!process.env.BOT_TOKEN) {
  throw new Error("BOT_TOKEN must be provided!");
}

export const bot = new Telegraf(process.env.BOT_TOKEN);
