import { EntityRepository } from "typeorm";
import { BaseRepository } from "../identity-access/base-repository";
import { User } from "../identity-access/user-entity";
import { Calendar } from "./calendar-entity";

@EntityRepository(Calendar)
export class CalendarRepository extends BaseRepository<Calendar> {
  findAllForUser(currentUser: User) {
    return this.getScoped(
      currentUser,
      this.createQueryBuilder()
    ).forUser.getOne();
  }

  findOneForUserByName(currentUser: User, calendarName: string) {
    return this.getScoped(currentUser, this.createQueryBuilder())
      .where("name = :calendarName", { calendarName })
      .forUser.getOne();
  }

  findOneForUserById(currentUser: User, calendarId: number) {
    return this.getScoped(currentUser, this.createQueryBuilder())
      .where("id = :calendarId", { calendarId })
      .forUser.getOne();
  }

  findActiveOneForUser(currentUser: User) {
    return this.getScoped(currentUser, this.createQueryBuilder("calendar"))
      .where("calendar.isDefault = true")
      .forUser.getOne();
  }
}
