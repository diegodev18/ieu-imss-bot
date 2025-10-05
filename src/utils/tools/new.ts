import { prisma } from "@/lib/prisma";

export const newCommand = async (
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
