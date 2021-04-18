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
import { sign } from "../../utils/jwt";
import User from "./user";

@JsonController()
export default class UserController {
  @Authorized()
  @Get("/users/me")
  getUser(@CurrentUser() user: User) {
    console.log({ user });
    return User.findOne(user.id);
  }

  @Post("/users")
  async createUser(@Body() data: User & { passwordRepeated: string }) {
    const user = await User.findOne({ where: { email: data.email } });
    if (user) {
      throw new BadRequestError("A user with that email already exists.");
    }

    const { password, passwordRepeated, ...rest } = data;

    if (password !== passwordRepeated) {
      throw new BadRequestError("Passwords do not match.");
    }

    try {
      const entity = User.create(rest);
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
    const spec = routingControllersToSpec(storage);
    return spec;
  }
}
