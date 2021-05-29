import { ShiftModel } from "../../types";
import { api } from "../api";

export type EditShiftModelData = Pick<
  ShiftModel,
  "id" | "name" | "color" | "startsAt" | "endsAt"
>;

export const editShiftModelMutation = (data: EditShiftModelData) => {
  const { id, ...rest } = data;
  return api.put(`shift-model/${id}`, rest);
};
