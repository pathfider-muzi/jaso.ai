import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { identity } from 'rxjs';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserService } from '../user/user.service';
import { CreateResumeRequestDto } from './dto/createResumeRequestDto';
import { UpdateResumeRequestDto } from './dto/updateResumeRequestDto';
import { ResumeService } from './resume.service';

@Controller()
export class ResumeController {
    constructor(
        private resumeService: ResumeService,
        private userService: UserService
    ) {};

    @UseGuards(JwtAuthGuard)
    @Get('resume/:id')
    async getResume(@Request() req, @Param('id') id: Number): Promise<any> {
        const kakaoId = req.user.kakaoId;
        console.log(`[API] GET /resume : ${kakaoId} ${id}`);
        const user = await this.userService.getUser(kakaoId);
        if (!user) {
            throw new NotFoundException();
        }

        let resume = await this.resumeService.getResume(id, user);
        if (!resume) {
            throw new NotFoundException();
        }

        return resume;
    };

    @UseGuards(JwtAuthGuard)
    @Get('resumes')
    async getResumes(@Request() req) {
        const kakaoId = req.user.kakaoId;
        console.log(`[API] GET /resumes : ${kakaoId}`);
        const user = await this.userService.getUser(kakaoId);
        if (!user) {
            throw new NotFoundException();
        }

        return await this.resumeService.getResumes(user);
    };

    @UseGuards(JwtAuthGuard)
    @Post('resume')
    async createResume(@Body() createResumeRequestDto: CreateResumeRequestDto, @Request() req) {
        const kakaoId = req.user.kakaoId;
        const { title, name, role, email, contacts } = createResumeRequestDto;
        console.log(`[API] POST /resume : ${kakaoId} ${title} ${name} ${role} ${email} ${contacts}`);
        const user = await this.userService.getUser(kakaoId);
        if (!user) {
            throw new NotFoundException();
        }

        return await this.resumeService.createResume(createResumeRequestDto, user);
    };

    @UseGuards(JwtAuthGuard)
    @Patch('resume')
    async updateResume(@Body() updateResumeRequestDto: UpdateResumeRequestDto, @Request() req) {
        const kakaoId = req.user.kakaoId;
        const { id, title, name, role, email, contacts } = updateResumeRequestDto;
        console.log(`[API] PATCH /resume : ${kakaoId} ${id} ${title} ${name} ${role} ${email} ${contacts}`);
        const user = await this.userService.getUser(kakaoId);
        if (!user) {
            throw new NotFoundException();
        }

        return await this.resumeService.updateResume(updateResumeRequestDto, user);
    };

    @UseGuards(JwtAuthGuard)
    @Delete('resume/:id')
    async deleteResume(@Param('id') id, @Request() req) {
        const kakaoId = req.user.kakaoId;
        console.log(`[API] DELETE /resume : ${kakaoId} ${id}`);
        const user = await this.userService.getUser(kakaoId);
        if (!user) {
            throw new NotFoundException();
        }

        return await this.resumeService.deleteResume(id, user);
    };
}
