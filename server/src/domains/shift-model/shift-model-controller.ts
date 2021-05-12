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
} from "routing-controllers";
import { getCustomRepository } from "typeorm";

import ShiftModel from "./shift-model";
import User from "../identity-access/user";
import { OpenAPI } from "routing-controllers-openapi/build/decorators";
import { ShiftModelRepository } from "./shift-model-repository";

// todo error handling
// todo better responses
@JsonController()
@OpenAPI({
  security: [{ bearerAuth: [] }],
})
export default class ShiftModelController {
  private shiftModelRepository = getCustomRepository(ShiftModelRepository);

  @Authorized()
  @Get("/shift-model")
  async getAllShiftModels(@CurrentUser() user: User) {
    const shiftModels = await this.shiftModelRepository.findAllForUser(user);

    if (!shiftModels) {
      throw new NotFoundError("No shift models were not found.");
    }

    return shiftModels;
  }

  @Authorized()
  @Post("/shift-model")
  async createShiftModel(
    @CurrentUser() user: User,
    @Body() shiftModel: ShiftModel,
    @Res() response: any
  ) {
    try {
      shiftModel.user = user;
      return await this.shiftModelRepository.save(shiftModel);
    } catch (err) {
      console.log(err);
      response.status = 400;
      response.body = {
        message: "Shift model name already exists.",
      };
      return response;
    }
  }

  @Authorized()
  @Put("/shift-model/:id")
  async updateShiftModel(
    @Param("id") id: number,
    @CurrentUser() user: User,
    @Body() update: Partial<ShiftModel>
  ) {
    const entity = await this.shiftModelRepository.findOne(id, {
      where: { user },
    });
    if (!entity) throw new NotFoundError("Cannot find the shift model.");
    return await ShiftModel.merge(entity, update).save();
  }

  @Authorized()
  @Delete("/shift-model/:id")
  async deleteShiftModel(
    @Param("id") id: number,
    //@CurrentUser() user: User,
    @Res() response: any
  ) {
    try {
      if ((await this.shiftModelRepository.softDelete({ id })).affected === 0) {
        throw new NotFoundError("Could not find shift model to delete.");
      }

      response.body = {
        message: "Successfully deleted the shift model.",
      };
      return response;
    } catch (err) {
      console.log(err);
      response.status = 404;
      response.body = {
        message: "Could not find shift model to delete.",
      };

      return response;
    }
  }
}
