import { HttpService } from '@nestjs/axios';
import { Body, Controller, Get, HttpException, NotFoundException, Query, Request, UseGuards } from '@nestjs/common';
import { catchError, lastValueFrom } from 'rxjs';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserService } from '../user/user.service';

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
        const { data: { recommendationList } } = await lastValueFrom(this.httpService.post("http://34.90.233.102:3000/", postData, {  
            timeout: 5000
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
}