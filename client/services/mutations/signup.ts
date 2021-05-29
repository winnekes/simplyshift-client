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

export const signupMutation = (data: SignupMutationData) => {
  return api.post<SignupMutationResponse>("users", data);
};

export type GoogleSignupMutationData = {
  tokenId: string;
};

export const googleSignUpMutation = (data: GoogleSignupMutationData) => {
  return api.post<SignupMutationResponse>("users/google", data);
};
