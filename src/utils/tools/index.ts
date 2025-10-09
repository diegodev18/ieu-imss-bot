import { newTools, newToolDeclaration } from "@/utils/tools/new";
import { updateTool, updateToolDeclaration } from "@/utils/tools/update";
import { listTool, listToolDeclaration } from "@/utils/tools/list";
import { searchTool, searchToolDeclaration } from "@/utils/tools/search";
import type { FunctionDeclaration } from "@google/genai";
import type { Session } from "@/types";

export const toolsDeclarations: FunctionDeclaration[] = [
  newToolDeclaration,
  updateToolDeclaration,
  listToolDeclaration,
  searchToolDeclaration,
];

export const executeFunctionCall = async (
  functionName: string,
  functionArgs: any,
  session: Session,
) => {
  switch (functionName) {
    case "addNewEmployee":
      return await newTools(
        functionArgs.name as string,
        functionArgs.curp as string,
        functionArgs.rfc as string,
        functionArgs.position as string,
        functionArgs.salary as number,
        (functionArgs.status as "active" | "inactive") || "active",
        session.company.id as number,
      );

    case "updateEmployee":
      return await updateTool(
        functionArgs.propertyToUpdate as string,
        functionArgs.newValue as string,
        functionArgs.employeeId as number,
        functionArgs.curp as string,
        functionArgs.rfc as string,
      );

    case "listEmployees":
      return await listTool(session.company.id as number);

    case "searchTool":
      return await searchTool(
        functionArgs.name as string | undefined,
        functionArgs.curp as string | undefined,
        functionArgs.limit as number | undefined,
      );

    default:
      console.error("Función no reconocida:", functionName);
      return "Función desconocida.";
  }
};
