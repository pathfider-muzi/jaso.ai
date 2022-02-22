import { HttpService } from '@nestjs/axios';
import { Body, Controller, Get, HttpException, NotFoundException, Post, Query, Request, UseGuards } from '@nestjs/common';
import { catchError, lastValueFrom } from 'rxjs';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserService } from '../user/user.service';
import { GenerateMotivationRequestDto } from './dto/generateMotivationRequestDto';
import { GenerateProjectRequestDto } from './dto/generateProjectRequestDto';
// import { GenerationService } from './generation.service';

@Controller('generation')
export class GenerationController {
    constructor(
        private httpService: HttpService,
        private userService: UserService,
        // private generationService: GenerationService
    ) {};

    @UseGuards(JwtAuthGuard)
    @Post('project')
    async generateProject(@Body() generateProjectRequestDto: GenerateProjectRequestDto, @Request() req) {
        const kakaoId = req.user.kakaoId;
        const { projectName, projectDetail, projectTerm, projectRole, projectResult, projectFeeling } = generateProjectRequestDto;
        console.log(`[API] POST /generation/project : ${kakaoId} ${projectName} ${projectDetail} ${projectRole} ${projectResult} ${projectFeeling}`);
        const user = await this.userService.getUser(kakaoId);
        if (!user) {
            throw new NotFoundException();
        }

        const postData = {
            projectName,
            projectDetail,
            projectTerm,
            projectRole,
            projectResult,
            projectFeeling
        };

        const { data: { projectIntroduction } } = await lastValueFrom(this.httpService.post("http://34.87.41.125:3000/project", postData, {
            timeout: 500000
        }).pipe(
            catchError(error => {
                throw new HttpException(error.response.data, error.response.status);
            })
        ));

        return {
            data: {
                projectIntroduction
            }
        };
    }

    @UseGuards(JwtAuthGuard)
    @Post('motivation')
    async generateMotivation(@Body() generateMotivationRequestDto: GenerateMotivationRequestDto, @Request() req) {
        const kakaoId = req.user.kakaoId;
        const { orgName, orgRole, orgDetail, motivationEmphasis } = generateMotivationRequestDto;
        console.log(`[API] POST /generation/motivation : ${kakaoId} ${orgName} ${orgRole} ${orgDetail} ${motivationEmphasis}`);
        const user = await this.userService.getUser(kakaoId);
        if (!user) {
            throw new NotFoundException();
        }

        const postData = {
            orgName,
            orgRole,
            orgDetail,
            motivationEmphasis
        };

        const { data: { motiveIntroduction } } = await lastValueFrom(this.httpService.post("http://34.87.41.125:3000/motive", postData, {
            timeout: 500000
        }).pipe(
            catchError(error => {
                throw new HttpException(error.response.data, error.response.status);
            })
        ));

        return {
            data: {
                motiveIntroduction
            }
        };
    }

    // @Get('project/result')
    // async getProjectGenerationResult(@Request() req, @Query('msg') msg: string) {
    //     this.generationService.sendMessage(msg);
    //     return msg;
    // };
}
