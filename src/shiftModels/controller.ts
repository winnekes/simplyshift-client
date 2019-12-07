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
} from 'routing-controllers';

import ShiftModel from './entity';
import User from '../users/entity';
import { OpenAPI } from 'routing-controllers-openapi/build/decorators';

@JsonController()
@OpenAPI({
    security: [{ bearerAuth: [] }], // Applied to each method
})
export default class ShiftModelController {
    @Authorized()
    @Get('/shiftModels')
    async getAllShiftModels(@CurrentUser() user: User) {
        const shiftModels = await ShiftModel.find({
            where: {
                user: user,
            },
        });
        if (!shiftModels) {
            throw new NotFoundError('No shift models were not found.');
        }
        return shiftModels;
    }

    @Authorized()
    @Post('/shiftModels')
    async createShiftModel(
        @CurrentUser() user: User,
        @Body() shiftModel: ShiftModel,
        @Res() response: any
    ) {
        try {
            shiftModel.user = user;
            return await shiftModel.save();
        } catch (err) {
            console.log(err);
            response.status = 400;
            response.body = {
                message: 'Shift model name already exists.',
            };
            return response;
        }
    }

    @Authorized()
    @Put('/shiftModels/:id')
    async updateShiftModel(
        @Param('id') id: number,
        @CurrentUser() user: User,
        @Body() update: Partial<ShiftModel>
    ) {
        const entity = await ShiftModel.findOne(id, { where: { user } });
        if (!entity) throw new NotFoundError('Cannot find the shift model.');
        return await ShiftModel.merge(entity, update).save();
    }

    @Authorized()
    @Delete('/shiftModels/:id')
    async deleteShiftModel(
        @Param('id') id: number,
        @CurrentUser() user: User,
        @Res() response: any
    ) {
        try {
            if ((await ShiftModel.delete({ id, user })).affected === 0) {
                throw new NotFoundError(
                    'Could not find shift model to delete.'
                );
            }

            response.body = {
                message: 'Successfully deleted the shift model.',
            };
            return response;
        } catch (err) {
            console.log(err);
            response.status = 404;
            response.body = {
                message: 'Could not find shift model to delete.',
            };

            return response;
        }
    }
}
