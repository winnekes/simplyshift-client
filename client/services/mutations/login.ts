import { User } from "../../types";
import { api } from "../api";

export type LoginMutationData = {
  email: string;
  password: string;
  stayLoggedIn: boolean;
};

export type LoginMutationResponse = { token: string; user: User };

export const loginMutation = (data: LoginMutationData) => {
  return api.post<LoginMutationResponse>("login", data);
};
