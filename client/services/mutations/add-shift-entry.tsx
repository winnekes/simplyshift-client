import { api } from "../api";

export type AddShiftEntryData = {
  shiftModelId: number;
  startsAt: string;
};

export const addShiftEntryMutation = (data: AddShiftEntryData) => {
  return api.post("shift-entry", data);
};
