import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ResumeService } from '../resume/resume.service';
import { UserService } from '../user/user.service';
import { CreateResumeProjectRequestDto } from './dto/createResumeProjectRequestDto';
import { UpdateResumeProjectRequestDto } from './dto/updateResumeProjectRequestDto';
import { ResumeProjectService } from './resumeProject.service';

@Controller()
export class ResumeProjectController {
    constructor(
        private resumeProjectService: ResumeProjectService,
        private userService: UserService,
        private resumeService: ResumeService
    ) {};

    @UseGuards(JwtAuthGuard)
    @Get('resume-project/:id')
    async getResumeProject(@Request() req, @Param('id') id: Number, @Query('resumeId') resumeId): Promise<any> {
        const kakaoId = req.user.kakaoId;
        console.log(`[API] GET /resume/project : ${kakaoId} ${resumeId} ${id}`);
        const user = await this.userService.getUser(kakaoId);
        if (!user) {
            throw new NotFoundException();
        }

        const resume = await this.resumeService.getResume(resumeId, user);
        if (!resume) {
            throw new NotFoundException();
        }

        let resumeProject = await this.resumeProjectService.getResumeProject(id, resume, user);
        if (!resumeProject) {
            throw new NotFoundException();
        }

        resumeProject.projectRole = resumeProject.projectRole.split(" / ");
        resumeProject.projectResult = resumeProject.projectResult.split(" / ");
        resumeProject.projectFeeling = resumeProject.projectFeeling.split(" / ");
        return resumeProject;
    };

    @UseGuards(JwtAuthGuard)
    @Get('resume-projects')
    async getResumeProjects(@Request() req, @Query('resumeId') resumeId) {
        const kakaoId = req.user.kakaoId;
        console.log(`[API] GET /resume/projects : ${kakaoId}`);
        const user = await this.userService.getUser(kakaoId);
        if (!user) {
            throw new NotFoundException();
        }

        const resume = await this.resumeService.getResume(resumeId, user);
        if (!resume) {
            throw new NotFoundException();
        }

        let resumeProjects = await this.resumeProjectService.getResumeProjects(resume, user);
        resumeProjects.map(resumeProject => {
            resumeProject.projectRole = resumeProject.projectRole.split(" / ");
            resumeProject.projectResult = resumeProject.projectResult.split(" / ");
            resumeProject.projectFeeling = resumeProject.projectFeeling.split(" / ");
        });
        return resumeProjects;
    };

    @UseGuards(JwtAuthGuard)
    @Post('resume-project')
    async createResumeProject(@Body() createResumeProjectRequestDto: CreateResumeProjectRequestDto, @Request() req) {
        const kakaoId = req.user.kakaoId;
        const { resumeId, projectName, projectDetail, projectTerm, projectRole, projectResult, projectFeeling } = createResumeProjectRequestDto;
        console.log(`[API] POST /resume/project : ${kakaoId} ${projectName} ${projectDetail} ${projectTerm} ${projectRole} ${projectResult} ${projectFeeling}`);
        
        const user = await this.userService.getUser(kakaoId);
        if (!user) {
            throw new NotFoundException();
        }

        const resume = await this.resumeService.getResume(resumeId, user);
        if (!resume) {
            throw new NotFoundException();
        }

        return await this.resumeProjectService.createResumeProject(createResumeProjectRequestDto, resume);
    };

    @UseGuards(JwtAuthGuard)
    @Patch('resume-project')
    async updateResumeProject(@Body() updateResumeProjectRequestDto: UpdateResumeProjectRequestDto, @Request() req) {
        const kakaoId = req.user.kakaoId;
        const { id, resumeId, projectName, projectDetail, projectTerm, projectRole, projectResult, projectFeeling } = updateResumeProjectRequestDto;
        console.log(`[API] PATCH /resume/project : ${kakaoId} ${id} ${projectName} ${projectDetail} ${projectTerm} ${projectRole} ${projectResult} ${projectFeeling}`);
        
        const user = await this.userService.getUser(kakaoId);
        if (!user) {
            throw new NotFoundException();
        }

        const resume = await this.resumeService.getResume(resumeId, user);
        if (!resume) {
            throw new NotFoundException();
        }

        return await this.resumeProjectService.updateResumeProject(updateResumeProjectRequestDto, resume);
    };

    @UseGuards(JwtAuthGuard)
    @Delete('resume-project/:id')
    async deleteResumeProject(@Param('id') id, @Request() req, @Query('resumeId') resumeId) {
        const kakaoId = req.user.kakaoId;
        console.log(`[API] DELETE /resume/project : ${kakaoId} ${id}`);

        const user = await this.userService.getUser(kakaoId);
        if (!user) {
            throw new NotFoundException();
        }

        const resume = await this.resumeService.getResume(resumeId, user);
        if (!resume) {
            throw new NotFoundException();
        }

        return await this.resumeProjectService.deleteResumeProject(id, resume);
    };
}
