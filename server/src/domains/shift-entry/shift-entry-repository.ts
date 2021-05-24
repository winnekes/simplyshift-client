import {
  EntityRepository,
  FindConditions,
  FindOneOptions,
  LessThan,
  LessThanOrEqual,
  MoreThan,
  MoreThanOrEqual,
  Repository,
} from "typeorm";
import User from "../identity-access/user";
import ShiftEntry from "./shift-entry";

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
    return this.find({
      where: {
        user: currentUser,
        startsAt: LessThan(time.endsAt),
        endsAt: MoreThan(time.startsAt),
      },
      ...options,
    });
  }
}
