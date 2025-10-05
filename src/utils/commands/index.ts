import { authCommand } from "@/utils/commands/auth";
import { startCommand } from "@/utils/commands/start";
import { helpCommand } from "@/utils/commands/help";

interface Command {
  description: string;
  action: (ctx: any) => void;
}

type Commands = "auth";

type SeoCommands = "start" | "help";

export const commands: Record<Commands, Command> = {
  auth: {
    description: "Autentificate as admin",
    action: authCommand,
  },
};

export const seoCommands: Record<SeoCommands, Command> = {
  start: {
    description: "Start the bot",
    action: startCommand,
  },
  help: {
    description: "Get help using the bot",
    action: helpCommand,
  },
};
