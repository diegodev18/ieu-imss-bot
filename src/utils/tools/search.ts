import { prisma } from "@/lib/prisma";
import { Type, type FunctionDeclaration, type Schema } from "@google/genai";

const searchToolParams: Schema = {
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

export const searchToolDeclaration: FunctionDeclaration = {
  name: "searchTool",
  description:
    "Search for employees in the database. You can search by name only, CURP only, or both. All parameters are optional - use whatever information the user provides. If the user only gives you a name, search by name without asking for CURP or RFC.",
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

    if (results.length === 0) {
      return "No employees found matching the search criteria.";
    }

    return `Employees found by query: ${JSON.stringify(results)}`;
  } catch (error: any) {
    console.error("Error searching employees:", error);

    return `Error searching employees: ${error.message ?? "Unknown error"}`;
  }
};
