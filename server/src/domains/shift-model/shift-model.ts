import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  Unique,
  DeleteDateColumn,
} from "typeorm";
import { BaseEntity } from "typeorm/repository/BaseEntity";
import { IsString, MinLength, IsMilitaryTime } from "class-validator";
import User from "../identity-access/user";
import ShiftEntry from "../shift-entry/shift-entry";

@Entity()
@Unique("UNQ_NAME_USER", ["name", "user"])
export default class ShiftModel extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @IsString()
  @MinLength(2)
  @Column("text")
  name!: string;

  @IsMilitaryTime()
  @Column("time")
  startsAt!: Date;

  @IsMilitaryTime()
  @Column("time")
  endsAt!: Date;

  @IsString()
  @Column("text")
  color!: string;

  @ManyToOne(() => User, (user) => user.shiftModels)
  user!: User;

  @OneToMany(() => ShiftEntry, (shiftEntry) => shiftEntry.shiftModel)
  shiftEntries!: ShiftEntry[];

  @DeleteDateColumn()
  deletedAt?: Date;
}
