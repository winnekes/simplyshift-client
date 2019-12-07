import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToMany,
    ManyToOne,
    OneToMany,
    Unique,
} from 'typeorm';
import { BaseEntity } from 'typeorm/repository/BaseEntity';
import {
    IsString,
    MinLength,
    IsDate,
    IsNumber,
    Min,
    IsDateString,
} from 'class-validator';
import User from '../users/entity';
import ShiftEntry from '../shiftEntries/entity';

@Entity()
@Unique('UNQ_NAME_USER', ['name', 'user'])
export default class ShiftModel extends BaseEntity {
    @PrimaryGeneratedColumn()
    id?: number;

    @IsString()
    @MinLength(2)
    @Column('text')
    name: string;

    @IsDateString()
    @Column('timestamp')
    startsAt: Date;

    @IsNumber()
    @Min(0)
    @Column('bigint')
    duration: number;

    @IsString()
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
