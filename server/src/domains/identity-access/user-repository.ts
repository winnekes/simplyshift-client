import { EntityRepository, FindOneOptions, Repository } from "typeorm";
import User from "./user-entity";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  findForUser(currentUser: User, options?: FindOneOptions<User>) {
    return this.findOne(currentUser.id, options);
  }
}
