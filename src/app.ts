import { bot } from "@/lib/telegram-bot";
import { commands, seoCommands } from "@/utils/commands";
import { sessionMiddleware } from "@/utils/middlewares";
import { get as getContent } from "@/utils/llm/content";
import type { ContextWithSession } from "@/types";

bot.use(sessionMiddleware);

bot.start((ctx) => {
  seoCommands.start.action(ctx);
});

bot.help((ctx) => {
  seoCommands.help.action(ctx);
});

bot.command("auth", commands.auth.action);

bot.on("text", async (ctx: ContextWithSession) => {
  if (!ctx.session) {
    ctx.reply(
      "No session found. Please start a session first. Use /auth <username> <password>",
    );
    return;
  }

  const response = await getContent(ctx.message.text, "", ctx.session);

  ctx.reply(response ?? "No response from LLM.");
});

bot.launch(() => {
  console.log("Bot is running...");
});
