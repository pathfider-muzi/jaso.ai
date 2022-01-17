import { User } from "src/user/entity/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class SelfIntroduction {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createdDate: Date;

    @UpdateDateColumn()
    updatedDate: Date;

    @Column()
    title: string;

    @Column()
    organisationName: string;

    @Column()
    role: string;

    @ManyToOne(() => User, user => user.selfIntroductions, {
        onDelete: "CASCADE"
    })
    user: User;
}