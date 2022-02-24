import { HttpService } from '@nestjs/axios';
import { Body, CACHE_MANAGER, Controller, Get, HttpException, Inject, NotFoundException, Post, Query, Request, UseGuards } from '@nestjs/common';
import { catchError, lastValueFrom } from 'rxjs';
import { Cache } from 'cache-manager';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserService } from '../user/user.service';
import { GenerateAsyncMotivationRequestDto } from './dto/generateAsyncMotivationRequestDto';
import { GenerateAsyncProjectRequestDto } from './dto/generateAsyncProjectRequestDto';
import { GenerateMotivationRequestDto } from './dto/generateMotivationRequestDto';
import { GenerateProjectRequestDto } from './dto/generateProjectRequestDto';
import { ReturnProjectGenerationResultRequestDto } from './dto/returnProjectGenerationResultRequestDto';
import { ReturnMotivationGenerationResultRequestDto } from './dto/returnMotivationGenerationResultRequestDto';

@Controller('generation')
export class GenerationController {
    constructor(
        private httpService: HttpService,
        private userService: UserService,
        @Inject(CACHE_MANAGER) private cacheManager: Cache
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
    };

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
    };

    @Post('motivation/guest')
    async generateMotivationWithoutJwt(@Body() generateMotivationRequestDto: GenerateMotivationRequestDto) {
        const { orgName, orgRole, orgDetail, motivationEmphasis } = generateMotivationRequestDto;
        console.log(`[API] POST /generation/motivation : ${orgName} ${orgRole} ${orgDetail} ${motivationEmphasis}`);

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
    };

    @Post('motivation/async')
    async generateAsyncMotivation(@Body() generateAsyncMotivationRequestDto: GenerateAsyncMotivationRequestDto, @Request() req) {
        const { resumeMotivationId, orgName, orgRole, orgDetail, motivationEmphasis } = generateAsyncMotivationRequestDto;
        console.log(`[API] POST /generation/motivation/async : ${resumeMotivationId} ${orgName} ${orgRole} ${orgDetail} ${motivationEmphasis}`);

        const postData = {
            resumeMotivationId,
            orgName,
            orgRole,
            orgDetail,
            motivationEmphasis
        };

        const { status, data: { queueNum } } = await lastValueFrom(this.httpService.post("http://34.87.41.125:3000/motive", postData, {
            timeout: 5000
        }).pipe(
            catchError(error => {
                throw new HttpException(error.response.data, error.response.status);
            })
        ));
        if (status !== 200) {
            throw new NotFoundException();
        }

        const motivationCacheId = "resumeMotivationId"+resumeMotivationId.toString();
        const cachedResumeMotivation = await this.cacheManager.get(motivationCacheId);
        if (cachedResumeMotivation) {
            throw new NotFoundException(`Motivation generation for ${resumeMotivationId} is already in progress`);
        }
        await this.cacheManager.set(motivationCacheId, " ", { ttl: 0 });

        return {
            data: {
                resumeMotivationId,
                queueNum
            }
        };
    };

    @Post('motivation/result')
    async returnMotivationGenerationResult(@Body() returnMotivationGenerationRequestDto: ReturnMotivationGenerationResultRequestDto) {
        const { resumeMotivationId, motiveIntroduction } = returnMotivationGenerationRequestDto;
        console.log(`[API] POST /generation/motivation/result : ${resumeMotivationId} ${motiveIntroduction}`);

        const motivationCacheId = "resumeMotivationId"+resumeMotivationId.toString();
        const cachedResumeMotivation = await this.cacheManager.get(motivationCacheId);
        if (!cachedResumeMotivation) {
            return {
                error: `Motivation generation for ${resumeMotivationId} was not requested`
            };
        }
        await this.cacheManager.set(motivationCacheId, motiveIntroduction, { ttl: 0 });
        return {
            resumeMotivationId
        };
    };

    @Get('motivation/result')
    async getMotivationGenerationResult(@Query('resumeMotivationId') resumeMotivationId) {
        console.log(`[API] GET /generation/motivation/result : ${resumeMotivationId}`);

        const motivationCacheId = "resumeMotivationId"+resumeMotivationId.toString();
        const cachedResumeMotivation = await this.cacheManager.get(motivationCacheId);
        if (!cachedResumeMotivation) {
            return {
                requested: false,
                generated: false,
                data: {
                    motiveIntroduction: ""
                }
            };
        }
        if (cachedResumeMotivation === " ") {
            return {
                requested: true,
                generated: false,
                data: {
                    motiveIntroduction: cachedResumeMotivation
                }
            }
        }

        await this.cacheManager.del(motivationCacheId);
        return {
            requested: true,
            generated: true,
            data: {
                motiveIntroduction: cachedResumeMotivation
            }
        }
    };

    @UseGuards(JwtAuthGuard)
    @Post('project/async')
    async generateAsyncProject(@Body() generateAsyncProjectRequestDto: GenerateAsyncProjectRequestDto, @Request() req) {
        const kakaoId = req.user.kakaoId;
        const { resumeProjectId, orgName, orgRole, orgDetail, motivationEmphasis } = generateAsyncProjectRequestDto;
        console.log(`[API] POST /generation/project/async : ${kakaoId} ${resumeProjectId} ${orgName} ${orgRole} ${orgDetail} ${motivationEmphasis}`);
        const user = await this.userService.getUser(kakaoId);
        if (!user) {
            throw new NotFoundException();
        } 

        const postData = {
            resumeProjectId,
            orgName,
            orgRole,
            orgDetail,
            motivationEmphasis
        };

        const { status, data: { queueNum } } = await lastValueFrom(this.httpService.post("http://34.87.41.125:3000/project", postData, {
            timeout: 5000
        }).pipe(
            catchError(error => {
                throw new HttpException(error.response.data, error.response.status);
            })
        ));
        if (status !== 200) {
            throw new NotFoundException();
        }

        const projectCacheId = "resumeProjectId"+resumeProjectId.toString();
        const cachedResumeProject = await this.cacheManager.get(projectCacheId);
        if (cachedResumeProject) {
            throw new NotFoundException(`Project generation for ${resumeProjectId} is already in progress`);
        }
        await this.cacheManager.set(projectCacheId, " ", { ttl: 0 });

        return {
            data: {
                resumeProjectId,
                queueNum
            }
        };
    };

    @Post('project/result')
    async returnProjectGenerationResult(@Body() returnProjectGenerationRequestDto: ReturnProjectGenerationResultRequestDto) {
        const { resumeProjectId, projectIntroduction } = returnProjectGenerationRequestDto;
        console.log(`[API] POST /generation/project/result : ${resumeProjectId} ${projectIntroduction}`);

        const projectCacheId = "resumeProjectId"+resumeProjectId.toString();
        const cachedResumeProject = await this.cacheManager.get(projectCacheId);
        if (!cachedResumeProject) {
            return {
                error: `Project generation for ${resumeProjectId} was not requested`
            };
        }
        await this.cacheManager.set(projectCacheId, projectIntroduction, { ttl: 0 });
        return {
            resumeProjectId
        };
    };

    @Get('project/result')
    async getProjectGenerationResult(@Query('resumeProjectId') resumeProjectId) {
        console.log(`[API] GET /generation/project/result : ${resumeProjectId}`);

        const projectCacheId = "resumeProjectId"+resumeProjectId.toString();
        const cachedResumeProject = await this.cacheManager.get(projectCacheId);
        if (!cachedResumeProject) {
            return {
                requested: false,
                generated: false,
                data: {
                    projectIntroduction: ""
                }
            };
        }
        if (cachedResumeProject === " ") {
            return {
                requested: true,
                generated: false,
                data: {
                    projectIntroduction: cachedResumeProject
                }
            }
        }

        await this.cacheManager.del(projectCacheId);
        return {
            requested: true,
            generated: true,
            data: {
                projectIntroduction: cachedResumeProject
            }
        }
    };
}
