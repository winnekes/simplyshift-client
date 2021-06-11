import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { BaseEntity } from "typeorm/repository/BaseEntity";
import { IsUUID } from "class-validator";
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

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
