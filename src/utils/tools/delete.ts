import { prisma } from "@/lib/prisma";
import { Type } from "@google/genai";

const deleteToolParams = {
  type: Type.OBJECT,
  properties: {
    employeeId: {
      type: Type.NUMBER,
      description: "ID of the employee to delete",
    },
    curp: { type: Type.STRING, description: "CURP of the employee to delete" },
    rfc: { type: Type.STRING, description: "RFC of the employee to delete" },
  },
};

export const deleteToolDeclaration = {
  name: "deleteEmployee",
  description: "Delete an employee from the system",
  parameters: deleteToolParams,
};

export const deleteCommand = async (
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
    return `Employee with ID ${existingEmployee.id} has been successfully deleted.`;
  } catch (error) {
    console.error("Error deleting employee:", error);
    return "An error occurred while trying to delete the employee.";
  }
};
