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
import { getCustomRepository, getManager } from "typeorm";
import { ExtendedHttpError } from "../../utils/extended-http-error";
import { sign } from "../../utils/jwt";
import { CalendarRepository } from "../calendar/calendar-repository";
import User from "./user";
import { UserRepository } from "./user-repository";

@JsonController()
export default class UserController {
  private userRepository = getCustomRepository(UserRepository);
  private calendarRepository = getCustomRepository(CalendarRepository);

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

    const { password, passwordRepeated, ...rest } = data;

    if (password !== passwordRepeated) {
      throw new ExtendedHttpError(
        "Passwords do not match.",
        "NO_MATCH_PASSWORD"
      );
    }

    const user = this.userRepository.create(rest);
    await user.setPassword(password);

    const calendar = this.calendarRepository.create();
    calendar.user = user;
    calendar.isDefault = true;

    try {
      await getManager().transaction(async (transactionalEntityManager) => {
        await transactionalEntityManager.save(user);
        await transactionalEntityManager.save(calendar);
      });

      const jwt = sign({ id: user.id }, "7 days");

      return { token: jwt, user };
    } catch (error) {
      console.log({ error });
      throw new ExtendedHttpError("Something went wrong", "CREATE_USER_FAILED");
    }
  }

  @Get("/spec")
  getSpec() {
    const storage = getMetadataArgsStorage();
    return routingControllersToSpec(storage);
  }
}
