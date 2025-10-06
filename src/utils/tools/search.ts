import { prisma } from "@/lib/prisma";
import { Type } from "@google/genai";

const searchToolParams = {
  type: Type.OBJECT,
  properties: {
    name: {
      type: Type.STRING,
      description: "The name of employee to search for in the database",
    },
    curp: {
      type: Type.STRING,
      description: "The CURP of employee to search for in the database",
    },
    limit: {
      type: Type.INTEGER,
      description: "Number of results to return",
      default: 5,
    },
  },
  required: [],
};

export const searchToolDeclaration = {
  name: "search_tool",
  description: "Use this tool to search for items in the database.",
  parameters: searchToolParams,
};

export const searchTool = async (
  name: string | undefined,
  curp: string | undefined,
  limit = 5,
) => {
  try {
    const results = await prisma.employees.findMany({
      where: {
        OR: [
          name
            ? {
                name: {
                  contains: name,
                  mode: "insensitive",
                },
              }
            : {},
          curp
            ? {
                curp: {
                  contains: curp,
                  mode: "insensitive",
                },
              }
            : {},
        ],
      },
      take: limit,
    });

    return results;
  } catch (error) {
    console.error("Error searching employees:", error);

    return [];
  }
};
