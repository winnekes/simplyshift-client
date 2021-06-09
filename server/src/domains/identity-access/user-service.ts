import { getCustomRepository, getManager } from "typeorm";
import { CalendarRepository } from "../calendar/calendar-repository";
import { ShiftModelService } from "../shift-model/shift-model-service";
import User from "./user";
import { UserRepository } from "./user-repository";

export class UserService {
  private userRepository = getCustomRepository(UserRepository);
  private calendarRepository = getCustomRepository(CalendarRepository);
  private shiftModelService = new ShiftModelService();

  async createUser(
    data: Pick<User, "firstName" | "lastName" | "email" | "password">
  ): Promise<User> {
    const user = this.userRepository.create();
    user.firstName = data.firstName;
    user.lastName = data.lastName;
    user.email = data.email;
    await user.setPassword(data.password);

    const calendar = this.calendarRepository.create();
    calendar.user = user;
    calendar.isDefault = true;

    await getManager().transaction(async (transactionalEntityManager) => {
      await transactionalEntityManager.save(user);
      await transactionalEntityManager.save(calendar);
      await this.shiftModelService.createSampleShiftModelsForUser(
        user,
        transactionalEntityManager
      );
    });

    return user;
  }
}
