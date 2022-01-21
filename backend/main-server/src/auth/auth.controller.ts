import { HttpService } from '@nestjs/axios';
import { Body, Controller, Get, HttpException, Post, Request, UseGuards } from '@nestjs/common';
import { catchError, lastValueFrom } from 'rxjs';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { GetAccessTokenRequestDto } from './dto/getAccessTokenRequestDto';
import { InquireSignUpRequestDto } from './dto/inquireSignUpRequestDto';

@Controller('auth')
export class AuthController {
    constructor(
        private httpService: HttpService,
        private userService: UserService,
        private authService: AuthService
    ) {}

    @Post('signup-inquiry')
    async inquireSignup(@Body() inquireSignUpRequestDto: InquireSignUpRequestDto): Promise<any> {
        const { accessToken } = inquireSignUpRequestDto;

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

        const { id, kakao_account: { profile: { nickname, profile_image_url } } } = data;
        console.log(`[API] POST /auth/signup-inquiry : ${id}, ${nickname}, ${profile_image_url}`);

        // check if user has already signed up
        let user = await this.userService.getUser(id);
        if (!user) {
            return { hasAlreadySignedUp: false };
        } else {
            return { hasAlreadySignedUp: true };
        }
    }

    @Post('kakao-token')
    async getAccessToken(@Body() getAccessTokenRequestDto: GetAccessTokenRequestDto): Promise<any> {
        const { accessToken } = getAccessTokenRequestDto;

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

        const { id, kakao_account: { profile: { nickname, profile_image_url }, email } } = data;
        console.log(`[API] POST /auth/kakao-token : ${id}, ${nickname}, ${profile_image_url} ${email}`);
        
        // create user if it does not exist, or update user if it already exists
        let user = await this.userService.getUser(id);
        if (!user) {
            user = await this.userService.createUser(id, nickname, profile_image_url);
            user = await this.userService.getUser(id);
            const emailInfo = email? email: null;
            const userInfo = await this.userService.createUserInfo(null, emailInfo, null, null, null, null, null, null, null, user);

            // generate JWT
            const jwt = await this.authService.generateJWT(id);

            return { jwt, user, userInfo }
        }
        user = await this.userService.updateUser(id, nickname, profile_image_url);

        // generate JWT
        const jwt = await this.authService.generateJWT(id);

        return { jwt }
    }
}
