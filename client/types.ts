export type User = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
};

export type ShiftModel = {
  id: number;
  name: string;
  startsAt: Date;
  endsAt: Date;
  color: string;
};

export type ShiftEntry = {
  id: number;
  startsAt: Date;
  endsAt: Date;
  note: string;
  shiftModel: ShiftModel;
};
