import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SelfIntroduction } from '../selfIntroduction/entity/selfIntroduction.entity';
import { User } from '../user/entity/user.entity';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';
import { Qna } from './entity/qna.entity';

@Injectable()
export class QnaService {
    constructor(
        @InjectRepository(Qna)
        private qnaRepository: Repository<Qna>
    ) {}

    getQna(id: number, selfIntroduction: SelfIntroduction, user: User): Promise<Qna> {
        console.log(`[DB] Get QnA : ${user.kakaoId} ${selfIntroduction.id} ${id}`);

        return this.qnaRepository.findOne({
            where: {
                selfIntroduction,
                id
            }
        })
    }

    getQnas(selfIntroduction: SelfIntroduction, user: User): Promise<Qna[]> {
        console.log(`[DB] Get QnAs : ${user.kakaoId} ${selfIntroduction.id}`);

        return this.qnaRepository.find({
            where: {
                selfIntroduction
            }
        })
    }

    async createQna(question: string, answer: string, maxCount: number, selfIntroduction: SelfIntroduction): Promise<InsertResult> {
        console.log(`[DB] Create QnA : ${selfIntroduction.id} ${question} ${answer} ${maxCount}`);

        return await this.qnaRepository.insert({
            question,
            answer,
            maxCount,
            selfIntroduction
        })
    }

    async updateQna(id: number, question: string, answer: string, maxCount: number, selfIntroduction: SelfIntroduction): Promise<UpdateResult> {
        console.log(`[DB] Update QnA : ${selfIntroduction.id} ${id} ${question} ${answer} ${maxCount}`);

        return await this.qnaRepository.update({
            id,
            selfIntroduction
        }, {
            question,
            answer,
            maxCount
        })
    }

    async deleteQna(id: number, selfIntroduction: SelfIntroduction): Promise<DeleteResult> {
        console.log(`[DB] DELETE QnA : ${selfIntroduction.id} ${id}`);

        return await this.qnaRepository.delete({
            selfIntroduction,
            id
        });
    }
}
