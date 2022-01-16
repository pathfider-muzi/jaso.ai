import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class UserInfo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    university: string;

    @Column()
    major: string;

    @Column()
    grade: string;

    @Column()
    languageScore: string;

    @Column()
    career: string;

    @Column()
    activity: string;

    @Column()
    license: string;

    @ManyToOne(() => User, user => user.userInfos)
    user: User;
}