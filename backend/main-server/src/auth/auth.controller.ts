import { HttpService } from '@nestjs/axios';
import { Body, Controller, Get, HttpException, Post, Request, UseGuards } from '@nestjs/common';
import { catchError, lastValueFrom } from 'rxjs';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { KakaoToken } from './dto/kakaoToken.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(
        private httpService: HttpService,
        private userService: UserService,
        private authService: AuthService
    ) {}

    @Get()
    getHello(): string {
        return 'Hello';
    }

    @Post('kakao-token')
    async getKakaoToken(@Body() kakaoToken: KakaoToken): Promise<any> {
        const { accessToken } = kakaoToken;

        // fetch userInfo from Kakao using accessToken
        const { data } = await lastValueFrom(this.httpService.get("https://kapi.kakao.com/v2/user/me", {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            },
            timeout: 5000
        }).pipe(
            catchError(error => {
                throw new HttpException(error.response.data, error.response.status);
            })
        ));

        // add userInfo to mock db
        this.userService.pushUserData(data.id);

        return this.authService.generateJWT(data.id);
    }
    
    @UseGuards(JwtAuthGuard)
    @Get('user')
    getUser(@Request() req) {
        return req.user;
    }
}
