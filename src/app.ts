import { bot } from "@/lib/telegram-bot";
import { commands, seoCommands } from "@/utils/commands";
import { sessionMiddleware } from "@/utils/middlewares";

bot.use(sessionMiddleware);

bot.start((ctx) => {
  seoCommands.start.action(ctx);
});

bot.help((ctx) => {
  seoCommands.help.action(ctx);
});

Object.entries(commands).forEach(([command, { action }]) => {
  bot.command(command, (ctx) => action(ctx));
});

bot.launch(() => {
  console.log("Bot is running...");
});
