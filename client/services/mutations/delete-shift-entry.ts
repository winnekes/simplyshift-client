import { api } from "../api";

export type DeleteShiftEntryData = {
  shiftEntryId: number;
};

export const deleteShiftEntryMutation = (data: DeleteShiftEntryData) => {
  return api.delete(`shift-entry/${data.shiftEntryId}`);
};
