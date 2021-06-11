import * as bcrypt from "bcrypt";
import { Exclude } from "class-transformer";
import { IsEmail, IsString, MinLength } from "class-validator";
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  RelationId,
  UpdateDateColumn,
} from "typeorm";
import { BaseEntity } from "typeorm/repository/BaseEntity";
import { Calendar } from "../calendar/calendar-entity";
import { ShiftEntry } from "../shift-entry/shift-entry-entity";
import { ShiftModel } from "../shift-model/shift-model-entity";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @IsEmail()
  @Column("text", { unique: true })
  email!: string;

  @IsString()
  @Column("text")
  firstName!: string;

  @IsString()
  @Column("text")
  lastName!: string;

  @IsString()
  @MinLength(8)
  @Column("text")
  @Exclude({ toPlainOnly: true })
  password!: string;

  async setPassword(rawPassword: string) {
    return (this.password = await bcrypt.hash(rawPassword, 10));
  }

  checkPassword(rawPassword: string): Promise<boolean> {
    return bcrypt.compare(rawPassword, this.password);
  }

  @OneToMany(() => ShiftModel, (shiftModel) => shiftModel.user, {
    onDelete: "CASCADE",
  })
  shiftModels!: ShiftModel[];

  @RelationId((user: User) => user.shiftModels)
  public shiftModelId!: number;

  @OneToMany(() => ShiftEntry, (shiftEntry) => shiftEntry.user, {
    onDelete: "CASCADE",
  })
  shiftEntries!: ShiftEntry[];

  @OneToMany(() => Calendar, (calendar) => calendar.user, {
    onDelete: "CASCADE",
  })
  calendars!: Calendar[];

  @CreateDateColumn({ type: "timestamptz" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "timestamptz" })
  updatedAt?: Date;

  @DeleteDateColumn({ type: "timestamptz" })
  deletedAt?: Date;
}
