import { Controller, Get, UseGuards, Request, Post, Body, Patch, Delete, NotFoundException } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AgreeToTermsRequestDto } from './dto/agreeToTermsRequestDto';
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
    @Delete()
    async deleteUser(@Request() req) {
        const kakaoId = req.user.kakaoId;
        console.log(`[API] DELETE /user : ${kakaoId}`);

        return await this.userService.deleteUser(kakaoId);
    }

    @UseGuards(JwtAuthGuard)
    @Post('user-info')
    async createUserInfo(@Body() createUserInfoRequestDto: CreateUserInfoRequestDto, @Request() req) {
        const kakaoId = req.user.kakaoId;
        const { name, email, university, major, grade, languageScore, career, activity, license } = createUserInfoRequestDto;
        console.log(`[API] POST /user/user-info : ${kakaoId} ${name}, ${email}, ${university}, ${major}, ${grade}, ${languageScore}, ${career}, ${activity}, ${license}`);
        const user = await this.userService.getUser(kakaoId);
        if (!user) {
            throw new NotFoundException();
        }
        // constraint to avoid multiple userInfo
        if (user.userInfos.length > 0) {
            return user.userInfos;
        }

        return await this.userService.createUserInfo(createUserInfoRequestDto, user);
    }

    @UseGuards(JwtAuthGuard)
    @Patch('user-info')
    async updateUserInfo(@Body() updateUserInfoRequestDto: UpdateUserInfoRequestDto, @Request() req) {
        const kakaoId = req.user.kakaoId;
        const { name, email, university, major, grade, languageScore, career, activity, license } = updateUserInfoRequestDto;
        console.log(`[API] PATCH /user/user-info : ${kakaoId} ${name}, ${email}, ${university}, ${major}, ${grade}, ${languageScore}, ${career}, ${activity}, ${license}`);
        const user = await this.userService.getUser(kakaoId);
        if (!user) {
            throw new NotFoundException();
        }

        return await this.userService.updateUserInfo(updateUserInfoRequestDto, user);
    }

    @UseGuards(JwtAuthGuard)
    @Post('terms')
    async agreeToTerms(@Body() agreeToTermsRequestDto: AgreeToTermsRequestDto, @Request() req) {
        const kakaoId = req.user.kakaoId;
        const { agreeToTerms } = agreeToTermsRequestDto;
        console.log(`[API] POST /user/terms : ${kakaoId} ${agreeToTerms}`);

        return await this.userService.agreeToTerms(agreeToTermsRequestDto, kakaoId);
    }
}
