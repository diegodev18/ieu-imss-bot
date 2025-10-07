import { ai } from "@/lib/llm";
import { rules as promptRules } from "@/utils/llm/prompt";
import { toolsDeclarations } from "@/utils/tools";
import { newTools } from "@/utils/tools/new";
import { updateTool } from "@/utils/tools/update";
import { listTool } from "@/utils/tools/list";
import { searchTool } from "@/utils/tools/search";

const executeFunctionCall = async (
  functionName: string,
  functionArgs: any,
  session: any,
) => {
  switch (functionName) {
    case "addNewEmployee":
      return await newTools(
        functionArgs.name as string,
        functionArgs.curp as string,
        functionArgs.rfc as string,
        functionArgs.position as string,
        functionArgs.salary as number,
        (functionArgs.status as "active" | "inactive") || "active",
        session.company.id as number,
      );

    case "updateEmployee":
      return await updateTool(
        functionArgs.employeeId as number,
        functionArgs.curp as string,
        functionArgs.rfc as string,
      );

    case "listEmployees":
      return await listTool(session.company.id as number);

    case "searchTool":
      return await searchTool(
        functionArgs.name as string | undefined,
        functionArgs.curp as string | undefined,
        functionArgs.limit as number | undefined,
      );

    default:
      console.error("Función no reconocida:", functionName);
      return "Función desconocida.";
  }
};

const getContent = async (contents: string | any[], rules: string = "") =>
  await ai.models.generateContent({
    contents,
    config: {
      temperature: 0.7,
      maxOutputTokens: 500,
      systemInstruction: promptRules + rules,
      thinkingConfig: {
        thinkingBudget: 0,
      },
      tools: [
        {
          functionDeclarations: [...toolsDeclarations],
        },
      ],
    },
    model: "gemini-2.5-flash",
  });

export const get = async (
  contents: string,
  rules: string = "",
  session: any,
) => {
  try {
    const response = await getContent(contents, rules);

    if (response.functionCalls && response.functionCalls.length > 0) {
      const functionCall = response.functionCalls[0];
      const functionName = functionCall.name;
      const functionArgs = functionCall.args;

      if (!functionName || !functionArgs) {
        return "No se recibieron el nombre de la función o los argumentos.";
      }

      try {
        const functionResult = await executeFunctionCall(
          functionName,
          functionArgs,
          session,
        );

        const contentsPayload = [
          { role: "user", parts: [{ text: contents }] },
          {
            role: "model",
            parts: [
              { functionCall: { name: functionName, args: functionArgs } },
            ],
          },
          {
            role: "function",
            parts: [
              {
                functionResponse: {
                  name: functionName,
                  response: { result: functionResult },
                },
              },
            ],
          },
        ];

        const followUpResponse = await getContent(contentsPayload, rules);

        return followUpResponse.text ?? functionResult;
      } catch (error) {
        console.error("Error ejecutando función:", error);
        return "Error al ejecutar la función. Por favor intenta nuevamente.";
      }
    }

    return response.text ?? "No response from LLM.";
  } catch (error) {
    console.error("Error generating content:", error);

    return "Ocurrió un error al procesar tu solicitud.";
  }
};
