import { SelfIntroduction } from "../../selfIntroduction/entity/selfIntroduction.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserInfo } from "./userInfo.entity";
import { Resume } from "../../resume/entity/resume.entity";

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

    @OneToMany(() => UserInfo, userInfo => userInfo.user)
    userInfos: UserInfo[];

    @OneToMany(() => SelfIntroduction, selfIntroduction => selfIntroduction.user)
    selfIntroductions: SelfIntroduction[];

    @OneToMany(() => Resume, resume => resume.user)
    resumes: Resume[];
}