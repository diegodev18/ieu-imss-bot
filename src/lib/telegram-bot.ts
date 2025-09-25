import { Telegraf } from "telegraf";
import { BOT_TOKEN } from "@/config";

if (!BOT_TOKEN) {
  throw new Error("BOT_TOKEN must be provided!");
}

export const bot = new Telegraf(BOT_TOKEN);
