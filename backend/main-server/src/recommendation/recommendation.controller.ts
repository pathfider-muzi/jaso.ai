import { HttpService } from '@nestjs/axios';
import { Body, Controller, Get, HttpException, NotFoundException, Post, Query, Request, UseGuards } from '@nestjs/common';
import { catchError, lastValueFrom } from 'rxjs';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserService } from '../user/user.service';
import { RecommendAnswerRequestDto } from './dto/recommendAnswerRequestDto';
import { RecommendFullTextRequestDto } from './dto/recommendFullTextRequestDto';
import { SearchSelfIntroductionByKeywordRequestDto } from './dto/searchSelfIntroductionByKeywordRequestDto';

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
    @Post('org-name-search')
    async searchSelfIntroductionByOrgName(@Body() searchSelfIntroductionByKeywordRequestDto: SearchSelfIntroductionByKeywordRequestDto, @Request() req, @Query('orgName') orgName) {
        const kakaoId = req.user.kakaoId;
        const { specification } = searchSelfIntroductionByKeywordRequestDto;
        console.log(`[API] POST /recommendation/org-name-search : ${kakaoId} ${specification}`);
        
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

        const res = recommendationList.filter(selfIntroduction => selfIntroduction.title.split(' / ')[0] === orgName);

        return {
            data: {
                res
            }
        }
    }

    @UseGuards(JwtAuthGuard)
    @Post('keyword-search')
    async searchSelfIntroductionByKeyword(@Body() searchSelfIntroductionByKeywordRequestDto: SearchSelfIntroductionByKeywordRequestDto, @Request() req, @Query('keyword') keyword) {
        const kakaoId = req.user.kakaoId;
        const { specification } = searchSelfIntroductionByKeywordRequestDto;
        console.log(`[API] POST /recommendation/keyword-search : ${kakaoId} ${specification}`);
        
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