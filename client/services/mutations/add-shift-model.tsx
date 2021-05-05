import { ShiftModel } from "../../types";
import { api } from "../api";

export type AddShiftModelData = Omit<ShiftModel, "id">;

export const addShiftModelMutation = (data: AddShiftModelData) => {
  return api.post("shift-model", data);
};
