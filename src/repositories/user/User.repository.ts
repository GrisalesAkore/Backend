import { EntityRepository, Repository } from "typeorm";
import { Artist } from "../../entity/Artist";
import { User } from "../../entity/User";
import { UserDao } from "./User.types";

@EntityRepository(User)
class UserRepository extends Repository<User> {
  add(user: UserDao) {
    return this.insert(user);
  }
}

export default UserRepository;
