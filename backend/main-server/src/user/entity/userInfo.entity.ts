import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class UserInfo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: true
    })
    name: string;

    @Column({
        nullable: true
    })
    email: string;

    @Column({
        nullable: true
    })
    university: string;

    @Column({
        nullable: true
    })
    major: string;

    @Column({
        nullable: true
    })
    grade: string;

    @Column({
        nullable: true
    })
    languageScore: string;

    @Column({
        nullable: true
    })
    career: string;

    @Column({
        nullable: true
    })
    activity: string;

    @Column({
        nullable: true
    })
    license: string;

    @ManyToOne(() => User, user => user.userInfos, {
        onDelete: "CASCADE"
    })
    user: User;
}