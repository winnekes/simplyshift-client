import {
    JsonController,
    Get,
    Body,
    Post,
    Authorized,
    CurrentUser,
    NotFoundError,
    BadRequestError,
    Res,
    Put,
    Param,
    Delete,
} from 'routing-controllers';

import ShiftModel from '../shiftModels/entity';
import ShiftEntry from './entity';
import User from '../users/entity';

@JsonController()
export default class ShiftEntryController {
    @Authorized()
    @Get('/shiftEntries')
    async getAllShiftEntries(@CurrentUser() user: User) {
        const shiftEntries = await ShiftEntry.find({
            where: {
                user: user,
            },
        });
        if (!shiftEntries) {
            throw new NotFoundError('No shift entries were not found.');
        }
        return shiftEntries;
    }

    @Authorized()
    @Post('/shiftEntries')
    async createShiftEntry(
        @CurrentUser() user: User,
        @Body() shiftEntry: Partial<ShiftEntry>,
        @Res() response: any
    ) {
        const timeCalc = function() {};
        try {
            const { shiftModel } = shiftEntry;
            const model = ShiftModel.findOne(shiftModel);
            shiftEntry.user = user;
            /*             const entity = ShiftEntry.create({startsAt: calculateStartsAt(shiftEntry.startsAt, model.)...shiftEntry}); */

            /*             return await shiftEntry.save(); */
        } catch (err) {
            console.log(err);
            response.status = 400;
            response.body = {
                message: 'Unable to save shift entry.',
            };
            return response;
        }
    }

    @Authorized()
    @Put('/shiftEntries/:id')
    async updateShiftEntry(
        @Param('id') id: number,
        @CurrentUser() user: User,
        @Body() update: Partial<ShiftEntry>
    ) {
        const entity = await ShiftEntry.findOne(id, { where: { user } });
        if (!entity) throw new NotFoundError('Cannot find the shift entry.');
        return await ShiftEntry.merge(entity, update).save();
    }

    @Authorized()
    @Delete('/shiftEntries/:id')
    async deleteShiftEntry(
        @Param('id') id: number,
        @CurrentUser() user: User,
        @Res() response: any
    ) {
        try {
            if ((await ShiftEntry.delete({ id, user })).affected === 0) {
                throw new NotFoundError(
                    'Could not find shift entry to delete.'
                );
            }
            response.body = {
                message: 'Successfully deleted the entry model.',
            };
            return response;
        } catch (err) {
            console.log(err);
            response.status = 404;
            response.body = {
                message: 'Could not find shift entry to delete.',
            };

            return response;
        }
    }
}
