import { SelectQueryBuilder } from "typeorm";
import { User } from "../../domains/identity-access/user-entity";

export class Scope<T> extends SelectQueryBuilder<T> {
  constructor(private currentUser: User, builder: SelectQueryBuilder<T>) {
    super(builder);
  }

  get forUser(): Scope<T> {
    return this.andWhere("user_id = :userId", { userId: this.currentUser.id });
  }
}
