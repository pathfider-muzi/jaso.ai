import { HttpService } from '@nestjs/axios';
import { Body, Controller, Get, HttpException, NotFoundException, Post, Query, Request, UseGuards } from '@nestjs/common';
import { catchError, lastValueFrom } from 'rxjs';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserService } from '../user/user.service';
import { RecommendAnswerRequestDto } from './dto/recommendAnswerRequestDto';
import { RecommendFullTextRequestDto } from './dto/recommendFullTextRequestDto';
import { SearchSelfIntroductionByKeywordRequestDto } from './dto/searchSelfIntroductionByKeywordRequestDto';
import { SearchSelfIntroductionByOrgNameRequestDto } from './dto/searchSelfIntroductionByOrgNameRequestDto';
import { SearchSelfIntroductionByRoleRequestDto } from './dto/searchSelfIntroductionByRoleRequestDto';
import { SearchSelfIntroductionRequestDto } from './dto/searchSelfIntroductionRequestDto';

@Controller('recommendation')
export class RecommendationController {
    constructor(
        private httpService: HttpService,
        private userService: UserService
    ) {}

    @UseGuards(JwtAuthGuard)
    @Get('full-text')
    async recommendFullText(@Query('listNum') listNum, @Request() req) {
        const kakaoId = req.user.kakaoId;
        console.log(`[API] GET /recommendation/full-text : ${kakaoId} ${listNum}`);
        const user = await this.userService.getUser(kakaoId);
        if (!user) {
            throw new NotFoundException();
        }

        // return if the user has not filled in required userInfo fields
        const userInfo = await this.userService.getUserInfo(user);
        if (userInfo.major === null || userInfo.grade === null || userInfo.career === null || userInfo.activity === null) {
            return { 
                hasFilledInRequiredFields: false,
                data : {}
            };
        }

        // concatenate spec of userInfo
        let spec = "";
        if (userInfo.university !== null) {
            spec = spec.concat(`${userInfo.university}`);
        }
        spec = spec.concat(` / ${userInfo.major} / ${userInfo.grade}`);
        if (userInfo.languageScore !== null) {
            spec.concat(` / ${userInfo.languageScore}`);
        }
        spec = spec.concat(` / ${userInfo.career} / ${userInfo.activity}`);
        if(userInfo.license !== null) {
            spec.concat(` / ${userInfo.license}`);
        }
        const postData = {
            "listNum": parseInt(listNum),
            "spec": spec
        }

        // send numList and spec to ai server
        const { data: { recommendationList } } = await lastValueFrom(this.httpService.post("http://34.64.92.197:3000/", postData, {  
            timeout: 50000
        }).pipe(
            catchError(error => {
                throw new HttpException(error.response.data, error.response.status);
            })
        ));

        return {
            hasFilledInRequiredFields: true,
            data: {
                spec,
                recommendationList
            }
        }
    }

    @UseGuards(JwtAuthGuard)
    @Post('full-text')
    async recommendFullTextBasedOnDto(@Body() recommendFullTextRequestDto: RecommendFullTextRequestDto, @Request() req) {
        const kakaoId = req.user.kakaoId;
        const { listNum, specification } = recommendFullTextRequestDto;
        console.log(`[API] POST /recommendation/full-text : ${kakaoId} ${specification} ${listNum}`);
        
        const postData = {
            "listNum": listNum,
            "spec": specification
        }
    
        // send numList and spec to ai server
        const { data: { recommendationList } } = await lastValueFrom(this.httpService.post("http://34.64.92.197:3000/", postData, {  
            timeout: 50000
        }).pipe(
            catchError(error => {
                throw new HttpException(error.response.data, error.response.status);
            })
        ));

        return {
            data: {
                recommendationList
            }
        }
    }

    @UseGuards(JwtAuthGuard)
    @Post('search/org-name')
    async searchSelfIntroductionByOrgName(@Body() searchSelfIntroductionByOrgNameRequestDto: SearchSelfIntroductionByOrgNameRequestDto, @Request() req) {
        const kakaoId = req.user.kakaoId;
        const { specification, orgName } = searchSelfIntroductionByOrgNameRequestDto;
        console.log(`[API] POST /recommendation/search/org-name : ${kakaoId} ${orgName} ${specification}`);
        
        const postData = {
            "listNum": 10000,
            "spec": specification
        }
    
        // send numList and spec to ai server
        const { data: { recommendationList } } = await lastValueFrom(this.httpService.post("http://34.64.92.197:3000/", postData, {  
            timeout: 50000
        }).pipe(
            catchError(error => {
                throw new HttpException(error.response.data, error.response.status);
            })
        ));

        const res = recommendationList.filter(selfIntroduction => selfIntroduction.title.split(' / ')[0]?.includes(orgName));

        return {
            data: {
                res
            }
        }
    }

