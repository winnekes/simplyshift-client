import ical, { ICalCalendar } from "ical-generator";
import { Context } from "koa";
import moment from "moment";
import {
  Authorized,
  Ctx,
  CurrentUser,
  Delete,
  Get,
  JsonController,
  Param,
  Post,
  QueryParam,
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

    return {
      id: calendar.id,
      name: calendar.name,
      isShared: !!existingCalendarShareLookup,
      icsUrl: existingCalendarShareLookup
        ? `/calendars?t=${existingCalendarShareLookup.uuid}`
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
      where: { id: calendarId },
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

    if (existingCalendarShareLookup) {
      throw new ExtendedHttpError(
        "Calendar is already shared",
        "CALENDAR_ALREADY_SHARED"
      );
    }
    const calendarShareLookup = await this.calendarShareLookupRepository.create();
    calendarShareLookup.user = user;
    calendarShareLookup.calendar = calendar;

    await this.calendarShareLookupRepository.save(calendarShareLookup);

    return `api/calendars/${calendarShareLookup.uuid}`;
  }

  @Authorized()
  @Delete("/calendars/:id/unshare")
  async unshareCalendar(
    @Param("id") calendarId: number,
    @CurrentUser() user: User
  ): Promise<boolean> {
    const calendar = await this.calendarRepository.findOneForUser(user, {
      where: { id: calendarId },
    });

    if (!calendar) {
      throw new ExtendedHttpError(
        "Cannot find the calendar",
        "CALENDAR_NOT_FOUND"
      );
    }

    const sharedCalendar = await this.calendarShareLookupRepository.findOneForUser(
      user,
      {
        where: { calendar },
      }
    );

    if (!sharedCalendar) {
      throw new ExtendedHttpError(
        "Cannot find the calendar",
        "CALENDAR_NOT_FOUND"
      );
    }

    await this.calendarShareLookupRepository.delete({
      id: sharedCalendar.id,
    });

    return true;
  }

  @Get("/calendars")
  async getSharedCalendar(
    @QueryParam("t") uuid: string,
    @Ctx() ctx: Context
  ): Promise<ICalCalendar> {
    const sharedCalendarLookup = await this.calendarShareLookupRepository.findOne(
      {
        where: { uuid },
        relations: ["calendar"],
      }
    );

    if (!sharedCalendarLookup) {
      throw new ExtendedHttpError(
        "Calendar is not shared",
        "CALENDAR_NOT_SHARED"
      );
    }

    // todo typeguard
    const sharedCalendar = await this.calendarRepository.findOne({
      where: { id: sharedCalendarLookup.calendar.id },
      relations: ["shiftEntries", "shiftEntries.shiftModel"],
    });

    if (!sharedCalendar) {
      throw new ExtendedHttpError(
        "Cannot find the calendar",
        "CALENDAR_NOT_FOUND"
      );
    }
    // todo create events with ical

    const calendar = ical({
      name: "SimplyShift",
    });

    calendar.prodId({
      company: "SimplyShift",
      language: "EN",
      product: "Shift calendar",
    });

    for (const shiftEntry of sharedCalendar?.shiftEntries) {
      calendar.createEvent({
        start: moment(shiftEntry.startsAt),
        end: moment(shiftEntry.endsAt),
        summary: shiftEntry.shiftModel.name,
      });
    }

    // necessary to serve calendar over koa
    ctx.status = 200;
    ctx.respond = false;

    return calendar.serve(ctx.res, "simplyshift.ics");
  }
}
