import { Body, Controller, Get, UseGuards, Request, NotFoundException, Post, Patch, Delete, Param, Query } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { SelfIntroductionService } from '../selfIntroduction/selfIntroduction.service';
import { UserService } from '../user/user.service';
import { CreateQnaRequestDto } from './dto/createQnaRequestDto';
import { UpdateQnaRequestDto } from './dto/updateQnaRequestDto';
import { QnaService } from './qna.service';

@Controller()
export class QnaController {
    constructor(
        private qnaService: QnaService,
        private userService: UserService,
        private selfIntroductionService : SelfIntroductionService
    ) {}

    @UseGuards(JwtAuthGuard)
    @Get('qna/:id')
    async getQna(@Param('id') id, @Query('selfIntroductionId') selfIntroductionId, @Request() req) {
        const kakaoId = req.user.kakaoId;
        console.log(`[API] GET /qna : ${kakaoId} ${selfIntroductionId} ${id}`);
        
        const user = await this.userService.getUser(kakaoId);
        if (!user) {
            throw new NotFoundException();
        }
        
        const selfIntroduction = await this.selfIntroductionService.getSelfIntroduction(selfIntroductionId, user);
        if (!selfIntroduction) {
            throw new NotFoundException();
        }

        const qna = await this.qnaService.getQna(id, selfIntroduction, user);
        if (!qna) {
            throw new NotFoundException();
        }

        return qna;
    }

    @UseGuards(JwtAuthGuard)
    @Get('qnas')
    async getQnas(@Query('selfIntroductionId') selfIntroductionId, @Request() req) {
        const kakaoId = req.user.kakaoId;
        console.log(`[API] POST /qna : ${kakaoId} ${selfIntroductionId}`);
    
        const user = await this.userService.getUser(kakaoId);
        if (!user) {
            throw new NotFoundException();
        }
        
        const selfIntroduction = await this.selfIntroductionService.getSelfIntroduction(selfIntroductionId, user);
        if (!selfIntroduction) {
            throw new NotFoundException();
        }

        return await this.qnaService.getQnas(selfIntroduction, user);
    }

    @UseGuards(JwtAuthGuard)
    @Post('qna')
    async createQna(@Body() createQnaRequestDto: CreateQnaRequestDto, @Request() req) {
        const kakaoId = req.user.kakaoId;
        const { selfIntroductionId, question, answer, maxCount } = createQnaRequestDto;
        console.log(`[API] POST /qna : ${kakaoId} ${question} ${answer} ${maxCount}`);
    
        const user = await this.userService.getUser(kakaoId);
        if (!user) {
            throw new NotFoundException();
        }
        
        const selfIntroduction = await this.selfIntroductionService.getSelfIntroduction(selfIntroductionId, user);
        if (!selfIntroduction) {
            throw new NotFoundException();
        }
        
        return await this.qnaService.createQna(question, answer, maxCount, selfIntroduction);
    }

    @UseGuards(JwtAuthGuard)
    @Patch('qna')
    async updateQna(@Body() updateQnaRequestDto: UpdateQnaRequestDto, @Request() req) {
        const kakaoId = req.user.kakaoId;
        const { selfIntroductionId, id, question, answer, maxCount } = updateQnaRequestDto;
        console.log(`[API] PATCH /qna : ${kakaoId} ${id} ${question} ${answer} ${maxCount}`);
    
        const user = await this.userService.getUser(kakaoId);
        if (!user) {
            throw new NotFoundException();
        }
        
        const selfIntroduction = await this.selfIntroductionService.getSelfIntroduction(selfIntroductionId, user);
        if (!selfIntroduction) {
            throw new NotFoundException();
        }

        return await this.qnaService.updateQna(id, question, answer, maxCount, selfIntroduction);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('qna/:id')
    async deleteQna(@Param('id') id, @Query('selfIntroductionId') selfIntroductionId, @Request() req) {
        const kakaoId = req.user.kakaoId;
        console.log(`[API] DELETE /qna : ${kakaoId} ${id}`);
    
        const user = await this.userService.getUser(kakaoId);
        if (!user) {
            throw new NotFoundException();
        }
        
        const selfIntroduction = await this.selfIntroductionService.getSelfIntroduction(selfIntroductionId, user);
        if (!selfIntroduction) {
            throw new NotFoundException();
        }

        return await this.qnaService.deleteQna(id, selfIntroduction);
    }
}
