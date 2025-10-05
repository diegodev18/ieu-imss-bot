import { ai } from "@/lib/llm";
import { rules as promptRules } from "@/utils/llm/prompt";
import { toolsDeclarations } from "@/utils/tools";
import { newCommand } from "@/utils/tools/new";

const executeFunctionCall = async (functionName: string, functionArgs: any) => {
  console.log(`Ejecutando función: ${functionName}`, functionArgs);

  switch (functionName) {
    case "addNewEmployee":
      return await newCommand(
        functionArgs.name as string,
        functionArgs.curp as string,
        functionArgs.rfc as string,
        functionArgs.position as string,
        functionArgs.salary as number,
        (functionArgs.status as "active" | "inactive") || "active",
        functionArgs.companyId as number,
      );

    default:
      throw new Error(`Función desconocida: ${functionName}`);
  }
};

export const get = async (contents: string, rules: string = "") => {
  try {
    // Primera llamada al LLM
    const response = await ai.models.generateContent({
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

    // Si el LLM quiere llamar a una función
    if (response.functionCalls && response.functionCalls.length > 0) {
      const functionCall = response.functionCalls[0];
      const functionName = functionCall.name;
      const functionArgs = functionCall.args;

      if (!functionName || !functionArgs) {
        return "No se recibieron el nombre de la función o los argumentos.";
      }

      try {
        // Ejecutar la función
        const functionResult = await executeFunctionCall(
          functionName,
          functionArgs,
        );

        console.log("Resultado de la función:", functionResult);

        // Segunda llamada al LLM con el resultado de la función
        const followUpResponse = await ai.models.generateContent({
          contents: [
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
          ],
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
