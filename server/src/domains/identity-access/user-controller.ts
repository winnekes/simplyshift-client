import {
  JsonController,
  Get,
  Body,
  Post,
  getMetadataArgsStorage,
  Authorized,
  CurrentUser,
  BadRequestError,
} from "routing-controllers";
import { routingControllersToSpec } from "routing-controllers-openapi";
import { getCustomRepository } from "typeorm";
import { sign } from "../../utils/jwt";
import User from "./user";
import { UserRepository } from "./user-repository";

@JsonController()
export default class UserController {
  private userRepository = getCustomRepository(UserRepository);

  @Authorized()
  @Get("/users/profile")
  async getUser(@CurrentUser() user: User) {
    return user;
  }

  @Post("/users")
  async createUser(@Body() data: User & { passwordRepeated: string }) {
    const user = await this.userRepository.findOne({
      where: { email: data.email },
    });
    if (user) {
      throw new BadRequestError("A user with that email already exists.");
    }

    const { password, passwordRepeated, ...rest } = data;

    if (password !== passwordRepeated) {
      throw new BadRequestError("Passwords do not match.");
    }

    try {
      const entity = this.userRepository.create(rest);
      await entity.setPassword(password);
      const user = await entity.save();
      const jwt = sign({ id: user.id });
      return { jwt, user };
    } catch (err) {
      throw new BadRequestError("Something went wrong");
    }
  }

  @Get("/spec")
  getSpec() {
    const storage = getMetadataArgsStorage();
    return routingControllersToSpec(storage);
  }
}
