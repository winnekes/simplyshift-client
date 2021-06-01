import dotenv from "dotenv";
import { createConnection } from "typeorm";
import Calendar from "../domains/calendar/calendar";
import User from "../domains/identity-access/user";
import ShiftEntry from "../domains/shift-entry/shift-entry";
import ShiftModel from "../domains/shift-model/shift-model";
import { CustomNamingStrategy } from "./naming-strategy";

dotenv.config({
  path: __dirname + "/.env",
});

export const connectToDb = async () => {
  await createConnection({
    type: "postgres",
    url: process.env.DATABASE_URL,
    entities: [User, ShiftModel, ShiftEntry, Calendar],
    synchronize: process.env.NODE_ENV !== "production",
    logging: true,
    namingStrategy: new CustomNamingStrategy(),
  });

  console.log("Successfully connected to DB.");
};
