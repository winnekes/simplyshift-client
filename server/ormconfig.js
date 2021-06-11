export default {
  type: process.env.TYPEORM_CONNECTION,
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_HOST,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  entities: ["src/domains/**/*-entity.ts"],
  migrations: ["src/database/migrations/**/*.ts"],
  cli: {
    migrationsDir: "src/database/migrations",
  },
};
