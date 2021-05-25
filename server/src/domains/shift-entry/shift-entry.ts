import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  RelationId,
} from "typeorm";
import { BaseEntity } from "typeorm/repository/BaseEntity";
import { IsString, IsDate } from "class-validator";
import Calendar from "../calendar/calendar";
import User from "../identity-access/user";
import ShiftModel from "../shift-model/shift-model";

@Entity("shift_entries")
export default class ShiftEntry extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @IsDate()
  @Column("timestamptz")
  startsAt!: Date;

  @IsDate()
  @Column("timestamptz")
  endsAt!: Date;

  @IsString()
  @Column("varchar")
  note!: string;

  @ManyToOne(() => User, (user) => user.shiftEntries)
  user!: User;

  @ManyToOne(() => ShiftModel, (shiftModel) => shiftModel.shiftEntries)
  shiftModel!: ShiftModel;

  @RelationId((shiftEntry: ShiftEntry) => shiftEntry.shiftModel)
  public shiftModelId!: number;

  @ManyToOne(() => Calendar, (calendar) => calendar.shiftEntries)
  calendar!: Calendar;

  @CreateDateColumn({ type: "timestamptz" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "timestamptz" })
  updatedAt?: Date;

  @DeleteDateColumn({ type: "timestamptz" })
  deletedAt?: Date;
}
