import { User } from "../../user/entity/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Resume {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createdDate: Date;

    @UpdateDateColumn()
    updatedDate: Date;

    @Column()
    projectName: string;

    @Column("longtext")
    projectDetail: string;

    @Column()
    projectTerm: string;

    @Column("longtext")
    projectRole: string;

    @Column("longtext")
    projectResult: string;

    @Column("longtext")
    projectFeeling: string;

    @ManyToOne(() => User, user => user.resumes, {
        onDelete: "CASCADE"
    })
    user: User;
}