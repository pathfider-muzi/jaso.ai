import { SelfIntroduction } from "../../selfIntroduction/entity/selfIntroduction.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Qna {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createdDate: Date;

    @UpdateDateColumn()
    updatedDate: Date;

    @Column("longtext")
    question: string;

    @Column("longtext")
    answer: string;

    @Column()
    maxCount: number;

    @ManyToOne(() => SelfIntroduction, selfIntroduction => selfIntroduction.qnas, {
        onDelete: "CASCADE"
    })
    selfIntroduction: SelfIntroduction;
}