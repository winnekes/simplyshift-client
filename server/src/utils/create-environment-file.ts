import dotenv from "dotenv";
dotenv.config();

const environmentVariables = [
  "DATABASE_URL",
  "PORT",
  "JWT_SECRET",
  "GOOGLE_CLIENT_ID",
  "GOOGLE_CLIENT_SECRET",
  "GOOGLE_CALLBACK_URL",
  "FACEBOOK_APP_ID",
  "FACEBOOK_SECRET",
];

const modifiedEnvironmentVariables = [];

for (const variable of environmentVariables) {
  if (process.env[variable]) {
    modifiedEnvironmentVariables.push(`${variable}='${process.env[variable]}'`);
  }
}

console.log({ modifiedEnvironmentVariables });

process.stdout.write(modifiedEnvironmentVariables.join("\n"));
