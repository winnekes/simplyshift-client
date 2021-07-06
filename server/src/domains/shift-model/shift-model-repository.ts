import {
  EntityRepository,
  FindConditions,
  FindOneOptions,
  IsNull,
  Not,
  Repository,
} from "typeorm";
import { User } from "../identity-access/user-entity";
import { ShiftModel } from "./shift-model-entity";

@EntityRepository(ShiftModel)
export class ShiftModelRepository extends Repository<ShiftModel> {
  findAllForUser(currentUser: User, options?: FindConditions<ShiftModel>) {
    return this.find({ user: currentUser, ...options });
  }

  findOneForUser(currentUser: User, options?: FindOneOptions<ShiftModel>) {
    return this.findOne({
      user: currentUser,
      deletedAt: Not(IsNull()),
      ...options,
    });
  }
}
