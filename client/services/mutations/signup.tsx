import { api } from "../api";

export type SignupMutationData = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  passwordRepeated: string;
};

export const signup = (data: SignupMutationData) => {
  return api.post("users", data);
};
