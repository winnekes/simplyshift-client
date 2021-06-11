import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  Unique,
  DeleteDateColumn,
  CreateDateColumn,
  UpdateDateColumn,
  RelationId,
} from "typeorm";
import { BaseEntity } from "typeorm/repository/BaseEntity";
import {
  IsString,
  MinLength,
  IsMilitaryTime,
  IsHexColor,
} from "class-validator";
import { User } from "../identity-access/user-entity";
import { ShiftEntry } from "../shift-entry/shift-entry-entity";

@Entity()
@Unique("UNQ_NAME_USER", ["name", "user"])
export class ShiftModel extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @IsString()
  @MinLength(2)
  @Column("text")
  name!: string;

  @IsMilitaryTime()
  @Column("time")
  startsAt!: string;

  @IsMilitaryTime()
  @Column("time")
  endsAt!: string;

  @IsHexColor()
  @Column("text")
  color!: string;

  @ManyToOne(() => User, (user) => user.shiftModels, {
    cascade: true,
    onDelete: "CASCADE",
  })
  user!: User;

  @RelationId((shiftModel: ShiftModel) => shiftModel.user)
  public userId!: number;

  @OneToMany(() => ShiftEntry, (shiftEntry) => shiftEntry.shiftModel)
  shiftEntries!: ShiftEntry[];

  @CreateDateColumn({ type: "timestamptz" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "timestamptz" })
  updatedAt?: Date;

  @DeleteDateColumn({ type: "timestamptz" })
  deletedAt?: Date;
}
