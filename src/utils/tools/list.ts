import { prisma } from "@/lib/prisma";
import { Type } from "@google/genai";

const listToolParams = {
  type: Type.OBJECT,
  properties: {
    companyId: { type: Type.NUMBER, description: "ID of the company" },
  },
  required: ["companyId"],
};

export const listToolDeclaration = {
  name: "listEmployees",
  description: "List all employees in the system for a given company",
  parameters: listToolParams,
};

export const listTools = async (companyId: number) => {
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

    return employees;
  } catch (error: any) {
    console.error("Error fetching employees:", error);

    return `Error fetching employees: ${error.message ?? "Unknown error"}`;
  }
};
