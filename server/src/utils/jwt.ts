import dotenv from "dotenv";
import * as jwt from "jsonwebtoken";
import { assert } from "./assert";

dotenv.config();

const secret = process.env.JWT_SECRET;
assert(secret, "No environment variables set.");

interface TokenPayload {
  id: number;
}

export const sign = (data: TokenPayload, expiresIn: string | number): string =>
  jwt.sign({ data }, secret, { expiresIn });

export const verify = (token: string): { data: TokenPayload } =>
  jwt.verify(token, secret) as { data: TokenPayload };
