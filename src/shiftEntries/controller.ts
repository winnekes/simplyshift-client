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
    QueryParam,
} from 'routing-controllers';
import * as moment from 'moment';
import ShiftModel from '../shiftModels/entity';
import ShiftEntry from './entity';
import User from '../users/entity';
import { OpenAPI } from 'routing-controllers-openapi/build/decorators';
import { MoreThanOrEqual, LessThan } from 'typeorm';

@JsonController()
@OpenAPI({
    security: [{ bearerAuth: [] }], // Applied to each method
})
export default class ShiftEntryController {
    @Authorized()
    @Get('/shiftEntries')
    async getAllShiftEntries(
        @CurrentUser() user: User,
        @QueryParam('month', { required: false }) month: string
    ) {
        var selectedMonth;
        if (!month) {
            selectedMonth = moment().startOf('month');
        } else {
            selectedMonth = moment(month).startOf('month');
        }
        const shiftEntries = await ShiftEntry.find({
            where: {
                user: user,
                startsAt: MoreThanOrEqual(selectedMonth),
                endsAt: LessThan(moment(selectedMonth).add(1, 'month')),
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
        @CurrentUser()
        user: User,
        @Body() shiftEntry: Partial<ShiftEntry>,
        @Res() response: any
    ) {
        const computeTimes = (date, model: ShiftModel) => {
            const startDate = moment.parseZone(date).startOf('day');

            const startsAt = moment(startDate)
                .add({ minutes: model.startsAt })
                .toLocaleString();
            const endsAt = moment(startDate)
                .add({ minutes: +model.startsAt + +model.duration })
                .toLocaleString();
            return {
                startsAt,
                endsAt,
            };
        };

        try {
            const { shiftModel } = shiftEntry;
            const model = await ShiftModel.findOne(shiftModel, {
                where: { user },
            });
            if (!model)
                throw new NotFoundError(
                    'Could not find the model for this shift entry.'
                );

            shiftEntry.user = user;
            const entity = ShiftEntry.create({
                ...shiftEntry,
                ...computeTimes(shiftEntry.startsAt, model as ShiftModel),
            });

            return await entity.save();
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
