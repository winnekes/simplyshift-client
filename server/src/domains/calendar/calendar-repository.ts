import {
  EntityRepository,
  FindConditions,
  FindOneOptions,
  Repository,
} from "typeorm";
import { User } from "../identity-access/user-entity";
import { Calendar } from "./calendar-entity";

@EntityRepository(Calendar)
export class CalendarRepository extends Repository<Calendar> {
  findAllForUser(currentUser: User, options?: FindConditions<Calendar>) {
    return this.find({ user: currentUser, ...options });
  }

  findOneForUser(currentUser: User, options?: FindOneOptions<Calendar>) {
    return this.findOne({ user: currentUser, ...options });
  }

  findActiveOneForUser(currentUser: User, options?: FindOneOptions<Calendar>) {
    return this.findOne({ user: currentUser, isDefault: true, ...options });
  }
}
