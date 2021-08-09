import { EntityRepository, FindConditions, LessThan, MoreThan } from "typeorm";
import { BaseRepository } from "../../database/core/base-repository";
import { User } from "../identity-access/user-entity";
import { ShiftEntry } from "./shift-entry-entity";

@EntityRepository(ShiftEntry)
export class ShiftEntryRepository extends BaseRepository<ShiftEntry> {
  scoped(currentUser: User) {
    return this.getUserScope(
      currentUser,
      this.createQueryBuilder("shiftEntry")
    );
  }

  findOneForUserById(currentUser: User, shiftEntryId: number) {
    return this.scoped(currentUser)
      .where("id = :shiftEntryId", { shiftEntryId })
      .forUser.getOne();
  }

  // todo use userScope
  findAllForUserForSelectedMonth(
    currentUser: User,
    options?: FindConditions<ShiftEntry>
  ) {
    return this.find({ user: currentUser, ...options });
  }

  findConflictingEntriesForUser(
    currentUser: User,
    time: { startsAt: Date; endsAt: Date }
  ) {
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
    });
  }
}
