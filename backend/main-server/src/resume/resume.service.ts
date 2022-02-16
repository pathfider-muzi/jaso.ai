import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entity/user.entity';
import { Repository } from 'typeorm';
import { Resume } from './entity/resume.entity';
import { CreateResumeRequestDto } from './dto/createResumeRequestDto';
import { UpdateResumeRequestDto } from './dto/updateResumeRequestDto';

@Injectable()
export class ResumeService {
    constructor(
        @InjectRepository(Resume)
        private resumeRepository: Repository<Resume>
    ) {};

    getResume(id: Number, user: User): Promise<any> {
        console.log(`[DB] Get Resume : ${user.kakaoId} ${id}`);

        return this.resumeRepository.findOne({
            where: {
                id: id,
                user: user
            }
        });
    };

    getResumes(user: User): Promise<any> {
        console.log(`[DB] Get Resumes : ${user.kakaoId}`);

        return this.resumeRepository.find({
            where: {
                user: user
            }
        });
    };

    async createResume(createResumeRequestDto: CreateResumeRequestDto, user: User): Promise<any> {
        const { projectName, projectDetail, projectTerm, projectRole, projectResult, projectFeeling } = createResumeRequestDto;
        console.log(`[DB] Create Resume : ${user.kakaoId} ${projectName} ${projectDetail} ${projectTerm} ${projectRole} ${projectResult} ${projectFeeling}`);
        const pjRole = projectRole.join(' / ');
        const pjResult = projectResult.join(' / ');
        const pjFeeling = projectFeeling.join(' / ');

        return await this.resumeRepository.insert({
            projectName,
            projectDetail,
            projectTerm,
            projectRole: pjRole,
            projectResult: pjResult,
            projectFeeling: pjFeeling,
            user
        });
    };

    async updateResume(updateResumeRequestDto: UpdateResumeRequestDto, user: User): Promise<any> {
        const { id, projectName, projectDetail, projectTerm, projectRole, projectResult, projectFeeling } = updateResumeRequestDto;
        console.log(`[DB] Update Resume : ${user.kakaoId} ${projectName} ${projectDetail} ${projectTerm} ${projectRole} ${projectResult} ${projectFeeling}`);
        const pjRole = projectRole.join(' / ');
        const pjResult = projectResult.join(' / ');
        const pjFeeling = projectFeeling.join(' / ');

        return await this.resumeRepository.update({
            id,
            user
        }, {
            projectName,
            projectDetail,
            projectTerm,
            projectRole: pjRole,
            projectResult: pjResult,
            projectFeeling: pjFeeling,
        });
    };

    async deleteResume(id: number, user: User): Promise<any> {
        console.log(`[DB] Delete Resume : ${user.kakaoId} ${id}`);

        return await this.resumeRepository.delete({
            id,
            user
        });
    };
};
