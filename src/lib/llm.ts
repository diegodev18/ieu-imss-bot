import { GoogleGenAI } from "@google/genai";

import { GOOGLE_GENAI_API_KEY } from "@/config";

export const ai = new GoogleGenAI({
  apiKey: GOOGLE_GENAI_API_KEY,
});
