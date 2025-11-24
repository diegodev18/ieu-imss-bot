import { defineConfig } from "prisma/config";
import { config } from "dotenv";

if (process.env.NODE_ENV !== "production") {
  config({ path: ".env", override: true, quiet: true });
}

export default defineConfig({
  datasource: {
    url:
      process.env.PSQL_CONNECTION_STRING ||
      "postgresql://user:password@localhost:5432/mydb",
  },
});
