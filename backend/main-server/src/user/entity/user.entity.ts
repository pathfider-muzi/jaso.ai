import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserInfo } from "./userInfo.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    kakaoId: number;

    @Column()
    nickname: string;

    @Column()
    profileImage: string;

    @Column({ default: false })
    agreeToTerms: boolean;

    @OneToMany(() => UserInfo, userInfo => userInfo.user, {
        cascade: true
    })
    userInfos: UserInfo[];
}