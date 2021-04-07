import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  Unique,
} from "typeorm";
import { BaseEntity } from "typeorm/repository/BaseEntity";
import { IsString, MinLength, IsNumber, Min } from "class-validator";
import User from "../identity-access/entity";
import ShiftEntry from "../shiftEntries/entity";

@Entity()
@Unique("UNQ_NAME_USER", ["name", "user"])
export default class ShiftModel extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @IsString()
  @MinLength(2)
  @Column("text")
  name!: string;

  @IsNumber()
  @Min(0)
  @Column("bigint")
  startsAt!: number;

  @IsNumber()
  @Min(0)
  @Column("bigint")
  duration!: number;

  @IsString()
  @Column("text")
  color!: string;

  @ManyToOne(() => User, (user) => user.shiftModels)
  user!: User;

  @OneToMany(() => ShiftEntry, (shiftEntry) => shiftEntry.shiftModel)
  shiftEntries!: ShiftEntry[];
}
