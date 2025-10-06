import { prisma } from "@/lib/prisma";
import { Type } from "@google/genai";

const listToolParams = {
  type: Type.OBJECT,
  properties: {},
  required: [],
};

export const listToolDeclaration = {
  name: "listEmployees",
  description: "List all employees in the system for a given company",
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

    return `Employees found: ${employees.map((emp) => emp.name).join(", ")}`;
  } catch (error: any) {
    console.error("Error fetching employees:", error);

    return `Error fetching employees: ${error.message ?? "Unknown error"}`;
  }
};
