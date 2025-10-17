import { bot } from "@/lib/telegram-bot";
import { commands, seoCommands } from "@/utils/commands";
import { sessionMiddleware } from "@/utils/middlewares";
import { get as getContent } from "@/utils/llm/content";
import type { ContextWithSession } from "@/types";

console.log("Starting bot...");

bot.use(sessionMiddleware);

bot.start((ctx) => {
  seoCommands.start.action(ctx);
});

bot.help((ctx) => {
  seoCommands.help.action(ctx);
});

bot.command("auth", commands.auth.action);

bot.on("text", async (ctx: ContextWithSession) => {
  console.log(
    `Received text from ${ctx.from.username || ctx.from.first_name || "unknown"} message:`,
    ctx.message.text,
  );

  if (!ctx.session) {
    ctx.reply(
      "No session found. Please start a session first. Use /auth <username> <password>",
    );
    return;
  }

  const response = await getContent(ctx.message.text, "", ctx.session);

  ctx.reply(response ?? "No response from LLM.");
});

bot
  .launch(() => {
    console.log("Bot is running...");
  })
  .catch((err) => {
    console.error("Failed to launch the bot:", err);
  });
