import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Resume } from '../resume/entity/resume.entity';
import { Repository } from 'typeorm';
import { ResumeProject } from './entity/resumeProject.entity';
import { User } from '../user/entity/user.entity';
import { CreateResumeProjectRequestDto } from './dto/createResumeProjectRequestDto';
import { UpdateResumeProjectRequestDto } from './dto/updateResumeProjectRequestDto';

@Injectable()
export class ResumeProjectService {
    constructor(
        @InjectRepository(ResumeProject)
        private resumeProjectRepository: Repository<ResumeProject>
    ) {};

    getResumeProject(id: Number, resume: Resume, user: User): Promise<any> {
        console.log(`[DB] Get Resume Project : ${user.kakaoId} ${id}`);

        return this.resumeProjectRepository.findOne({
            where: {
                id,
                resume
            }
        });
    };

    getResumeProjects(resume: Resume, user: User): Promise<any> {
        console.log(`[DB] Get Resume Projects : ${user.kakaoId}`);

        return this.resumeProjectRepository.find({
            where: {
                resume
            }
        });
    };

    async createResumeProject(createResumeProjectRequestDto: CreateResumeProjectRequestDto, resume: Resume): Promise<any> {
        const { projectName, projectDetail, projectTerm, projectRole, projectResult, projectFeeling } = createResumeProjectRequestDto;
        console.log(`[DB] Create Resume Project : ${projectName} ${projectDetail} ${projectTerm} ${projectRole} ${projectResult} ${projectFeeling}`);
        const pjRole = projectRole.join(' / ');
        const pjResult = projectResult.join(' / ');
        const pjFeeling = projectFeeling.join(' / ');

        return await this.resumeProjectRepository.insert({
            projectName,
            projectDetail,
            projectTerm,
            projectRole: pjRole,
            projectResult: pjResult,
            projectFeeling: pjFeeling,
            resume
        });
    };

    async updateResumeProject(updateResumeRequestDto: UpdateResumeProjectRequestDto, resume: Resume): Promise<any> {
        const { id, projectName, projectDetail, projectTerm, projectRole, projectResult, projectFeeling } = updateResumeRequestDto;
        console.log(`[DB] Update Resume Project : ${projectName} ${projectDetail} ${projectTerm} ${projectRole} ${projectResult} ${projectFeeling}`);
        const pjRole = projectRole.join(' / ');
        const pjResult = projectResult.join(' / ');
        const pjFeeling = projectFeeling.join(' / ');

        return await this.resumeProjectRepository.update({
            id,
            resume
        }, {
            projectName,
            projectDetail,
            projectTerm,
            projectRole: pjRole,
            projectResult: pjResult,
            projectFeeling: pjFeeling,
        });
    };

    async deleteResumeProject(id: number, resume: Resume): Promise<any> {
        console.log(`[DB] Delete Resume Project : ${id}`);

        return await this.resumeProjectRepository.delete({
            id,
            resume
        });
    };
}
