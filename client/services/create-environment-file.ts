import dotenv from "dotenv";
dotenv.config();

const environmentVariables = [
  "NEXT_PUBLIC_BACKEND_URL",
  "NEXT_PUBLIC_GOOGLE_CLIENT_ID",
  "NEXT_PUBLIC_FACEBOOK_APP_ID",
];

const modifiedEnvironmentVariables = [];

for (const variable of environmentVariables) {
  if (process.env[variable]) {
    modifiedEnvironmentVariables.push(`${variable}='${process.env[variable]}'`);
  }
}

process.stdout.write(modifiedEnvironmentVariables.join("\n"));
