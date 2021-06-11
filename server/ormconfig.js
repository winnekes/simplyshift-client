const Strategy = require("./lib/database/naming-strategy");

require("dotenv").config();

module.exports = {
  type: "postgres",
  url: process.env.DATABASE_URL,
  entities: ["lib/domains/**/*-entity.js"],
  migrations: ["lib/database/migrations/*.js"],
  cli: {
    migrationsDir: "src/database/migrations",
  },
  synchronize: false,
  logging: true,
  namingStrategy: new Strategy.CustomNamingStrategy(),
};
