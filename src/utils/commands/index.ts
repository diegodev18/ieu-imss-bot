import { authCommand } from "@/utils/commands/auth";
import { startCommand } from "@/utils/commands/start";
import { helpCommand } from "@/utils/commands/help";
import { newCommand } from "@/utils/commands/new";

interface Command {
  description: string;
  action: (ctx: any) => void;
}

type Commands = "auth" | "new";

type SeoCommands = "start" | "help";

export const commands: Record<Commands, Command> = {
  auth: {
    description: "Autentificate as admin",
    action: authCommand,
  },
  new: {
    description: "Create a new employee",
    action: newCommand,
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
