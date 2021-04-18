import { api } from "../api";

export type LoginMutationData = {
  email: string;
  password: string;
};

export const login = (data: LoginMutationData) => {
  return api.post("login", data);
};
