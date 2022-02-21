import { HttpService } from '@nestjs/axios';
import { Body, Controller, HttpException, Post, Request, UseGuards } from '@nestjs/common';
import { catchError, lastValueFrom } from 'rxjs';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ReportLousyAnswerRequestDto } from './dto/reportLousyAnswerRequestDto';

@Controller('feedback')
export class FeedbackController {
    constructor(
        private httpService: HttpService,
    ) {};

    @UseGuards(JwtAuthGuard)
    @Post('answer')
    async reportLousyAnswer(@Request() req, @Body() reportLousyAnswerRequestDto: ReportLousyAnswerRequestDto) {
        const kakaoId = req.user.kakaoId;
        const { id } = reportLousyAnswerRequestDto;
        console.log(`[API] POST /feedback/answer: ${kakaoId}, ${id}`);

        const postData = {
            "id": id
        };

        const { data: { blockedId } } = await lastValueFrom(this.httpService.post("http://34.64.180.204:3000/block", postData, {
            timeout: 5000
        }).pipe(
            catchError(error => {
                throw new HttpException(error.response.data, error.response.status);
            })
        ));

        return {
            data: {
                blockedId
            }
        }
    };

    @UseGuards(JwtAuthGuard)
    @Post('full-text')
    async reportLousyFullText(@Request() req, @Body() reportLousyAnswerRequestDto: ReportLousyAnswerRequestDto) {
        const kakaoId = req.user.kakaoId;
        const { id } = reportLousyAnswerRequestDto;
        console.log(`[API] POST /feedback/full-text: ${kakaoId}, ${id}`);

        const postData = {
            "id": id
        };

        const { data: { blockedId } } = await lastValueFrom(this.httpService.post("http://34.64.92.197:3000/block", postData, {
            timeout: 5000
        }).pipe(
            catchError(error => {
                throw new HttpException(error.response.data, error.response.status);
            })
        ));

        return {
            data: {
                blockedId
            }
        }
    };
}
