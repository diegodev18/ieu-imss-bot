import { authCommand } from "@/utils/commands/auth";
import { startCommand } from "@/utils/commands/start";
import { helpCommand } from "@/utils/commands/help";

interface Command {
  description: string;
  action: (ctx: any) => void;
}

export const commands: Record<string, Command> = {
  auth: {
    description: "Autentificate as admin",
    action: authCommand,
  },
};

export const seoCommands: Record<string, Command> = {
  start: {
    description: "Start the bot",
    action: startCommand,
  },
  help: {
    description: "Get help using the bot",
    action: helpCommand,
  },
};
