import { CurrentUser, Get, JsonController } from "routing-controllers";
import { getCustomRepository } from "typeorm";
import User from "../identity-access/user-entity";
import { CalendarRepository } from "./calendar-repository";

@JsonController()
export default class CalendarController {
  private calendarRepository = getCustomRepository(CalendarRepository);
  @Get("/calendars")
  async authenticate(@CurrentUser() user: User) {
    return await this.calendarRepository.find(user);
  }
}
