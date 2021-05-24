import {
  JsonController,
  Get,
  Body,
  Post,
  Authorized,
  CurrentUser,
  NotFoundError,
  Res,
  Put,
  Param,
  Delete,
  QueryParam,
} from "routing-controllers";
import moment from "moment";
import { CalendarRepository } from "../calendar/calendar-repository";
import { ShiftModelRepository } from "../shift-model/shift-model-repository";
import ShiftEntry from "./shift-entry";
import User from "../identity-access/user";
import { OpenAPI } from "routing-controllers-openapi/build/decorators";
import { MoreThanOrEqual, LessThan, getCustomRepository } from "typeorm";
import { ShiftEntryRepository } from "./shift-entry-repository";
import "moment-timezone";
moment.tz.setDefault("Europe/Amsterdam");
moment.locale("nl");

@JsonController()
@OpenAPI({
  security: [{ bearerAuth: [] }],
})
export default class ShiftEntryController {
  private shiftModelRepository = getCustomRepository(ShiftModelRepository);
  private shiftEntryRepository = getCustomRepository(ShiftEntryRepository);
  private calendarRepository = getCustomRepository(CalendarRepository);

  @Authorized()
  @Get("/shift-entry")
  async getAllShiftEntries(
    @CurrentUser() user: User,
    @QueryParam("date", { required: false }) date: Date
  ): Promise<ShiftEntry[]> {
    const selectedMonth = !date
      ? moment().startOf("month")
      : moment(date).startOf("month");

    const shiftEntries = await this.shiftEntryRepository.findAllForUser(user, {
      startsAt: MoreThanOrEqual(selectedMonth),
      endsAt: LessThan(moment(selectedMonth).add(1, "month")),
    });

    const shiftModels = await this.shiftModelRepository
      .createQueryBuilder()
      .where("user_id = :userId", { userId: user.id })
      .withDeleted()
      .getMany();

    const shiftEntriesWithShiftModels = shiftEntries.map((shiftEntry) => ({
      ...shiftEntry,
      shiftModel:
        shiftModels.find(
          (shiftModel) => shiftModel.id === shiftEntry.shiftModelId
        ) || null,
    }));

    return shiftEntriesWithShiftModels as ShiftEntry[];
  }

  @Authorized()
  @Post("/shift-entry")
  async createShiftEntry(
    @CurrentUser()
    user: User,
    @Body() data: { shiftModelId: number; date: Date },
    @Res() response: any
  ): Promise<ShiftEntry> {
    try {
      const { shiftModelId } = data;

      const model = await this.shiftModelRepository.findOneForUser(user, {
        where: { id: shiftModelId },
      });

      if (!model)
        throw new NotFoundError(
          "Could not find the model for this shift entry."
        );
      // todo find conflicting shift entry

      const startDate = moment(data.date).startOf("day");
      const startsAt = moment(startDate)
        .add(moment.duration(model.startsAt))
        .toDate();
      const endsAt =
        model.startsAt > model.endsAt
          ? moment(startDate)
              .add(moment.duration(model.endsAt))
              .add("1", "day")
              .toDate()
          : moment(startDate).add(moment.duration(model.endsAt)).toDate();

      const conflictingShiftEntries =
        await this.shiftEntryRepository.findConflictingEntriesForUser(user, {
          startsAt,
          endsAt,
        });

      if (conflictingShiftEntries.length > 0) {
        await this.shiftEntryRepository.softRemove(conflictingShiftEntries);
      }

      const shiftEntry = this.shiftEntryRepository.create();
      shiftEntry.user = user;
      shiftEntry.note = "";
      shiftEntry.startsAt = startsAt;
      shiftEntry.endsAt = endsAt;
      shiftEntry.shiftModel = model;

      const calendar = await this.calendarRepository.findActiveOneForUser(user);
      if (!calendar) {
        throw new Error("No calendar found");
      }

      shiftEntry.calendar = calendar;

      return await shiftEntry.save();
    } catch (err) {
      console.log(err);
      response.status = 400;
      response.body = {
        message: "Unable to save shift entry.",
      };
      return response;
    }
  }

  @Authorized()
  @Put("/shift-entry/:id")
  async updateShiftEntry(
    @Param("id") id: number,
    @CurrentUser() user: User,
    @Body() update: Partial<ShiftEntry>
  ) {
    const entity = await this.shiftEntryRepository.findOne(id, {
      where: { user },
    });
    if (!entity) throw new NotFoundError("Cannot find the shift entry.");
    const updatedEntity = await this.shiftEntryRepository.merge(entity, update);

    return await this.shiftEntryRepository.save(updatedEntity);
  }

  @Authorized()
  @Delete("/shift-entry/:id")
  async deleteShiftEntry(
    @Param("id") id: number,
    @CurrentUser() user: User,
    @Res() response: any
  ) {
    try {
      if (
        (await this.shiftEntryRepository.delete({ id, user })).affected === 0
      ) {
        throw new NotFoundError("Could not find shift entry to delete.");
      }
      response.body = {
        message: "Successfully deleted the entry model.",
      };
      return response;
    } catch (err) {
      console.log(err);
      response.status = 404;
      response.body = {
        message: "Could not find shift entry to delete.",
      };

      return response;
    }
  }
}
