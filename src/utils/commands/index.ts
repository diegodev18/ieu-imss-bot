import { authCommand } from "@/utils/commands/auth";
import { startCommand } from "@/utils/commands/start";
import { helpCommand } from "@/utils/commands/help";

export const commands = [
  {
    name: "auth",
    description: "Autentificate as admin",
    execute: authCommand,
  },
];

export const seoCommands = [
  {
    command: "start",
    description: "Start the bot",
    action: startCommand,
  },
  {
    command: "help",
    description: "Get help using the bot",
    action: helpCommand,
  },
];
