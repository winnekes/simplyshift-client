import {
  Authorized,
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

  @Authorized()
  @Get("/calendars/:name")
  async getCalendar(
    @Param("name") calendarName: string,
    @CurrentUser() user: User
  ) {
    // todo currently user only ever has one calendar
    // change logic once multiple calendar feature gets added
    const calendar = await this.calendarRepository.findOneForUser(user, {
      where: { name: calendarName },
    });

    console.log({ calendar });

    if (!calendar) {
      throw new ExtendedHttpError(
        "Cannot find the calendar",
        "CALENDAR_NOT_FOUND"
      );
    }

    const existingCalendarShareLookup = await this.calendarShareLookupRepository.findOneForUser(
      user,
      { where: { calendar } }
    );

    console.log({ existingCalendarShareLookup });

    return {
      id: calendar.id,
      name: calendar.name,
      isShared: !!existingCalendarShareLookup,
      icsUrl: existingCalendarShareLookup
        ? `/calendars/t=${existingCalendarShareLookup.uuid}`
        : undefined,
    };
  }

  @Authorized()
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

    const existingCalendarShareLookup = await this.calendarShareLookupRepository.findOneForUser(
      user,
      {
        where: {
          calendar: { id: calendarId },
        },
      }
    );

    if (!existingCalendarShareLookup) {
      throw new ExtendedHttpError(
        "Calendar is already shared",
        "CALENDAR_ALREADY_SHARED"
      );
    }
    const calendarShareLookup = await this.calendarShareLookupRepository.create();
    calendarShareLookup.user = user;
    calendarShareLookup.calendar = calendar;

    await this.calendarShareLookupRepository.save(calendarShareLookup);
    console.log({ calendarShareLookup });

    return `api/calendars/${calendarShareLookup.uuid}`;
  }

  @Authorized()
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

  @Get("/calendars/link/:uuid")
  async getSharedCalendar(@Param("uuid") uuid: number): Promise<string> {
    //  add tracking
    //

    const sharedCalendarLookup = await this.calendarShareLookupRepository.findOne(
      {
        where: { uuid },
      }
    );

    if (!sharedCalendarLookup) {
      throw new ExtendedHttpError(
        "Calendar is not shared",
        "CALENDAR_NOT_SHARED"
      );
    }

    const sharedCalendar = await this.calendarRepository.findOne({
      where: { id: sharedCalendarLookup.calendar.id },
    });

    // todo create events with ical
    //
    return "";
  }
}
