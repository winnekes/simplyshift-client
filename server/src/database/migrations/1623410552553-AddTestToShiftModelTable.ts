import {MigrationInterface, QueryRunner} from "typeorm";

export class AddTestToShiftModelTable1623410552553 implements MigrationInterface {
    name = 'AddTestToShiftModelTable1623410552553'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shift_models" ADD "test" text NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shift_models" DROP COLUMN "test"`);
    }

}
