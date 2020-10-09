import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    Unique,
} from 'typeorm';
import { BaseEntity } from 'typeorm/repository/BaseEntity';
import {
    IsString,
    MinLength,
    IsEmail,
    IsUrl,
    getFromContainer,
    MetadataStorage,
} from 'class-validator';
import * as bcrypt from 'bcrypt';

import { validationMetadatasToSchemas } from 'class-validator-jsonschema';
import { Exclude } from 'class-transformer';
import ShiftModel from '../shiftModels/entity';
import ShiftEntry from '../shiftEntries/entity';
@Entity()
export default class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id?: number;

    @MinLength(2)
    @Column('text')
    username: string;

    @IsEmail()
    @Column('text', { unique: true })
    email: string;

    @IsString()
    @MinLength(8)
    @Column('text')
    @Exclude({ toPlainOnly: true })
    password: string;

    @IsUrl()
    @Column('varchar')
    profileUrl: string;

    async setPassword(rawPassword: string) {
        const hash = await bcrypt.hash(rawPassword, 10);
        this.password = hash;
    }

    checkPassword(rawPassword: string): Promise<boolean> {
        return bcrypt.compare(rawPassword, this.password);
    }

    @OneToMany(
        () => ShiftModel,
        shiftModel => shiftModel.user
    )
    shiftModels: ShiftModel[];

    @OneToMany(
        () => ShiftEntry,
        shiftEntry => shiftEntry.user
    )
    shiftEntries: ShiftEntry[];
}