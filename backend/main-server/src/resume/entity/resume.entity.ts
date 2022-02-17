import { User } from "../../user/entity/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ResumeProject } from "../../resumeProject/entity/resumeProject.entity";

@Entity()
export class Resume {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createdDate: Date;

    @UpdateDateColumn()
    updatedDate: Date;

    @Column("longtext")
    title: string;

    @Column()
    name: string;

    @Column()
    role: string;

    @Column()
    email: string;

    @Column('simple-array')
    contacts: string[];

    @ManyToOne(() => User, user => user.resumes, {
        onDelete: "CASCADE"
    })
    user: User;

    @OneToMany(() => ResumeProject, resumeProject => resumeProject.resume)
    resumeProjects: ResumeProject[];
}