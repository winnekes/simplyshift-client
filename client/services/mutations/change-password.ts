import { User } from "../../types";
import { api } from "../api";

export type ChangePasswordData = {
  password: string;
  passwordRepeated: string;
};

export const changePassword = (data: ChangePasswordData) => {
  return api.put<User>("users/profile/change-password", data);
};
