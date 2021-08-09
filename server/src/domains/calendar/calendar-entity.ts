import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from "typeorm";
import { BaseEntity } from "typeorm/repository/BaseEntity";
import { IsBoolean, IsHexColor, IsString } from "class-validator";
import { User } from "../identity-access/user-entity";
import { ShiftEntry } from "../shift-entry/shift-entry-entity";

@Entity()
export class Calendar extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @IsString()
  @Column("varchar", { default: "default" })
  name!: string;

  @IsHexColor()
  @Column("varchar", { default: "#efefef" })
  color!: string;

  @IsBoolean()
  @Column("boolean", { default: false })
  isDefault!: boolean;

  @ManyToOne(() => User, (user) => user.calendars, {
    cascade: true,
    onDelete: "CASCADE",
  })
  user!: User;

  @OneToMany(() => ShiftEntry, (shiftEntry) => shiftEntry.calendar)
  shiftEntries!: ShiftEntry[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
