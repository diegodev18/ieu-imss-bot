import { bot } from "@/lib/telegram-bot";
import { seoCommands } from "@/utils/commands";
import { sessionMiddleware } from "@/utils/middlewares";
import { get as getContent } from "@/utils/llm/content";

bot.use(sessionMiddleware);

bot.start((ctx) => {
  seoCommands.start.action(ctx);
});

bot.help((ctx) => {
  seoCommands.help.action(ctx);
});

bot.on("text", async (ctx) => {
  if (!("session" in ctx) || !ctx.session) {
    ctx.reply("No session found. Please start a session first.");
    return;
  }

  const response = await getContent(ctx.message.text);

  ctx.reply(response?.text ?? "No response from LLM.");
});

bot.launch(() => {
  console.log("Bot is running...");
});
