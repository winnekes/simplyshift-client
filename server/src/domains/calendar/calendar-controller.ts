import ical, { ICalCalendar } from "ical-generator";
import { ICalCalendarMethod } from "ical-generator/dist/calendar";
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
import { getCustomRepository, getManager, IsNull } from "typeorm";
import { ExtendedHttpError } from "../../utils/extended-http-error";
import { User } from "../identity-access/user-entity";
import { CalendarRepository } from "./calendar-repository";
import { CalendarShareLookup } from "./calendar-share-lookup-entity";
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
    const calendar = await this.calendarRepository.findOneForUserByName(
      user,
      calendarName
    );

    console.log({ calendar, user });
    if (!calendar) {
      throw new ExtendedHttpError(
        "Cannot find the calendar",
        "CALENDAR_NOT_FOUND"
      );
    }

    const existingCalendarShareLookup = await this.calendarShareLookupRepository.findOneForUserByCalendarId(
      user,
      calendar.id
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
    const calendar = await this.calendarRepository.findOneForUserById(
      user,
      calendarId
    );

    if (!calendar) {
      throw new ExtendedHttpError(
        "Cannot find the calendar",
        "CALENDAR_NOT_FOUND"
      );
    }

    const existingCalendarShareLookup = await this.calendarShareLookupRepository.findOneForUserByCalendarId(
      user,
      calendarId
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
    calendar.calendarShareLookup = calendarShareLookup;

    await getManager().transaction(async (transactionalEntityManager) => {
      await transactionalEntityManager.save(calendarShareLookup);
      await transactionalEntityManager.save(calendar);
    });

    return `api/calendars/${calendarShareLookup.uuid}`;
  }

  @Authorized()
  @Delete("/calendars/:id/unshare")
  async unshareCalendar(
    @Param("id") calendarId: number,
    @CurrentUser() user: User
  ): Promise<boolean> {
    const calendar = await this.calendarRepository.findOneForUserById(
      user,
      calendarId
    );

    if (!calendar) {
      throw new ExtendedHttpError(
        "Cannot find the calendar",
        "CALENDAR_NOT_FOUND"
      );
    }

    const sharedCalendar = await this.calendarShareLookupRepository.findOneForUserByUUID(
      user,
      calendar.id
    );

    if (!sharedCalendar) {
      throw new ExtendedHttpError(
        "Cannot find the calendar",
        "CALENDAR_NOT_FOUND"
      );
    }

    calendar.calendarShareLookup = null;
    await getManager().transaction(async (transactionalEntityManager) => {
      await transactionalEntityManager.save(calendar);
      await transactionalEntityManager.delete(CalendarShareLookup, {
        id: sharedCalendar.id,
      });
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
        where: { uuid, deletedAt: IsNull() },
        relations: ["calendar"],
      }
    );

    if (!sharedCalendarLookup) {
      throw new ExtendedHttpError(
        "Calendar is not shared",
        "CALENDAR_NOT_SHARED"
      );
    }

    if (!sharedCalendarLookup.calendar) {
      throw new ExtendedHttpError(
        "Cannot find the calendar",
        "CALENDAR_NOT_FOUND"
      );
    }

    const calendar = ical({
      name: "SimplyShift",
      method: ICalCalendarMethod.PUBLISH,
      url: "https://simplyshift.app",
    });

    calendar.prodId({
      company: "SimplyShift",
      language: "EN",
      product: "Shift calendar",
    });

    for (const shiftEntry of sharedCalendarLookup.calendar.shiftEntries) {
      calendar.createEvent({
        start: moment(shiftEntry.startsAt),
        end: moment(shiftEntry.endsAt),
        summary: shiftEntry.shiftModel.name,
        description: `${shiftEntry.user.firstName} ${shiftEntry.user.lastName}`,
        organizer: {
          name: `${shiftEntry.user.firstName} ${shiftEntry.user.lastName}`,
        },
      });
    }

    // necessary to serve calendar over koa
    ctx.status = 200;
    ctx.respond = false;

    return calendar.serve(ctx.res, "simplyshift.ics");
  }
}
