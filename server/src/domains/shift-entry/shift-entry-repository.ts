import {
  EntityRepository,
  FindConditions,
  FindOneOptions,
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
}
