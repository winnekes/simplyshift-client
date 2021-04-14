import {
  JsonController,
  Get,
  Body,
  Post,
  getMetadataArgsStorage,
  Authorized,
  CurrentUser,
  Res,
} from "routing-controllers";
import { routingControllersToSpec } from "routing-controllers-openapi";
import User from "./entity";

@JsonController()
export default class UserController {
  @Authorized()
  @Get("/users/me")
  getUser(@CurrentUser() user: User) {
    console.log({ user });
    return User.findOne(user.id);
  }

  @Post("/users")
  async createUser(@Body() user: User, @Res() response: any) {
    const { password, ...rest } = user;
    const entity = User.create(rest);

    try {
      await entity.setPassword(password);
      return await entity.save();
    } catch (err) {
      // todo: check for error type (duplicate?)
      response.status = 400;
      response.body = { message: "Cannot create this user." };
    }
  }

  @Get("/spec")
  getSpec() {
    const storage = getMetadataArgsStorage();
    const spec = routingControllersToSpec(storage);
    return spec;
  }
}
