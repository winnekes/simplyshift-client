import { ShiftModel } from "../../types";
import { api } from "../api";

export const editShiftModelMutation = (data: ShiftModel) => {
  const { id, ...rest } = data;
  return api.put(`shift-model/${id}`, rest);
};
