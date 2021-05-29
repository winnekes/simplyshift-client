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
      throw new BadRequestError("A user with that email already exists.");
    }

    const { password, passwordRepeated, ...rest } = data;

    if (password !== passwordRepeated) {
      throw new BadRequestError("Passwords do not match.");
    }

    try {
      const user = this.userRepository.create(rest);
      await user.setPassword(password);
      await this.userRepository.save(user);

      const calendar = this.calendarRepository.create();
      calendar.user = user;
      calendar.isDefault = true;
      await this.calendarRepository.save(calendar);
      const jwt = sign({ id: user.id }, "7 days");

      return { token: jwt, user };
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
