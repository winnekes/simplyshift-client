import {
  EntityRepository,
  FindConditions,
  FindOneOptions,
  LessThan,
  MoreThan,
  Repository,
} from "typeorm";
import { User } from "../identity-access/user-entity";
import { ShiftEntry } from "./shift-entry-entity";

@EntityRepository(ShiftEntry)
export class ShiftEntryRepository extends Repository<ShiftEntry> {
  findAllForUser(currentUser: User, options?: FindConditions<ShiftEntry>) {
    return this.find({ user: currentUser, ...options });
  }

  findOneForUser(currentUser: User, options?: FindOneOptions<ShiftEntry>) {
    return this.findOne({ user: currentUser, ...options });
  }

  findConflictingEntriesForUser(
    currentUser: User,
    time: { startsAt: Date; endsAt: Date },
    options?: FindConditions<ShiftEntry>
  ) {
    console.log({ time });
    return this.find({
      where: [
        {
          user: currentUser,
          startsAt: LessThan(time.endsAt),
          endsAt: MoreThan(time.startsAt),
        },
        {
          user: currentUser,
          startsAt: time.endsAt,
          endsAt: time.startsAt,
        },
      ],
      ...options,
    });
  }
}
