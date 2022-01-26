import { Qna } from "../../qna/entity/qna.entity";
import { User } from "../../user/entity/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class SelfIntroduction {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createdDate: Date;

    @UpdateDateColumn()
    updatedDate: Date;

    @Column("longtext")
    title: string;

    @Column()
    organisationName: string;

    @Column()
    role: string;

    @ManyToOne(() => User, user => user.selfIntroductions, {
        onDelete: "CASCADE"
    })
    user: User;

    @OneToMany(() => Qna, qna => qna.selfIntroduction)
    qnas: Qna[];
}