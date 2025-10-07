import { newToolDeclaration } from "@/utils/tools/new";
import { deleteToolDeclaration } from "@/utils/tools/delete";
import { listToolDeclaration } from "@/utils/tools/list";
import { searchToolDeclaration } from "@/utils/tools/search";
import type { FunctionDeclaration } from "@google/genai";

export const toolsDeclarations: FunctionDeclaration[] = [
  newToolDeclaration,
  deleteToolDeclaration,
  listToolDeclaration,
  searchToolDeclaration,
];
