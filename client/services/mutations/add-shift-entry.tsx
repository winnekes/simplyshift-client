import { api } from "../api";

export type AddShiftEntryData = {
  shiftModelId: number;
  date: string;
};

export const addShiftEntryMutation = (data: AddShiftEntryData) => {
  return api.post("shift-entry", data);
};
