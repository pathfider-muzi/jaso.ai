import { HttpService } from '@nestjs/axios';
import { Body, Controller, HttpException, Post, Request, UseGuards } from '@nestjs/common';
import { catchError, lastValueFrom } from 'rxjs';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserService } from '../user/user.service';
import { CheckOrgNameRequestDto } from './dto/checkOrgNameRequestDto';

@Controller('org-name-checker')
export class OrgNameCheckerController {
    constructor(
        private httpService: HttpService,
        private userService: UserService
    ) {};

    @UseGuards(JwtAuthGuard)
    @Post('')
    async checkOrgName(@Request() req, @Body() checkOrgNameRequestDto: CheckOrgNameRequestDto) {
        const kakaoId = req.user.kakaoId;
        console.log(`[API] POST /org-name-checker: ${kakaoId} ${checkOrgNameRequestDto.text}`);

        const { data: { text } } = await lastValueFrom(this.httpService.post("http://34.64.218.91:8000/orgname-check", checkOrgNameRequestDto, {  
            timeout: 5000
        }).pipe(
            catchError(error => {
                throw new HttpException(error.response.data, error.response.status);
            })
        ));

        const returnText = text.filter(word => word[1] === "ORGANIZATION");

        return {
            'text': returnText
        };
    };
}
