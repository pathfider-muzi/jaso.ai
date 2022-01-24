import { Controller, Get, UseGuards, Request, Body, Post, Patch, Delete, NotFoundException, Param } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserService } from '../user/user.service';
import { CreateSelfIntroductionRequestDto } from './dto/createSelfIntroductionRequestDto';
import { DeleteSelfIntroductionRequestDto } from './dto/deleteSelfIntroductionRequestDto';
import { UpdateSelfIntroductionRequestDto } from './dto/updateSelfIntroductionRequestDto';
import { SelfIntroductionService } from './selfIntroduction.service';

@Controller()
export class SelfIntroductionController {
    constructor(
        private selfIntroductionService: SelfIntroductionService,
        private userService: UserService
    ) {}

    @UseGuards(JwtAuthGuard)
    @Get('self-introduction/:id')
    async getSelfIntroduction(@Request() req, @Param('id') id: Number): Promise<any> {
        const kakaoId = req.user.kakaoId;
        console.log(`[API] GET /self-introduction : ${kakaoId} ${id}`);
        const user = await this.userService.getUser(kakaoId);
        if (!user) {
            throw new NotFoundException();
        }

        const selfIntroduction = await this.selfIntroductionService.getSelfIntroduction(id, user);
        if (!selfIntroduction) {
            throw new NotFoundException();
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
            throw new NotFoundException();
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
            throw new NotFoundException();
        }

        return await this.selfIntroductionService.createSelfIntroduction(createSelfIntroductionRequestDto, user);
    }

    @UseGuards(JwtAuthGuard)
    @Patch('self-introduction')
    async updateSelfIntroduction(@Body() updateSelfIntroductionRequestDto: UpdateSelfIntroductionRequestDto, @Request() req) {
        const kakaoId = req.user.kakaoId;
        const { id, title, organisationName, role } = updateSelfIntroductionRequestDto;
        console.log(`[API] PATCH /self-introduction : ${kakaoId} ${id} ${title} ${organisationName} ${role}`);
        const user = await this.userService.getUser(kakaoId);
        if (!user) {
            throw new NotFoundException();
        }

        return await this.selfIntroductionService.updateSelfIntroduction(updateSelfIntroductionRequestDto, user);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('self-introduction/:id')
    async deleteSelfIntroduction(@Param('id') id, @Request() req) {
        const kakaoId = req.user.kakaoId;
        console.log(`[API] DELETE /self-introduction : ${kakaoId} ${id}`);
        const user = await this.userService.getUser(kakaoId);
        if (!user) {
            throw new NotFoundException();
        }

        return await this.selfIntroductionService.deleteSelfIntroduction(id, user);
    }
}
