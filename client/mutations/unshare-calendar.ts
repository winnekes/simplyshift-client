import { Calendar } from "../types";
import { api } from "./api";

export type UnShareCalendarData = Pick<Calendar, "id">;

export const unshareCalendarMutation = (data: UnShareCalendarData) => {
  return api.delete(`calendars/${data.id}/unshare`);
};
