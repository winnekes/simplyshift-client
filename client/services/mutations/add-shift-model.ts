import { ShiftModel } from "../../types";
import { api } from "../api";

export type AddShiftModelData = Pick<
  ShiftModel,
  "name" | "color" | "startsAt" | "endsAt"
>;

export const addShiftModelMutation = (data: AddShiftModelData) => {
  return api.post("shift-model", data);
};
