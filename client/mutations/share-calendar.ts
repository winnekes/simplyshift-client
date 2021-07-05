import { Calendar } from "../types";
import { api } from "./api";

export type UnShareCalendarData = Pick<Calendar, "id">;

export const shareCalendarMutation = (data: UnShareCalendarData) => {
  return api.post(`calendars/${data.id}/share`);
};
