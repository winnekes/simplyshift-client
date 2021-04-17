import { api } from "../api";

export type LoginMutationData = {
  email: string;
  password: string;
};

export const login = ({ email, password }: LoginMutationData) => {
  return api.post("login", { email, password });
};
