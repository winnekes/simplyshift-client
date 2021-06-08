import { api } from "./api";

export const deleteAccountMutation = () => {
  return api.delete(`users`);
};
