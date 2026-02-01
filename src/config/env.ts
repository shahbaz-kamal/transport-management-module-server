import dotenv from "dotenv";

dotenv.config();

interface EnvVars {
  DATABASE_URL: string;
  PORT: string;
  NODE_ENV: string;
  BCRYPT_SALT_ROUND: string;
}

const loadEnvironmentVariables = (): EnvVars => {
  const requiredVariables: string[] = ["DATABASE_URL", "PORT", "NODE_ENV", "BCRYPT_SALT_ROUND"];

  requiredVariables.forEach((key) => {
    if (!process.env[key]) throw new Error(`Missing Environment variable: ${key}`);
  });

  return {
    DATABASE_URL: process.env.DATABASE_URL as string,
    NODE_ENV: process.env.NODE_ENV as string,
    PORT: process.env.PORT as string,
    BCRYPT_SALT_ROUND: process.env.BCRYPT_SALT_ROUND as string,
  };
};

export const envVars: EnvVars = loadEnvironmentVariables();
