import dotenv from "dotenv";
import { createConnection } from "typeorm";
import Calendar from "../domains/calendar/calendar-entity";
import User from "../domains/identity-access/user-entity";
import ShiftEntry from "../domains/shift-entry/shift-entry-entity";
import ShiftModel from "../domains/shift-model/shift-model-entity";
import { CustomNamingStrategy } from "./naming-strategy";

dotenv.config({
  path: __dirname + "/.env",
});

export const connectToDb = async () => {
  await createConnection({
    type: "postgres",
    url: process.env.DATABASE_URL,
    entities: [User, ShiftModel, ShiftEntry, Calendar],
    synchronize: false,
    logging: true,
    namingStrategy: new CustomNamingStrategy(),
  });

  console.log("Successfully connected to DB.");
};
