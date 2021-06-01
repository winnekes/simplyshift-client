import moment from "moment";
import { momentLocalizer } from "react-big-calendar";
import { ShiftEntry, ShiftModel } from "../../types";
import { ShiftEntryEvent } from "./scheduler";

moment.locale("nl", {
  week: {
    dow: 1,
    doy: 1,
  },
});

export const localizer = momentLocalizer(moment);

export const slotPropGetter = () => {
  return {
    style: {
      backgroundColor: "red !important",
      color: "#ff0000",
    },
  };
};

export const createLocalShiftEntryEvent = (
  shiftModel: ShiftModel,
  startsAt: Date
): ShiftEntryEvent => {
  const { start, end } = getTimesForShiftEntryFromModel(startsAt, shiftModel);
  return { id: 0, title: shiftModel.name, color: shiftModel.color, start, end };
};

export const getTimesForShiftEntryFromModel = (
  date: Date,
  shiftModel: ShiftModel
) => {
  const startDate = moment.parseZone(date).startOf("day");
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

  return { start, end };
};

export const isConflictingTimeslot = (
  date: Date,
  shiftModel: ShiftModel,
  shiftEntries: ShiftEntry[]
) => {
  const { start, end } = getTimesForShiftEntryFromModel(date, shiftModel);

  const conflictingShiftEntry = shiftEntries?.find(
    (entry) =>
      moment(entry.startsAt) <= moment(end) &&
      moment(entry.endsAt) >= moment(start)
  );

  return !!conflictingShiftEntry;
};
