import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { BaseEntity } from 'typeorm/repository/BaseEntity';
import { IsString, MinLength, IsEmail, IsUrl } from 'class-validator';
import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';

@Entity()
export default class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id?: number;

    @MinLength(2)
    @Column('text')
    username: string;

    @IsEmail()
    @Column('text')
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
}
