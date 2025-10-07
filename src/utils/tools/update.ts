import { prisma } from "@/lib/prisma";
import { Type, type FunctionDeclaration, type Schema } from "@google/genai";

const updateToolParams: Schema = {
  type: Type.OBJECT,
  properties: {
    employeeId: {
      type: Type.NUMBER,
      description: "ID of the employee to update",
    },
    curp: { type: Type.STRING, description: "CURP of the employee to update" },
    rfc: { type: Type.STRING, description: "RFC of the employee to update" },
  },
  required: [],
};

export const updateToolDeclaration: FunctionDeclaration = {
  name: "updateEmployee",
  description: "Update an employee's information in the system",
  parameters: updateToolParams,
};

export const updateTool = async (
  employeeId?: number,
  curp?: string,
  rfc?: string,
) => {
  if (!employeeId && !curp && !rfc) {
    return "At least one identifier (employeeId, curp, or rfc) is required to delete an employee.";
  }

  const existingEmployee = await prisma.employees.findFirst({
    where: {
      OR: [
        employeeId ? { id: employeeId } : undefined,
        curp ? { curp } : undefined,
        rfc ? { rfc } : undefined,
      ].filter(Boolean) as any[],
    },
  });

  if (!existingEmployee) {
    return "No employee found with the provided identifier(s).";
  }

  try {
    await prisma.employees.update({
      where: { id: existingEmployee.id },
      data: {
        status: "inactive",
      },
    });
    return `Employee with ID ${existingEmployee.id} has been successfully updated.`;
  } catch (error) {
    console.error("Error updating employee:", error);
    return "An error occurred while trying to update the employee.";
  }
};
