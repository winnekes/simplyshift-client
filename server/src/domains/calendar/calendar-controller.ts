import {
  CurrentUser,
  Delete,
  Get,
  JsonController,
  Param,
  Post,
} from "routing-controllers";
import { getCustomRepository } from "typeorm";
import { ExtendedHttpError } from "../../utils/extended-http-error";
import { User } from "../identity-access/user-entity";
import { CalendarRepository } from "./calendar-repository";
import { CalendarShareLookupRepository } from "./calendar-share-lookup-repository";

@JsonController()
export default class CalendarController {
  private calendarRepository = getCustomRepository(CalendarRepository);
  private calendarShareLookupRepository = getCustomRepository(
    CalendarShareLookupRepository
  );

  @Get("/calendars")
  async authenticate(@CurrentUser() user: User) {
    return await this.calendarRepository.find(user);
  }

  @Post("/calendars/:id/share")
  async shareCalendar(
    @Param("id") calendarId: number,
    @CurrentUser() user: User
  ): Promise<string> {
    const calendar = await this.calendarRepository.findOneForUser(user, {
      where: { calendarId },
    });

    if (!calendar) {
      throw new ExtendedHttpError(
        "Cannot find the calendar",
        "CALENDAR_NOT_FOUND"
      );
    }

    const calendarShareLookup = await this.calendarShareLookupRepository.create();
    calendarShareLookup.user = user;
    calendarShareLookup.calendar = calendar;

    await this.calendarShareLookupRepository.save(calendarShareLookup);
    console.log({ calendarShareLookup });

    return "";
  }

  @Delete("/calendars/:id/unshare")
  async unshareCalendar(
    @Param("id") calendarId: number,
    @CurrentUser() user: User
  ): Promise<boolean> {
    const sharedCalendar = await this.calendarShareLookupRepository.findOneForUser(
      user,
      {
        where: { calendarId },
      }
    );

    if (!sharedCalendar) {
      throw new ExtendedHttpError(
        "Cannot find the calendar",
        "CALENDAR_NOT_FOUND"
      );
    }

    await this.calendarShareLookupRepository.softDelete({
      id: sharedCalendar.id,
    });

    return true;
  }
}
