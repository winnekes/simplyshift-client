import { ShiftModel } from "./shift-model-entity";

const earlyShift = {
  name: "Early shift",
  startsAt: "06:00",
  endsAt: "14:30",
  color: "#ffeb3b",
};

const afternoonShift = {
  name: "Afternoon shift",
  startsAt: "14:00",
  endsAt: "20:30",
  color: "#2196f3",
};

const nightShift = {
  name: "Night shift",
  startsAt: "20:00",
  endsAt: "06:30",
  color: "#2196f3",
};

export const sampleShiftModels: Pick<
  ShiftModel,
  "name" | "startsAt" | "endsAt" | "color"
>[] = [earlyShift, afternoonShift, nightShift];
