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
import { ShiftModelRepository } from "../shift-model/shift-model-repository";
import ShiftEntry from "./shift-entry";
import User from "../identity-access/user";
import { OpenAPI } from "routing-controllers-openapi/build/decorators";
import { MoreThanOrEqual, LessThan, getCustomRepository } from "typeorm";
import { ShiftEntryRepository } from "./shift-entry-repository";

@JsonController()
@OpenAPI({
  security: [{ bearerAuth: [] }],
})
export default class ShiftEntryController {
  private shiftModelRepository = getCustomRepository(ShiftModelRepository);
  private shiftEntryRepository = getCustomRepository(ShiftEntryRepository);

  @Authorized()
  @Get("/shift-entry")
  async getAllShiftEntries(
    @CurrentUser() user: User,
    @QueryParam("date", { required: false }) date: string
  ) {
    var selectedMonth;

    if (!date || date === "null") {
      selectedMonth = moment().startOf("month");
    } else {
      selectedMonth = moment(date).startOf("month");
    }

    const shiftEntries = await this.shiftEntryRepository.find({
      where: {
        user: user,
        startsAt: MoreThanOrEqual(selectedMonth),
        endsAt: LessThan(moment(selectedMonth).add(1, "month")),
      },
      relations: ["shiftModel"],
    });

    if (!shiftEntries) {
      throw new NotFoundError("No shift entries were not found.");
    }
    //  console.log({ shiftEntries });
    return shiftEntries;
  }

  @Authorized()
  @Post("/shift-entry")
  async createShiftEntry(
    @CurrentUser()
    user: User,
    @Body() shiftEntry: { shiftModelId: number; startsAt: Date },
    @Res() response: any
  ) {
    try {
      const { shiftModelId } = shiftEntry;

      const model = await this.shiftModelRepository.findOneForUser(user, {
        where: { id: shiftModelId },
      });

      if (!model)
        throw new NotFoundError(
          "Could not find the model for this shift entry."
        );

      const startDate = moment.parseZone(shiftEntry.startsAt).startOf("day");
      const start = moment(startDate)
        .add(moment.duration(model.startsAt))
        .toDate();
      const end =
        model.startsAt > model.endsAt
          ? moment(startDate)
              .add(moment.duration(model.endsAt))
              .add("1", "day")
              .toDate()
          : moment(startDate).add(moment.duration(model.endsAt)).toDate();

      const entity = ShiftEntry.create();
      entity.user = user;
      entity.note = "";
      entity.startsAt = start;

      entity.endsAt = end;

      entity.shiftModel = model;

      return await entity.save();
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
