import {
  JsonController,
  Get,
  Body,
  Post,
  Authorized,
  CurrentUser,
  Put,
  Param,
  Delete,
  QueryParam,
} from "routing-controllers";
import { UpdateResult } from "typeorm/query-builder/result/UpdateResult";
import { ExtendedHttpError } from "../../utils/extended-http-error";
import { ShiftEntryService } from "./shift-entry-service";
import ShiftEntry from "./shift-entry";
import User from "../identity-access/user";
import { OpenAPI } from "routing-controllers-openapi/build/decorators";
import { getCustomRepository } from "typeorm";
import { ShiftEntryRepository } from "./shift-entry-repository";
import "moment-timezone";

@JsonController()
@OpenAPI({
  security: [{ bearerAuth: [] }],
})
export default class ShiftEntryController {
  private shiftEntryRepository = getCustomRepository(ShiftEntryRepository);
  private shiftEntryService = new ShiftEntryService();

  @Authorized()
  @Get("/shift-entry")
  async getAllShiftEntries(
    @CurrentUser() user: User,
    @QueryParam("date") date: Date
  ): Promise<ShiftEntry[]> {
    return this.shiftEntryService.getShiftEntriesForSingleMonth(user, date);
  }

  @Authorized()
  @Post("/shift-entry")
  async createShiftEntry(
    @CurrentUser()
    user: User,
    @Body() data: { shiftModelId: number; date: Date }
  ): Promise<ShiftEntry> {
    try {
      return this.shiftEntryService.createNewShiftEntry(user, data);
    } catch (error) {
      console.log({ error });
      throw new ExtendedHttpError(
        "Could not create new entry",
        "CREATE_SHIFT_ENTRY_FAILED"
      );
    }
  }

  @Authorized()
  @Put("/shift-entry/:id")
  async updateShiftEntry(
    @Param("id") id: number,
    @CurrentUser() user: User,
    @Body() data: Partial<ShiftEntry>
  ) {
    const shiftEntry = await this.shiftEntryRepository.findOne(id, {
      where: { user },
    });
    if (!shiftEntry) {
      throw new ExtendedHttpError(
        "Cannot find the shift entry.",
        "SHIFT_ENTRY_NOT_FOUND"
      );
    }

    try {
      const updatedEntity = await this.shiftEntryRepository.merge(
        shiftEntry,
        data
      );

      return await this.shiftEntryRepository.save(updatedEntity);
    } catch (error) {
      console.log({ error });
      throw new ExtendedHttpError(
        "Could not update shift entry",
        "UPDATE_SHIFT_ENTRY_FAILED"
      );
    }
  }

  @Authorized()
  @Delete("/shift-entry/:id")
  async deleteShiftEntry(
    @Param("id") id: number,
    @CurrentUser() user: User
  ): Promise<UpdateResult> {
    const shiftEntry = await this.shiftEntryRepository.findOneForUser(user, {
      where: { id },
    });

    if (!shiftEntry) {
      throw new ExtendedHttpError(
        "Cannot find the shift entry.",
        "SHIFT_ENTRY_NOT_FOUND"
      );
    }

    try {
      return this.shiftEntryRepository.softDelete({ id: shiftEntry.id });
    } catch (error) {
      console.log({ error });
      throw new ExtendedHttpError(
        "Could not delete shift entry",
        "DELETE_SHIFT_ENTRY_FAILED"
      );
    }
  }
}
