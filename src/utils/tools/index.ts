import { newToolDeclaration } from "@/utils/tools/new";
import { deleteToolDeclaration } from "@/utils/tools/delete";
import { listToolDeclaration } from "@/utils/tools/list";
import { searchToolDeclaration } from "@/utils/tools/search";

export const toolsDeclarations = [
  newToolDeclaration,
  deleteToolDeclaration,
  listToolDeclaration,
  searchToolDeclaration,
];
