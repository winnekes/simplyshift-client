import { User } from "../../types";
import { api } from "../api";

export type SignupMutationData = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  passwordRepeated: string;
};

export type SignupMutationResponse = { token: string; user: User };

export const signup = (data: SignupMutationData) => {
  return api.post<SignupMutationResponse>("users", data);
};
