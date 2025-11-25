import * as fs from "fs";
import * as path from "path";
import type { EnvConfig } from "./env.types";

function loadEnvConfig(): EnvConfig {
  const envName = process.env.ENV || "stg";
  const filePath = path.join(__dirname, "environments", `${envName}.json`);

  if (!fs.existsSync(filePath)) {
    throw new Error(`Env config not found for ENV='${envName}'. Expected file: ${filePath}`);
  }

  const raw = fs.readFileSync(filePath, "utf-8");
  const parsed = JSON.parse(raw);

  return parsed as EnvConfig;
}

export const envConfig: EnvConfig = loadEnvConfig();
