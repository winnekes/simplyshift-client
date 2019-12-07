import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToMany,
    ManyToOne,
    OneToMany,
} from 'typeorm';
import { BaseEntity } from 'typeorm/repository/BaseEntity';
import { IsString, MinLength, Min } from 'class-validator';
import User from '../users/entity';
import ShiftEntry from '../shiftEntries/entity';

@Entity()
export default class ShiftModel extends BaseEntity {
    @PrimaryGeneratedColumn()
    id?: number;

    @MinLength(2)
    @Column('text')
    name: string;

    @Column('timestamp')
    startsAt: Date;

    @Column('bigint')
    duration: number;

    @Column('text')
    color: string;

    @ManyToOne(
        () => User,
        user => user.shiftModels,
        { nullable: false }
    )
    user: User;

    @OneToMany(
        () => ShiftEntry,
        shiftEntry => shiftEntry.shiftModel
    )
    shiftEntries: ShiftEntry[];
}
