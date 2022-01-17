import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entity/user.entity';
import { Repository } from 'typeorm';
import { CreateSelfIntroductionRequestDto } from './dto/createSelfIntroductionRequestDto';
import { deleteSelfIntroductionRequestDto } from './dto/deleteSelfIntroductionRequestDto';
import { GetSelfIntroductionRequestDto } from './dto/getSelfIntroductionRequestDto';
import { updateSelfIntroductionRequestDto } from './dto/updateSelfIntroductionRequestDto';
import { SelfIntroduction } from './entity/selfIntroduction.entity';

@Injectable()
export class SelfIntroductionService {
    constructor(
        @InjectRepository(SelfIntroduction)
        private selfIntroductionRepository: Repository<SelfIntroduction>
    ) {}

    getSelfIntroduction(getSelfIntroductionRequestDto: GetSelfIntroductionRequestDto, user: User): Promise<any> {
        const { id } = getSelfIntroductionRequestDto;
        console.log(`[DB] Get Self-Introduction : ${user.kakaoId} ${id}`);

        return this.selfIntroductionRepository.findOne({
            where: {
                id: id,
                user: user
            }
        })
    }

    getSelfIntroductions(user: User): Promise<any> {
        console.log(`[DB] Get Self-Introductions : ${user.kakaoId}`);

        return this.selfIntroductionRepository.find({
            where: {
                user: user
            }
        })
    }

    async createSelfIntroduction(createSelfIntroductionRequestDto: CreateSelfIntroductionRequestDto, user: User): Promise<any> {
        const { title, organisationName, role } = createSelfIntroductionRequestDto;
        console.log(`[DB] Create Self-Introduction : ${user.kakaoId} ${title} ${organisationName} ${role}`);
    
        return await this.selfIntroductionRepository.insert({
            title: title,
            organisationName: organisationName,
            role: role,
            user: user
        })
    }

    async updateSelfIntroduction(updateSelfIntroductionRequestDto: updateSelfIntroductionRequestDto, user: User): Promise<any> {
        const { id, title, organisationName, role } = updateSelfIntroductionRequestDto;
        console.log(`[DB] Update Self-Introduction : ${user.kakaoId} ${id} ${title} ${organisationName} ${role}`);

        return await this.selfIntroductionRepository.update({
            id: id,
            user: user
        }, {
            title: title,
            organisationName: organisationName,
            role: role
        })
    }

    async deleteSelfIntroduction(deleteSelfIntroductionRequestDto: deleteSelfIntroductionRequestDto, user: User): Promise<any> {
        const { id } = deleteSelfIntroductionRequestDto;
        console.log(`[DB] Delete Self-Introduction : ${user.kakaoId} ${id}`);

        return await this.selfIntroductionRepository.delete({
            id: id,
            user: user
        })
    }
}
