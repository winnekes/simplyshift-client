import {
  EntityRepository,
  FindConditions,
  FindOneOptions,
  Repository,
} from "typeorm";
import { User } from "../identity-access/user-entity";
import { CalendarShareLookup } from "./calendar-share-lookup-entity";

@EntityRepository(CalendarShareLookup)
export class CalendarShareLookupRepository extends Repository<CalendarShareLookup> {
  findAllForUser(
    currentUser: User,
    options?: FindConditions<CalendarShareLookup>
  ) {
    return this.find({ user: currentUser, ...options });
  }

  findOneForUser(
    currentUser: User,
    options?: FindOneOptions<CalendarShareLookup>
  ) {
    return this.findOne({ user: currentUser, ...options });
  }
}
