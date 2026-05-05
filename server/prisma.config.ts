import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prismaLib/schema.prismaLib",
  migrations: {
    path: "prismaLib/migrations",
  },
  datasource: {
    url: process.env["DATABASE_URL"],
  },
});
