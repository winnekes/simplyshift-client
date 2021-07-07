import { Repository, SelectQueryBuilder } from "typeorm";
import { User } from "../../domains/identity-access/user-entity";
import { Scope } from "./scopes";

export class BaseRepository<T> extends Repository<T> {
  getUserScope(userContext: User, builder: SelectQueryBuilder<T>): Scope<T> {
    return new Scope<T>(userContext, builder).forUser;
  }
}
