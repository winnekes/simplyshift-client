import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import { BaseEntity } from "typeorm/repository/BaseEntity";
import { IsUUID } from "class-validator";
import { User } from "../identity-access/user-entity";
import { Calendar } from "./calendar-entity";

@Entity()
export default class CalendarShareLookup extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @OneToOne(() => Calendar)
  @JoinColumn()
  calendar!: Calendar;

  @IsUUID()
  @Column("uuid")
  uuid!: number;

  @ManyToOne(() => User, (user) => user.calendars, {
    cascade: true,
    onDelete: "CASCADE",
  })
  user!: User;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
