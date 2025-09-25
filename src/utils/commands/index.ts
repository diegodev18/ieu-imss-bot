import { authCommand } from "@/utils/commands/auth";
import { startCommand } from "@/utils/commands/start";
import { helpCommand } from "@/utils/commands/help";

export const commands = {
  auth: {
    description: "Autentificate as admin",
    execute: authCommand,
  },
};

export const seoCommands = {
  start: {
    description: "Start the bot",
    action: startCommand,
  },
  help: {
    description: "Get help using the bot",
    action: helpCommand,
  },
};
