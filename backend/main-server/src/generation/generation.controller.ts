import { HttpService } from '@nestjs/axios';
import { Body, Controller, HttpException, NotFoundException, Post, Request, UseGuards } from '@nestjs/common';
import { catchError, lastValueFrom } from 'rxjs';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserService } from '../user/user.service';
import { GenerateProjectRequestDto } from './dto/generateProjectRequestDto';

@Controller('generation')
export class GenerationController {
    constructor(
        private httpService: HttpService,
        private userService: UserService
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

        const { data: { introduction } } = await lastValueFrom(this.httpService.post("http://34.124.206.11:3000/", postData, {
            timeout: 500000
        }).pipe(
            catchError(error => {
                throw new HttpException(error.response.data, error.response.status);
            })
        ));

        return {
            data: {
                introduction
            }
        }
    }
}
