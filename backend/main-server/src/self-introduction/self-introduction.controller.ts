import { Controller, Get, UseGuards, Request, Body, UnauthorizedException, Post, Patch, Delete } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserService } from 'src/user/user.service';
import { UpdateDateColumn } from 'typeorm';
import { CreateSelfIntroductionRequestDto } from './dto/createSelfIntroductionRequestDto';
import { deleteSelfIntroductionRequestDto } from './dto/deleteSelfIntroductionRequestDto';
import { GetSelfIntroductionRequestDto } from './dto/getSelfIntroductionRequestDto';
import { updateSelfIntroductionRequestDto } from './dto/updateSelfIntroductionRequestDto';
import { SelfIntroductionService } from './self-introduction.service';

@Controller()
export class SelfIntroductionController {
    constructor(
        private selfIntroductionService: SelfIntroductionService,
        private userService: UserService
    ) {}

    @UseGuards(JwtAuthGuard)
    @Get('self-introduction')
    async getSelfIntroduction(@Body() getSelfIntroductionRequestDto: GetSelfIntroductionRequestDto, @Request() req) {
        const kakaoId = req.user.kakaoId;
        const { id } = getSelfIntroductionRequestDto;
        console.log(`[API] GET /self-introduction : ${kakaoId} ${id}`);
        const user = await this.userService.getUser(kakaoId);
        if (!user) {
            throw new UnauthorizedException();
        }

        const selfIntroduction = await this.selfIntroductionService.getSelfIntroduction(getSelfIntroductionRequestDto, user);
        if (!selfIntroduction) {
            throw new UnauthorizedException();
        }

        return selfIntroduction;
    }

    @UseGuards(JwtAuthGuard)
    @Get('self-introductions')
    async getSelfIntroductions(@Request() req) {
        const kakaoId = req.user.kakaoId;
        console.log(`[API] GET /self-introduction : ${kakaoId}`);
        const user = await this.userService.getUser(kakaoId);
        if (!user) {
            throw new UnauthorizedException();
        }

        return await this.selfIntroductionService.getSelfIntroductions(user);
    }
    
    @UseGuards(JwtAuthGuard)
    @Post('self-introduction')
    async createSelfIntroduction(@Body() createSelfIntroductionRequestDto: CreateSelfIntroductionRequestDto, @Request() req) {
        const kakaoId = req.user.kakaoId;
        const { title, organisationName, role } = createSelfIntroductionRequestDto;
        console.log(`[API] POST /self-introduction : ${kakaoId} ${title} ${organisationName} ${role}`);
        const user = await this.userService.getUser(kakaoId);
        if (!user) {
            throw new UnauthorizedException();
        }

        return await this.selfIntroductionService.createSelfIntroduction(createSelfIntroductionRequestDto, user);
    }

    @UseGuards(JwtAuthGuard)
    @Patch('self-introduction')
    async updateSelfIntroduction(@Body() updateSelfIntroductionRequestDto: updateSelfIntroductionRequestDto, @Request() req) {
        const kakaoId = req.user.kakaoId;
        const { id, title, organisationName, role } = updateSelfIntroductionRequestDto;
        console.log(`[API] PATCH /self-introduction : ${kakaoId} ${id} ${title} ${organisationName} ${role}`);
        const user = await this.userService.getUser(kakaoId);
        if (!user) {
            throw new UnauthorizedException();
        }

        return await this.selfIntroductionService.updateSelfIntroduction(updateSelfIntroductionRequestDto, user);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('self-introduction')
    async deleteSelfIntroduction(@Body() deleteSelfIntroductionRequestDto: deleteSelfIntroductionRequestDto, @Request() req) {
        const kakaoId = req.user.kakaoId;
        const { id } = deleteSelfIntroductionRequestDto;
        console.log(`[API] DELETE /self-introduction : ${kakaoId} ${id}`);
        const user = await this.userService.getUser(kakaoId);
        if (!user) {
            throw new UnauthorizedException();
        }

        return await this.selfIntroductionService.deleteSelfIntroduction(deleteSelfIntroductionRequestDto, user);
    }
}
