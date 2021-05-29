import { api } from "../api";

export type DeleteShiftModelData = {
  shiftModelId: number;
};

export const deleteShiftModelMutation = (data: DeleteShiftModelData) => {
  return api.delete(`shift-model/${data.shiftModelId}`);
};
