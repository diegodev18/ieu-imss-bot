import { prisma } from "@/lib/prisma";
import { Type, type FunctionDeclaration, type Schema } from "@google/genai";

const listToolParams: Schema = {
  type: Type.OBJECT,
  properties: {},
  required: [],
};

export const listToolDeclaration: FunctionDeclaration = {
  name: "listEmployees",
  description: "List all employees in the system (database)",
  parameters: listToolParams,
};

export const listTool = async (companyId: number) => {
  if (!companyId) {
    return "Company ID is required.";
  }

  try {
    const employees = await prisma.employees.findMany({
      where: { company_id: companyId },
    });

    if (employees.length === 0) {
      return "No employees found for the given company.";
    }

    return `Employees found: ${employees.map((emp) => JSON.stringify(emp)).join(", ")}`;
  } catch (error: any) {
    console.error("Error fetching employees:", error);

    return `Error fetching employees: ${error.message ?? "Unknown error"}`;
  }
};
