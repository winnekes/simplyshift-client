import { User } from "../../types";
import { api } from "../api";

export type LoginMutationData = {
  email: string;
  password: string;
};

export type LoginMutationResponse = { token: string; user: User };

export const login = (data: LoginMutationData) => {
  return api.post<LoginMutationResponse>("login", data);
};
