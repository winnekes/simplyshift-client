import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToMany,
    ManyToOne,
} from 'typeorm';
import { BaseEntity } from 'typeorm/repository/BaseEntity';
import { IsString, MinLength, Min } from 'class-validator';
import User from '../users/entity';
import ShiftModel from '../shiftModels/entity';

@Entity('shift_entries')
export default class ShiftEntry extends BaseEntity {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column('timestamp')
    startsAt: Date;

    @Column('timestamp')
    endsAt: Date;

    @Column('varchar')
    note: string;

    @ManyToOne(
        () => User,
        user => user.shiftEntries,
        { nullable: false }
    )
    user: User;

    @ManyToOne(
        () => ShiftModel,
        shiftModel => shiftModel.shiftEntries,
        { nullable: false }
    )
    shiftModel: ShiftModel;
}
