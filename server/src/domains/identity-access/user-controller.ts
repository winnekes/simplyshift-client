import {
  JsonController,
  Get,
  Body,
  Post,
  getMetadataArgsStorage,
  Authorized,
  CurrentUser,
} from "routing-controllers";
import { routingControllersToSpec } from "routing-controllers-openapi";
import { getCustomRepository } from "typeorm";
import { ExtendedHttpError } from "../../utils/extended-http-error";
import { sign } from "../../utils/jwt";
import User from "./user";
import { UserRepository } from "./user-repository";
import { UserService } from "./user-service";
const { OAuth2Client } = require("google-auth-library");

@JsonController()
export default class UserController {
  private userRepository = getCustomRepository(UserRepository);
  private userService = new UserService();
  private googleClient = new OAuth2Client(process.env.CLIENT_ID);

  @Authorized()
  @Get("/users/profile")
  async getUser(@CurrentUser() user: User) {
    return user;
  }

  @Post("/users")
  async createUser(@Body() data: User & { passwordRepeated: string }) {
    const existingUser = await this.userRepository.findOne({
      where: { email: data.email },
    });
    if (existingUser) {
      throw new ExtendedHttpError(
        "A user with that email already exists.",
        "USER_ALREADY_EXISTS"
      );
    }

    const { password, passwordRepeated, ...remainingUserData } = data;

    if (password !== passwordRepeated) {
      throw new ExtendedHttpError(
        "Passwords do not match.",
        "NO_MATCH_PASSWORD"
      );
    }

    try {
      const user = await this.userService.createUser({
        ...remainingUserData,
        password,
      });

      const jwt = sign({ id: user.id }, "7 days");

      return { token: jwt, user };
    } catch (error) {
      console.log({ error });
      throw new ExtendedHttpError("Something went wrong", "CREATE_USER_FAILED");
    }
  }

  @Post("/users/google")
  async createUserViaGoogle(@Body() data: { tokenId: string }) {
    try {
      const ticket = await this.googleClient.verifyIdToken({
        idToken: data.tokenId,
        audience: process.env.CLIENT_ID,
      });

      const { given_name, family_name, email } = ticket.getPayload();

      let user = await this.userRepository.findOne({
        where: { email },
      });

      if (!user) {
        const password = Math.random().toString(36).substr(2, 8);
        user = await this.userService.createUser({
          firstName: given_name,
          lastName: family_name,
          email,
          password,
        });
      }

      const jwt = sign({ id: user.id }, "7 days");
      return { token: jwt, user };
    } catch (error) {
      throw new ExtendedHttpError("Something went wrong", "CREATE_USER_FAILED");
    }
  }

  @Get("/spec")
  getSpec() {
    const storage = getMetadataArgsStorage();
    return routingControllersToSpec(storage);
  }
}
