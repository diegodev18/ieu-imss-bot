import { prisma } from "@/lib/prisma";
import { Type } from "@google/genai";

const newToolParams = {
  type: Type.OBJECT,
  properties: {
    name: { type: Type.STRING, description: "Full name of the employee" },
    curp: { type: Type.STRING, description: "CURP of the employee" },
    rfc: { type: Type.STRING, description: "RFC of the employee" },
    position: {
      type: Type.STRING,
      description: "Job position of the employee",
    },
    salary: {
      type: Type.NUMBER,
      description: "Mensual salary of the employee",
    },
    status: {
      type: Type.STRING,
      enum: ["active", "inactive"],
      description: "Employment status",
    },
    companyId: { type: Type.NUMBER, description: "ID of the company" },
  },
  required: ["name", "curp", "rfc", "position", "salary", "companyId"],
};

export const newToolDeclaration = {
  name: "addNewEmployee",
  description: "Create a new employee in the system",
  parameters: newToolParams,
};

const newCommand = async (
  name: string,
  curp: string,
  rfc: string,
  position: string,
  salary: number,
  status: "active" | "inactive" = "active",
  companyId: number,
) => {
  if (!name || !curp || !rfc || !position || !salary || !companyId) {
    return "All fields are required.";
  }

  const existingEmployee = await prisma.employees.findFirst({
    where: {
      OR: [{ curp }, { rfc }],
    },
  });
  if (existingEmployee) {
    return "Employee with the same CURP or RFC already exists.";
  }

  try {
    const createdEmployee = await prisma.employees.create({
      data: {
        name,
        curp,
        rfc,
        position,
        salary,
        status,
        company_id: companyId,
      },
    });
    return `Employee created successfully with ID: ${createdEmployee.id}`;
  } catch (error) {
    console.error("Error creating employee:", error);
    return "Failed to create employee. Please try again.";
  }
};
