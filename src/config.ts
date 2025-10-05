if (process.env.NODE_ENV !== "production" && "loadEnvFile" in process) {
  process.loadEnvFile(".env");
}

export const { BOT_TOKEN, GOOGLE_GENAI_API_KEY } = process.env;
