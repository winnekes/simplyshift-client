import ical, { ICalAlarmType, ICalCalendar } from "ical-generator";
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
import { getCustomRepository, getManager } from "typeorm";
import { ExtendedHttpError } from "../../utils/extended-http-error";
import { User } from "../identity-access/user-entity";
import { ShiftEntryRepository } from "../shift-entry/shift-entry-repository";
import { CalendarRepository } from "./calendar-repository";
import { CalendarShareLookup } from "./calendar-share-lookup-entity";
import { CalendarShareLookupRepository } from "./calendar-share-lookup-repository";

@JsonController()
export default class CalendarController {
  private shiftEntryRepository = getCustomRepository(ShiftEntryRepository);
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

    const sharedCalendar = await this.calendarShareLookupRepository.findOneForUserByCalendarId(
      user,
      calendar.id
    );

    if (!sharedCalendar) {
      throw new ExtendedHttpError(
        "Cannot find the calendar",
        "CALENDAR_NOT_FOUND"
      );
    }

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
    const sharedCalendarLookup = await this.calendarShareLookupRepository
      .createQueryBuilder("scl")
      .where("scl.uuid = :uuid", { uuid })
      .andWhere("scl.deleted_at is  NULL")
      .leftJoinAndSelect("scl.calendar", "calendar")
      .getOne();

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

    const shiftEntries = await this.shiftEntryRepository
      .createQueryBuilder("shiftEntry")
      .where("calendar_id = :calendarId", {
        calendarId: sharedCalendarLookup.calendar.id,
      })
      .leftJoinAndSelect(
        "shiftEntry.shiftModel",
        "shiftModel",
        "shiftEntry.shift_model_id = shiftModel.id"
      )
      .leftJoinAndSelect(
        "shiftEntry.user",
        "user",
        "shiftEntry.user_id = user.id"
      )
      .select([
        "shiftEntry.startsAt",
        "shiftEntry.endsAt",
        "shiftModel.name",
        "user.firstName",
        "user.lastName",
        "user.email",
      ])
      .getMany();

    const calendar = ical({
      name: "SimplyShift",
      url: "https://68a0719f8a01.ngrok.io",
    });

    calendar.prodId({
      company: "SimplyShift",
      language: "EN",
      product: "SimplyShift",
    });

    calendar.x([{ key: "X-PUBLISHED-TTL", value: "PT1H" }]);

    for (const shiftEntry of shiftEntries) {
      const event = calendar.createEvent({
        start: moment(shiftEntry.startsAt),
        end: moment(shiftEntry.endsAt),
        summary: shiftEntry.shiftModel.name,
        description: `${shiftEntry.user.firstName} ${shiftEntry.user.lastName}`,
        organizer: {
          name: `${shiftEntry.user.firstName} ${shiftEntry.user.lastName}`,
          email: shiftEntry.user.email,
        },
      });

      const alarm = event.createAlarm({});
      alarm.type(ICalAlarmType.display);
      alarm.trigger(3600);
    }

    // necessary to serve calendar over koa
    ctx.status = 200;
    ctx.respond = false;

    return calendar.serve(ctx.res, "simplyshift.ics");
  }
}
