import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entity/user.entity';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';
import { CreateSelfIntroductionRequestDto } from './dto/createSelfIntroductionRequestDto';
import { deleteSelfIntroductionRequestDto } from './dto/deleteSelfIntroductionRequestDto';
import { updateSelfIntroductionRequestDto } from './dto/updateSelfIntroductionRequestDto';
import { SelfIntroduction } from './entity/selfIntroduction.entity';

@Injectable()
export class SelfIntroductionService {
    constructor(
        @InjectRepository(SelfIntroduction)
        private selfIntroductionRepository: Repository<SelfIntroduction>
    ) {}

    getSelfIntroduction(id: number, user: User): Promise<SelfIntroduction> {
        console.log(`[DB] Get Self-Introduction : ${user.kakaoId} ${id}`);

        return this.selfIntroductionRepository.findOne({
            relations: ["qnas"],
            where: {
                id,
                user
            }
        })
    }

    getSelfIntroductions(user: User): Promise<SelfIntroduction[]> {
        console.log(`[DB] Get Self-Introductions : ${user.kakaoId}`);

        return this.selfIntroductionRepository.find({
            relations: ["qnas"],
            where: {
                user
            }
        })
    }

    async createSelfIntroduction(createSelfIntroductionRequestDto: CreateSelfIntroductionRequestDto, user: User): Promise<InsertResult> {
        const { title, organisationName, role } = createSelfIntroductionRequestDto;
        console.log(`[DB] Create Self-Introduction : ${user.kakaoId} ${title} ${organisationName} ${role}`);
    
        return await this.selfIntroductionRepository.insert({
            title,
            organisationName,
            role,
            user
        })
    }

    async updateSelfIntroduction(updateSelfIntroductionRequestDto: updateSelfIntroductionRequestDto, user: User): Promise<UpdateResult> {
        const { id, title, organisationName, role } = updateSelfIntroductionRequestDto;
        console.log(`[DB] Update Self-Introduction : ${user.kakaoId} ${id} ${title} ${organisationName} ${role}`);

        return await this.selfIntroductionRepository.update({
            id: id,
            user
        }, {
            title,
            organisationName,
            role
        })
    }

    async deleteSelfIntroduction(deleteSelfIntroductionRequestDto: deleteSelfIntroductionRequestDto, user: User): Promise<DeleteResult> {
        const { id } = deleteSelfIntroductionRequestDto;
        console.log(`[DB] Delete Self-Introduction : ${user.kakaoId} ${id}`);

        return await this.selfIntroductionRepository.delete({
            id,
            user
        })
    }
}
