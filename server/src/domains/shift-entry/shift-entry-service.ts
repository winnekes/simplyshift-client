import moment from "moment";
import {
  getCustomRepository,
  getManager,
  LessThan,
  MoreThanOrEqual,
} from "typeorm";
import { ExtendedHttpError } from "../../utils/extended-http-error";
import { CalendarRepository } from "../calendar/calendar-repository";
import { User } from "../identity-access/user-entity";
import { ShiftModel } from "../shift-model/shift-model-entity";
import { ShiftModelRepository } from "../shift-model/shift-model-repository";
import { ShiftEntry } from "./shift-entry-entity";
import { ShiftEntryRepository } from "./shift-entry-repository";

export class ShiftEntryService {
  private shiftModelRepository = getCustomRepository(ShiftModelRepository);
  private shiftEntryRepository = getCustomRepository(ShiftEntryRepository);
  private calendarRepository = getCustomRepository(CalendarRepository);
  public async getShiftEntriesForSingleMonth(
    user: User,
    date: Date
  ): Promise<ShiftEntry[]> {
    const selectedMonth = moment(date).startOf("month");
    console.log({ selectedMonth });
    const shiftEntries = await this.shiftEntryRepository.findAllForUser(user, {
      startsAt: MoreThanOrEqual(moment(selectedMonth).subtract(7, "days")),
      endsAt: LessThan(moment(selectedMonth).add(1, "month").add(7, "days")),
    });

    // cannot query soft-deleted relations through generic find option, so we have to map the shiftModels manually to the shift entries
    const shiftModels = await this.shiftModelRepository
      .createQueryBuilder()
      .where("user_id = :userId", { userId: user.id })
      .withDeleted()
      .getMany();

    return this.mapShiftModelsToShiftEntries(shiftEntries, shiftModels);
  }

  private mapShiftModelsToShiftEntries(
    shiftEntries: ShiftEntry[],
    shiftModels: ShiftModel[]
  ): ShiftEntry[] {
    const shiftEntriesWithShiftModels = shiftEntries.map((shiftEntry) => ({
      ...shiftEntry,
      shiftModel:
        shiftModels.find(
          (shiftModel) => shiftModel.id === shiftEntry.shiftModelId
        ) || null,
    }));

    return shiftEntriesWithShiftModels as ShiftEntry[];
  }
  public async createNewShiftEntry(
    user: User,
    data: { shiftModelId: number; date: Date }
  ): Promise<ShiftEntry> {
    const shiftModel = await this.shiftModelRepository.findOneForUser(user, {
      where: { id: data.shiftModelId },
    });

    console.log({ data });
    if (!shiftModel) {
      throw new ExtendedHttpError(
        "Could not find the model for this shift entry.",
        "SHIFT_MODEL_NOT_FOUND"
      );
    }

    const calendar = await this.calendarRepository.findActiveOneForUser(user);
    if (!calendar) {
      throw new ExtendedHttpError(
        "Could not find the calendar for this shift entry.",
        "CALENDAR_NOT_FOUND"
      );
    }

    // map the military time of the shift model to the selected day of the shift
    const startDate = moment(data.date).startOf("day");

    const startsAt = moment(startDate)
      .add(moment.duration(shiftModel.startsAt))
      .toDate();
    const endsAt =
      shiftModel.startsAt > shiftModel.endsAt
        ? moment(startDate)
            .add(moment.duration(shiftModel.endsAt))
            .add("1", "day")
            .toDate()
        : moment(startDate).add(moment.duration(shiftModel.endsAt)).toDate();

    // we cannot allow overlapping shift entries, we find potential conflicting ones and delete them
    const conflictingShiftEntries = await this.shiftEntryRepository.findConflictingEntriesForUser(
      user,
      {
        startsAt,
        endsAt,
      }
    );

    const newShiftEntry = this.shiftEntryRepository.create();
    newShiftEntry.user = user;
    newShiftEntry.note = "";
    newShiftEntry.startsAt = startsAt;
    newShiftEntry.endsAt = endsAt;
    newShiftEntry.shiftModel = shiftModel;
    newShiftEntry.calendar = calendar;

    await getManager().transaction(async (transactionalEntityManager) => {
      await transactionalEntityManager.softRemove(conflictingShiftEntries);

      await transactionalEntityManager.save(newShiftEntry);
    });

    return newShiftEntry;
  }
}
