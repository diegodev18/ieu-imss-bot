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
    return response;
  } catch (error) {
    console.error("Error generating content:", error);
    return null;
  }
};
