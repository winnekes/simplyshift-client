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
  UpdateDateColumn,
} from "typeorm";
import { BaseEntity } from "typeorm/repository/BaseEntity";
import ShiftEntry from "../shift-entry/shift-entry";
import ShiftModel from "../shift-model/shift-model";

@Entity()
export default class User extends BaseEntity {
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

  @OneToMany(() => ShiftModel, (shiftModel) => shiftModel.user)
  shiftModels!: ShiftModel[];

  @OneToMany(() => ShiftEntry, (shiftEntry) => shiftEntry.user)
  shiftEntries!: ShiftEntry[];

  @CreateDateColumn({ type: "timestamptz" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "timestamptz" })
  updatedAt?: Date;

  @DeleteDateColumn({ type: "timestamptz" })
  deletedAt?: Date;
}
