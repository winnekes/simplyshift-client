export type User = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: Date;
  updatedAt: Date;
};

export type ShiftModel = {
  id: number;
  name: string;
  startsAt: string;
  endsAt: string;
  color: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};

export type ShiftEntry = {
  id: number;
  startsAt: Date;
  endsAt: Date;
  note: string;
  shiftModel: ShiftModel;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};
