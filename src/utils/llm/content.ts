import { ai } from "@/lib/llm";

export const get = async (contents: string) => {
  const response = await ai.models.generateContent({
    contents,
    config: {
      temperature: 0.7,
      maxOutputTokens: 1024,
    },
    model: "gemini-2.5-flash",
  });
};
