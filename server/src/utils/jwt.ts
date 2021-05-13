import * as jwt from "jsonwebtoken";

// todo env only
const secret = process.env.JWT_SECRET || "i love robots";
const ttl = "1 day";

interface JwtPayload {
  id: number;
}

export const sign = (data: JwtPayload) =>
  jwt.sign({ data }, secret, { expiresIn: ttl });

export const verify = (token: string): { data: JwtPayload } =>
  jwt.verify(token, secret) as { data: JwtPayload };
