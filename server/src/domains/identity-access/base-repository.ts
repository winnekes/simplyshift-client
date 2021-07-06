import { Repository, SelectQueryBuilder } from "typeorm";
import { User } from "./user-entity";

export class UserScope<T> extends SelectQueryBuilder<T> {
  constructor(private currentUser: User, builder: SelectQueryBuilder<T>) {
    super(builder);
  }

  get forUser(): UserScope<T> {
    return this.andWhere("user_id = :userId", { userId: this.currentUser.id });
  }
}

export class BaseRepository<T> extends Repository<T> {
  getScoped(userContext: User, builder: SelectQueryBuilder<T>): UserScope<T> {
    return new UserScope<T>(userContext, builder).forUser;
  }
}
