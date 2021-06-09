import { EntityManager, getCustomRepository } from "typeorm";
import User from "../identity-access/user";
import { ShiftModelRepository } from "../shift-model/shift-model-repository";
import { sampleShiftModels } from "./sample-data";

export class ShiftModelService {
  private shiftModelRepository = getCustomRepository(ShiftModelRepository);

  public async createSampleShiftModelsForUser(
    user: User,
    transactionalEntityManager: EntityManager
  ) {
    for (const sample of sampleShiftModels) {
      const shiftModel = this.shiftModelRepository.create();
      shiftModel.name = sample.name;
      shiftModel.startsAt = sample.startsAt;
      shiftModel.endsAt = sample.endsAt;
      shiftModel.color = sample.color;
      shiftModel.user = user;
      await transactionalEntityManager.save(shiftModel);
    }
  }
}
