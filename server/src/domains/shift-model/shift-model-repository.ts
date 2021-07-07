import { EntityRepository } from "typeorm";
import { BaseRepository } from "../../database/core/base-repository";
import { User } from "../identity-access/user-entity";
import { ShiftModel } from "./shift-model-entity";

@EntityRepository(ShiftModel)
export class ShiftModelRepository extends BaseRepository<ShiftModel> {
  scoped(currentUser: User) {
    return this.getUserScope(currentUser, this.createQueryBuilder("calendar"));
  }

  findAllForUser(currentUser: User) {
    return this.scoped(currentUser).getMany();
  }

  findOneForUserById(currentUser: User, shiftModelId: number) {
    return this.scoped(currentUser)
      .where("id = :shiftModelId", { shiftModelId })
      .forUser.getOne();
  }

  findOneForUserByName(currentUser: User, shiftModelName: string) {
    return this.scoped(currentUser)
      .where("name = :shiftModelName", { shiftModelName })
      .forUser.getOne();
  }
}
