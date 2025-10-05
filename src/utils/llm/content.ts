import { ai } from "@/lib/llm";
import { rules as promptRules } from "@/utils/llm/prompt";
import { toolsDeclarations } from "@/utils/tools";

export const get = async (contents: string, rules: string = "") => {
  try {
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

    if (response.functionCalls && response.functionCalls.length > 0) {
      const functionCall = response.functionCalls[0];
      const functionName = functionCall.name;
      const functionArgs = functionCall.args;

      switch (functionName) {
        case "addNewEmployee":
          //   // Call your function to add a new employee with the provided arguments
          //   // Example: await addNewEmployee(functionArgs);
          return `Function ${functionName} called with arguments: ${JSON.stringify(
            functionArgs,
          )}`;

        default:
          return `Unknown function: ${functionName}`;
      }
    }

    return response;
  } catch (error) {
    console.error("Error generating content:", error);
    return null;
  }
};
