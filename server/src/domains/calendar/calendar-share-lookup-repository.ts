import { EntityRepository } from "typeorm";
import { BaseRepository } from "../identity-access/base-repository";
import { User } from "../identity-access/user-entity";
import { CalendarShareLookup } from "./calendar-share-lookup-entity";

@EntityRepository(CalendarShareLookup)
export class CalendarShareLookupRepository extends BaseRepository<CalendarShareLookup> {
  scoped(currentUser: User) {
    return this.getScoped(
      currentUser,
      this.createQueryBuilder("calendarShareLookup")
    );
  }
  findOneForUserByUUID(currentUser: User, uuid: number) {
    return this.scoped(currentUser)
      .where("uuid = :uuid", { uuid })
      .forUser.getOne();
  }

  findOneForUserByCalendarId(currentUser: User, calendarId: number) {
    return this.scoped(currentUser)
      .where("calendar_id = :calendarId", { calendarId })
      .forUser.getOne();
  }
}
