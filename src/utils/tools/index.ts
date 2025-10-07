import { newToolDeclaration } from "@/utils/tools/new";
import { updateToolDeclaration } from "@/utils/tools/update";
import { listToolDeclaration } from "@/utils/tools/list";
import { searchToolDeclaration } from "@/utils/tools/search";
import type { FunctionDeclaration } from "@google/genai";

export const toolsDeclarations: FunctionDeclaration[] = [
  newToolDeclaration,
  updateToolDeclaration,
  listToolDeclaration,
  searchToolDeclaration,
];
