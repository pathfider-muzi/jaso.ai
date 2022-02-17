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
            relations: ["resumeProjects"],
            where: {
                id: id,
                user: user
            }
        });
    };

    getResumes(user: User): Promise<any> {
        console.log(`[DB] Get Resumes : ${user.kakaoId}`);

        return this.resumeRepository.find({
            relations: ["resumeProjects"],
            where: {
                user: user
            }
        });
    };

    async createResume(createResumeRequestDto: CreateResumeRequestDto, user: User): Promise<any> {
        const { title, name, role, email, contacts } = createResumeRequestDto;
        console.log(`[DB] Create Resume : ${user.kakaoId} ${title} ${name} ${role} ${email} ${contacts}`);

        return await this.resumeRepository.insert({
            title,
            name,
            role,
            email,
            contacts,
            user
        });
    };

    async updateResume(updateResumeRequestDto: UpdateResumeRequestDto, user: User): Promise<any> {
        const { id, title, name, role, email, contacts } = updateResumeRequestDto;
        console.log(`[DB] Update Resume : ${user.kakaoId} ${title} ${name} ${role} ${email} ${contacts}`);

        return await this.resumeRepository.update({
            id,
            user
        }, {
            title,
            name,
            role,
            email,
            contacts,
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
