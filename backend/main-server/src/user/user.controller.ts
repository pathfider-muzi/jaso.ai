import { Controller, Get, UseGuards, Request, Post, Body, Patch, UnauthorizedException } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateUserInfoRequestDto } from './dto/createUserInfoRequestDto';
import { UpdateUserInfoRequestDto } from './dto/updateUserInfoRequestDto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    async getUser(@Request() req) {
        const kakaoId = req.user.kakaoId;
        console.log(`[API] GET /user : ${kakaoId}`)

        return await this.userService.getUser(kakaoId);
    }

    @UseGuards(JwtAuthGuard)
    @Get('user-info')
    async getUserWithUserInfo(@Request() req) {
        const kakaoId = req.user.kakaoId;
        console.log(`[API] GET /user/user-info : ${kakaoId}`)

        return await this.userService.getUserWithUserInfo(kakaoId);
    }


    @UseGuards(JwtAuthGuard)
    @Post('user-info')
    async createUserInfo(@Body() createUserInfoReqestDto: CreateUserInfoRequestDto, @Request() req) {
        const kakaoId = req.user.kakaoId;
        console.log(`[API] POST /user/user-info : ${kakaoId} ${createUserInfoReqestDto}`)
        const user = await this.userService.getUserWithUserInfo(kakaoId);
        if (!user) {
            throw new UnauthorizedException();
        }
        if (user.userInfos.length > 0) {
            return user.userInfos;
        }

        return await this.userService.createUserInfo(createUserInfoReqestDto, user);
    }

    @UseGuards(JwtAuthGuard)
    @Patch('user-info')
    async updateUserInfo(@Body() updateUserInfoRequestDto: UpdateUserInfoRequestDto, @Request() req) {
        const kakaoId = req.user.kakaoId;
        console.log(`[API] PATCH /user/user-info : ${kakaoId} ${updateUserInfoRequestDto}`)
        const user = await this.userService.getUserWithUserInfo(kakaoId);
        if (!user) {
            throw new UnauthorizedException();
        }

        return await this.userService.updateUserInfo(updateUserInfoRequestDto, user);
    }
}
