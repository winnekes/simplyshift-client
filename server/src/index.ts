import "reflect-metadata";
import { Action, BadRequestError, createKoaServer } from "routing-controllers";
import { connectToDb } from "./db";
import { verify } from "./jwt";
import UserController from "./identity-access/controller";
import User from "./identity-access/entity";
import LoginController from "./logins/controller";
import ShiftModelController from "./shiftModels/controller";
import SpecController from "./specs/controllers";
import ShiftEntryController from "./shiftEntries/controller";

import dotenv from "dotenv";
import { JsonWebTokenError } from "jsonwebtoken";
dotenv.config();

const port = process.env.PORT;

const app = createKoaServer({
  cors: true,
  controllers: [
    UserController,
    LoginController,
    ShiftModelController,
    ShiftEntryController,
    SpecController,
  ],
  authorizationChecker: async (action: Action) => {
    console.log(action.request.headers);
    const header: string = action.request.headers.authorization;
    if (header && header.startsWith("Bearer ")) {
      const [, token] = header.split(" ");

      // todo better Auth check (is decoded ID a user)
      try {
        const userId = verify(token).data;
        return !!(await User.findOne(userId));
      } catch (e) {
        if (e instanceof JsonWebTokenError) {
          throw new BadRequestError("JWT expired");
        }
      }
    }
    return false;
  },
  currentUserChecker: async (action: Action) => {
    const header: string = action.request.headers.authorization;
    if (header && header.startsWith("Bearer ")) {
      const [, token] = header.split(" ");

      return await User.findOne(verify(token).data);
    }
    return;
  },
});

async function initialiseServer() {
  await connectToDb();
  app.listen(port, () => console.log(`Listening on port ${port}`));
}

initialiseServer();
