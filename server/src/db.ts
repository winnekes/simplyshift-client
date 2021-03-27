import { createConnection } from "typeorm";
import { DefaultNamingStrategy } from "typeorm/naming-strategy/DefaultNamingStrategy";
import { NamingStrategyInterface } from "typeorm/naming-strategy/NamingStrategyInterface";
import { snakeCase } from "typeorm/util/StringUtils";
import User from "./users/entity";
import ShiftModel from "./shiftModels/entity";
import ShiftEntry from "./shiftEntries/entity";

import dotenv from "dotenv";
dotenv.config({
  path: __dirname + "/.env",
});

class CustomNamingStrategy
  extends DefaultNamingStrategy
  implements NamingStrategyInterface {
  tableName(targetName: string, userSpecifiedName: string): string {
    return userSpecifiedName ? userSpecifiedName : snakeCase(targetName) + "s";
  }

  columnName(
    propertyName: string,
    customName: string,
    embeddedPrefixes: string[]
  ): string {
    return snakeCase(
      embeddedPrefixes.concat(customName ? customName : propertyName).join("_")
    );
  }

  columnNameCustomized(customName: string): string {
    return customName;
  }

  relationName(propertyName: string): string {
    return snakeCase(propertyName);
  }
}

export const connectToDb = async () => {
  await createConnection({
    type: "postgres",
    url: process.env.DATABASE_URL,
    entities: [User, ShiftModel, ShiftEntry],
    synchronize: true,
    logging: true,
    namingStrategy: new CustomNamingStrategy(),
  });

  console.log("Successfully connected to DB.");
};
