import moment from "moment";
import { ShiftEntry, ShiftModel } from "../../types";
import { ShiftEntryEvent } from "./scheduler";

export const slotPropGetter = (date: Date) => {
  return {
    style: {
      backgroundColor: "red !important",
      color: "#ff0000",
    },
  };
};

export const createShiftEntryEvent = (
  shiftModel: ShiftModel,
  startsAt: Date
): ShiftEntryEvent => {
  const startDate = moment.parseZone(startsAt).startOf("day");
  const start = moment(startDate)
    .add(moment.duration(shiftModel.startsAt))
    .toDate();
  const end =
    shiftModel.startsAt > shiftModel.endsAt
      ? moment(startDate)
          .add(moment.duration(shiftModel.endsAt))
          .add("1", "day")
          .toDate()
      : moment(startDate).add(moment.duration(shiftModel.endsAt)).toDate();

  return { id: 0, title: shiftModel.name, color: shiftModel.color, start, end };
};