    @UseGuards(JwtAuthGuard)
    @Post('search/role')
    async searchSelfIntroductionByRole(@Body() searchSelfIntroductionByRoleRequestDto: SearchSelfIntroductionByRoleRequestDto, @Request() req) {
        const kakaoId = req.user.kakaoId;
        const { specification, role } = searchSelfIntroductionByRoleRequestDto;
        console.log(`[API] POST /recommendation/search/role : ${kakaoId} ${role} ${specification}`);
        
        const postData = {
            "listNum": 10000,
            "spec": specification
        }
    
        // send numList and spec to ai server
        const { data: { recommendationList } } = await lastValueFrom(this.httpService.post("http://34.64.92.197:3000/", postData, {  
            timeout: 50000
        }).pipe(
            catchError(error => {
                throw new HttpException(error.response.data, error.response.status);
            })
        ));

        const res = recommendationList.filter(selfIntroduction => selfIntroduction.title.split(' / ')[1]?.includes(role));

        return {
            data: {
                res
            }
        }
    }

    @UseGuards(JwtAuthGuard)
    @Post('search/keyword')
    async searchSelfIntroductionByKeyword(@Body() searchSelfIntroductionByKeywordRequestDto: SearchSelfIntroductionByKeywordRequestDto, @Request() req) {
        const kakaoId = req.user.kakaoId;
        const { specification, keyword } = searchSelfIntroductionByKeywordRequestDto;
        console.log(`[API] POST /recommendation/search/keyword : ${kakaoId} ${keyword} ${specification}`);
        
        const postData = {
            "listNum": 10000,
            "spec": specification
        }
    
        // send numList and spec to ai server
        const { data: { recommendationList } } = await lastValueFrom(this.httpService.post("http://34.64.92.197:3000/", postData, {  
            timeout: 50000
        }).pipe(
            catchError(error => {
                throw new HttpException(error.response.data, error.response.status);
            })
        ));

        const res = recommendationList.filter(selfIntroduction => selfIntroduction.body.includes(keyword));

        return {
            data: {
                res
            }
        }
    }

    @UseGuards(JwtAuthGuard)
    @Post('search')
    async searchSelfIntroduction(@Body() searchSelfIntroductionRequestDto: SearchSelfIntroductionRequestDto, @Request() req) {
        const kakaoId = req.user.kakaoId;
        const { orgName, role, keyword, specification } = searchSelfIntroductionRequestDto;
        console.log(`[API] POST /recommendation/search : ${kakaoId} ${orgName} ${role} ${keyword} ${specification}`);
        
        const postData = {
            "listNum": 10000,
            "spec": specification
        }
    
        // send numList and spec to ai server
        const { data: { recommendationList } } = await lastValueFrom(this.httpService.post("http://34.64.92.197:3000/", postData, {  
            timeout: 50000
        }).pipe(
            catchError(error => {
                throw new HttpException(error.response.data, error.response.status);
            })
        ));

        const res = recommendationList.filter(selfIntroduction => { selfIntroduction.body.includes(keyword) && selfIntroduction.title.split(' / ')[0]?.includes(orgName) && selfIntroduction.title.split(' / ')[1]?.includes(role); });

        return {
            data: {
                res
            }
        }
    }

    @UseGuards(JwtAuthGuard)
    @Post('answer')
    async recommendAnswer(@Body() recommendAnswerRequestDto: RecommendAnswerRequestDto, @Request() req) {
        const kakaoId = req.user.kakaoId;
        const { listNum, question, specification } = recommendAnswerRequestDto;
        console.log(`[API] POST /recommendation/answer: ${kakaoId} ${question} ${specification} ${listNum}`);
        const spec = `${question} / ${specification}`;

        const postData = {
            "listNum": listNum,
            "spec": spec
        }

        // send numList and spec to ai server
        const { data: { recommendationList } } = await lastValueFrom(this.httpService.post("http://34.64.180.204:3000/", postData, {  
            timeout: 50000
        }).pipe(
            catchError(error => {
                throw new HttpException(error.response.data, error.response.status);
            })
        ));

        return {
            data: {
                recommendationList
            }
        }
    }
}