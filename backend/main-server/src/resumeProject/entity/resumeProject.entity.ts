import { Resume } from "../../resume/entity/resume.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class ResumeProject {
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

    @ManyToOne(() => Resume, resume => resume.resumeProjects, {
        onDelete: "CASCADE"
    })
    resume: Resume;
}